import { crudControllers } from "../../utils/crud";
import { GroupModel } from "./group.model";
import express from "express";
import console = require("console");

export default {
  ...crudControllers(GroupModel),
  joinGroupAsMember: async (
    req: express.Request,
    res: express.Response,
  ): Promise<void> => {
    try {
      const updatedDoc = await GroupModel.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $push: { usersId: req.user._id } },
      )
        .lean()
        .exec();

      if (!updatedDoc) {
        res.status(400).end();
      }
      res.status(200).json({ data: updatedDoc });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  },
  leaveGroup: async (
    req: express.Request,
    res: express.Response,
  ): Promise<void> => {
    try {
      const updatedDoc = await GroupModel.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        { $pull: { usersId: req.user._id } },
      )
        .lean()
        .exec();

      if (!updatedDoc) {
        res.status(400).end();
      }
      res.status(200).json({ data: updatedDoc });
    } catch (e) {
      console.error(e);
      res.status(400).end();
    }
  },
};
