import { IRequest } from "../../../../interfaces/express";
import * as express from "express";

const getLogout = (
  req: IRequest | any,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.session) {
    req.session = null;
  }
  next();
};

export default getLogout;