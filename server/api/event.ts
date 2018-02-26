import axios from 'axios';
import * as express from 'express';
import { ensureAuthenticated } from '../misc';
import * as secrets from 'config/secrets.json';

export default (router: express.Router) => router.get('/api/:groupName/events/:eventId',
  ensureAuthenticated,
  async (req, res, next) => {
    console.log('group', req.params.groupName);
    const params = {
      'sign': true,
      'key': secrets.key,
      'photo-host': 'secure',
      'fields': ['event_hosts'].join(',')
    };
    const pars = Object.entries(params).map(param => `${param[0]}=${param[1]}`).join('&');
    const url = `https://api.meetup.com/${req.params.groupName}/events/${req.params.eventId}?${pars}`;

    const event = await axios.get(url);
    res.json(event.data);
    next();
  });
