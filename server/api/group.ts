import axios from 'axios';
import * as express from 'express';
import { ensureAuthenticated } from '../misc';
import * as secrets from 'config/secrets.json';

export default (router: express.Router) => router.get('/api/groups/:groupName',
  ensureAuthenticated,
  async (req, res, next) => {
    const params = {
      'sign': true,
      'key': secrets.key,
      'photo-host': 'secure',
      'fields': ['self'].join(',')
    };
    const pars = Object.entries(params).map(param => `${param[0]}=${param[1]}`).join('&');
    const url = `https://api.meetup.com/${req.params.groupName}?${pars}`;
    console.log('group', url);
    const events = await axios.get(url);
    res.json(events.data);
    next();
  });
