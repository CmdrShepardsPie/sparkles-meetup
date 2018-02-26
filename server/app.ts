import * as express from 'express';
// import * as serveStatic from 'serve-static';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import passport from 'passport';
import path from 'path';
import livereload from 'livereload';
import connect from 'connect-livereload';
import axios from 'axios';
import { IUserProfile, Strategy as MeetupStrategy } from 'passport-meetup';
import { NextFunction, Request, RequestHandler, Response } from 'express-serve-static-core';
import groups from './api/groups';
import group from './api/group';
import events from './api/events';
import event from './api/event';
import comments from './api/comments';
import * as secrets from 'config/secrets.json';

class App {
  // public http: http.Server;
  public express: express.Express;
  private router: express.Router;

  constructor () {
    this.setupServer();
    this.setupExpress();
    this.setupPassport();
    this.setupRoutes();
  }

  private setupServer() {
    this.express = express();
    // this.http = http.createServer(this.express);
    const reloadServer = livereload.createServer();
    reloadServer.watch([path.resolve('dist/client')]);
  }

  private setupExpress() {
    this.express.use(cookieParser());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(expressSession({
      secret: secrets.secret,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: 'auto' }
    }));
    this.express.use(passport.initialize());
    this.express.use(passport.session());
    this.express.use(connect());
    this.router = express.Router();
  }

  private setupPassport() {
    passport.serializeUser((user, done) => {
      done(null, user);
    });
    passport.deserializeUser((user, done) => {
      done(null, user);
    });
    passport.use(new MeetupStrategy(
      {
        consumerKey: secrets.consumerKey,
        consumerSecret: secrets.consumerSecret,
        callbackURL: 'http://localhost:9000/auth/meetup/callback'
      }, (token, tokenSecret, profile, done) => {
        // console.log('verify', token, tokenSecret, profile, done);
        done(null, profile);
      }
    ));
  }
  private setupRoutes() {
    groups(this.router);
    group(this.router);
    events(this.router);
    event(this.router);
    comments(this.router);

    this.router.get('/auth/meetup',
      passport.authenticate('meetup'));
    this.router.get('/auth/meetup/callback',
      passport.authenticate('meetup'),
      (req, res) => {
        // console.log('/auth/meetup/callback', JSON.stringify(req && req.user, null, 2));
        // res.json(JSON.stringify(req && req.user, null, 2)).send();
        res.redirect('/');
      });
    this.router.use('/', express.static(path.resolve('dist/client')));
    this.express.use('/', this.router);
  }

}

export default new App();
