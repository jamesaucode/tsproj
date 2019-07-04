import { IRequest } from "../../../../interfaces/express";
import * as express from "express";

export const getProfile = (
  req: IRequest | any,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.user) {
    res.json(req.user);
  } else {
    next();
  }
};

export default getProfile;