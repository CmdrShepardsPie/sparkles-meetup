import { NextFunction, Request, Response } from 'express-serve-static-core';

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    return next();
  }

  // denied. redirect to login
  res.sendStatus(401);
}
