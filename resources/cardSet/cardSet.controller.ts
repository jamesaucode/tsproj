import { crudControllers } from "../../utils/crud";
import { CardSetModel } from "./cardSet.model";
import { CardsModel } from "../card/card.model";
import express from "express";

export default {
  ...crudControllers(CardSetModel),
  insertOne: async (
    req: express.Request,
    res: express.Response,
  ): Promise<void> => {
    try {
      const card = await CardsModel.create({
        ...req.body,
        creator: req.user._id,
      });
      const updatedDoc = await CardSetModel.findOneAndUpdate(
        {
          creator: req.user._id,
          _id: req.params.id,
        },
        { $push: { cards: card } },
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
