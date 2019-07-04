import * as express from 'express';
import { NextFunction } from "express-serve-static-core";
import { GroupModel } from "../../../schemas/Group";

const getGroup = (req: express.Request | any, res: express.Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    GroupModel.find({}, (err, groups) => {
      res.json(groups);
    })
  } else {
    res.status(400).json({'message': 'cannot find any groups'});
  }
}

export default getGroup;