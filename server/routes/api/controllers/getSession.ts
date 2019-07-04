import * as express from 'express';
import { IRequest } from '../../../../interfaces/express';

const getSession = (
  req: IRequest | any,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.session.length !== 0) {
    res.json(req.session);
  } else {
    next();
  }
};

export default getSession;