import axios from 'axios';
import * as express from 'express';
import { ensureAuthenticated } from '../misc';
import * as secrets from 'config/secrets.json';

export default (router: express.Router) => router.get('/api/groups/:groupName/events',
  ensureAuthenticated,
  async (req, res, next) => {
    const params = {
      'sign': true,
      'key': secrets.key,
      'photo-host': 'secure',
      'fields': ['self', 'how_to_find_us'].join(','),
      'status': ['upcoming', 'proposed', 'suggested'].join(',')
    };
    const pars = Object.entries(params).map(param => `${param[0]}=${param[1]}`).join('&');
    const url = `https://api.meetup.com/${req.params.groupName}/events?${pars}`;

    const paramsDraft = {
      'sign': true,
      'key': secrets.key,
      'photo-host': 'secure',
      'fields': ['self', 'how_to_find_us'].join(','),
      'status': ['draft'].join(',')
    };
    const parsDraft = Object.entries(paramsDraft).map(param => `${param[0]}=${param[1]}`).join('&');
    const urlDraft = `https://api.meetup.com/${req.params.groupName}/events?${parsDraft}`;

    const paramsPast = {
      'sign': true,
      'key': secrets.key,
      'photo-host': 'secure',
      'fields': ['self', 'how_to_find_us'].join(','),
      'status': ['past', 'cancelled'].join(','),
      'desc': true
    };
    const parsPast = Object.entries(paramsPast).map(param => `${param[0]}=${param[1]}`).join('&');
    const urlPast = `https://api.meetup.com/${req.params.groupName}/events?${parsPast}`;

    console.log('events', url);

    const events = await Promise.all([
      axios.get(url),
      axios.get(urlPast),
      axios.get(urlDraft).catch(() => ({ data: [] }))]);
    const eventsCombined = [...events[0].data, ...events[1].data, ...events[1].data];
    res.json(eventsCombined);
    next();
  });
