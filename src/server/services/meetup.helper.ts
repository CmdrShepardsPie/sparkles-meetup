import { NextFunction, Request, Response } from 'express-serve-static-core';

export function auth(accessToken: string) {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };
}

export function toQuery(params: object) {
  const p = Object.entries(params).map((pair) => `${pair[0]}=${pair[1]}`);
  return `?${p.join('&')}`;
}

export function toCommas(list: any[]) {
  return list.join(',');
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    return next();
  }

  // denied. redirect to login
  if (req.session) {
    req.session.redirect = req.url;
  }
  res.redirect('/auth/meetup');
}
