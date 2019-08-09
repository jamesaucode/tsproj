import { crudControllers } from "../../utils/crud";
import { UserModel } from "./user.model";
import express from "express";
import console = require("console");

const SALTROUNDS = 10;
const bcrypt = require("bcrypt");

export default {
  ...crudControllers(UserModel),
  getUserProfile: (req: express.Request, res: express.Response): void => {
    if (req.isAuthenticated()) {
      res.status(200).json({ data: req.user });
    } else {
      res.status(400).end();
    }
  },
  registerUser: async (
    req: express.Request,
    res: express.Response,
  ): Promise<void> => {
    try {
      const userExist = await UserModel.findOne({ email: req.body.email })
        .lean()
        .exec();

      if (userExist) {
        console.log("User already exist!");
        res.status(400).end();
      }

      const hashedPassword = bcrypt.hashSync(req.body.password, SALTROUNDS);
      const displayName = [req.body.firstName, req.body.lastName].join(" ");
      const newUser = await UserModel.create({
        ...req.body,
        password: hashedPassword,
        displayName,
      });
      if (!newUser) {
        res.status(400).end();
      }
      res.status(200).json({ data: newUser });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  },
};
