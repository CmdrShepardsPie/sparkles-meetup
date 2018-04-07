import http from 'http';
import path from 'path';

import axios from 'axios';

import express from 'express';
import bodyParser from 'body-parser';

import passport from 'passport';
import expressSession from 'express-session';

import SocketIO, { Socket } from 'socket.io';

import OAuth2Strategy, { VerifyCallback } from 'passport-oauth2';

import livereload from 'livereload';
import connectLivereload from 'connect-livereload';

import gzipStatic from 'connect-gzip-static';
import gzip from 'connect-gzip';

import * as secrets from '@config/secrets.json';

import MeetupStrategy from '@server/services/meetup.passport';
import IMeetupUser from '@interfaces/i.meetup.user';
import { auth, ensureAuthenticated, toQuery } from '@server/services/meetup.helper';

import * as MeetupProfiles from './services/meetup.profiles.v3';
import IMeetupSession from '@interfaces/i.meetup.session';

class App {
  private http: http.Server;
  private express: express.Express;
  private io: SocketIO.Server;
  private router: express.Router;

  public async setup() {
    if (this.http) {
      return this.http;
    }
    this.setupServer();
    this.setupExpress();
    this.setupPassport();
    this.setupSocket();
    this.setupRoutes();
    return this.http;
  }

  private setupServer() {
    this.express = express();
    this.http = http.createServer(this.express);
    this.io = SocketIO(this.http);
    if (process.env.NODE_ENV === `development`) {
      const reloadServer = livereload.createServer();
      reloadServer.watch([path.resolve(`dist/client`)]);
    }
  }

  private setupExpress() {
    // parse application/json
    this.express.use(bodyParser.json());
    // parse application/x-www-form-urlencoded
    this.express.use(bodyParser.urlencoded({ extended: true }));
    // live-reload
    if (process.env.NODE_ENV === `development`) {
      this.express.use(connectLivereload());
    }
    this.express.use(expressSession({
      secret: secrets.secret,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }
    }));
    this.express.use(passport.initialize());
    this.express.use(passport.session());
    this.express.use(connectLivereload());
    this.router = express.Router();
  }

  private setupPassport() {
    passport.serializeUser((user, done) => {
      done(null, user);
    });
    passport.deserializeUser((user, done) => {
      done(null, user);
    });
    passport.use(new OAuth2Strategy(
      {
        clientID: secrets.consumerKey,
        clientSecret: secrets.consumerSecret,
        callbackURL: 'http://localhost:5280/auth/meetup/callback',
        authorizationURL: 'https://secure.meetup.com/oauth2/authorize',
        tokenURL: 'https://secure.meetup.com/oauth2/access'
      },
      async (accessToken: string, refreshToken: string, results: any, profile: IMeetupUser, verified: VerifyCallback) => {
        console.log('verify', accessToken, refreshToken, results, profile, verified);
        profile = await MeetupProfiles.getMemberProfile(accessToken, 'self');
        verified(null, { profile, accessToken, refreshToken });
      }
    ));
  }

  private setupSocket() {
    this.io.on(`connection`, (socket: Socket) => {
      console.log(`Socket Connected`);

      socket.on(`disconnect`, () => {
        console.log(`Socket Disconnected`);
      });

      // tiersAPI.sockets(socket, this.db);
      // sponsorsAPI.sockets(socket, this.db);
      // queueAPI.sockets(socket, this.db);
      // stateAPI.sockets(socket, this.db);
      //
      // socket.on(`set-year`, (message: any) => {
      //   const year = message.year;
      //   console.log(`set-year`, year);
      //   this.show2019 = year;
      //   // Re-emit
      //   socket.broadcast.emit(`set-year`, { year: this.show2019 });
      // });
      //
      // // Emit on connect
      // socket.emit(`set-year`, { year: this.show2019 });
    });
  }

  private setupRoutes() {
    if (process.env.NODE_ENV === `production`) {
      this.router.use(`/`, gzipStatic(path.resolve(`dist/client`)));
      this.router.use(`/api`, gzip.gzip());
    } else {
      this.router.use(`/`, express.static(path.resolve(`dist/client`)));
    }

    this.router.get(/^\/api\/(.*)$/,
      ensureAuthenticated,
      async (req, res, next) => {
        // console.log('/api', req.params[0], req.query);
        console.log('url', req.url)
        try {
          const user: IMeetupSession = req.user as any;
          const url = `https://api.meetup.com/${req.params[0]}${toQuery(req.query)}`;
          // console.log('url', url);
          const response = await axios.get(url, auth(user.accessToken));
          res.json(response.data);
        } catch (e) {
          res.status(500).send(e.toString());
        }
        next();
      });
    this.router.get('/auth/meetup',
      passport.authenticate('oauth2'));
    this.router.get('/auth/meetup/callback',
      passport.authenticate('oauth2'),
      (req, res) => {
        if (req.session && req.session.redirect) {
          const redirect = req.session.redirect;
          req.session.redirect = null;
          res.redirect(redirect);
        } else {
          res.redirect('/');
        }

      });

    this.express.use(`/`, this.router);
  }
}

export default new App();
