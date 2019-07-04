import * as express from 'express';
import { NextFunction } from "express-serve-static-core";
import { UserModel } from "server/schemas/User";

const bcrypt = require("bcrypt");
const saltRounds = 10;

const postRegister = (
  req: express.Request,
  res: express.Response,
  next: NextFunction
) => {
  if (req.body) {
    bcrypt.genSalt(saltRounds, (err: Error, salt: string) => {
      bcrypt.hash(req.body.password, salt, (err: Error, hash: string) => {
        const displayName = [req.body.firstName, req.body.lastName].join(' ');
        console.log(displayName);
        const UserInstance = new UserModel({ ...req.body, password: hash, displayName });
        UserModel.findOne({ $or: [ {email: req.body.email} ] }, (err : Error, found : boolean) => {
          if (found) {
            res.status(400).json({ message: "Cannot register this user. User already exist."});
          } else {
        UserInstance.save((err: Error) => {
          if (err) return res.status(400).json({ message: "Cannot register this user."});
          console.log("User saved");
          res.status(200).json({ message: "User registered!"})
        });
          }
        })
      });
    });
  }
};

export default postRegister;