import * as express from 'express';
import { NextFunction } from "express-serve-static-core";
import { GroupModel } from "../../../schemas/Group";

const postGroup = (req: express.Request | any, res: express.Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    const GroupInstance = new GroupModel({ ...req.body });
    GroupInstance.save((err: Error) => {
      if (err) return res.send(err.message);
      console.log("Group Saved!");
    })
  } else {
    res.status(400).json({'message' : 'Cannot save this group'});
  }
}

export default postGroup;