import * as express from 'express';
import { NextFunction } from "express-serve-static-core";
import { CardsModel } from "../../../schemas/Card";

const deleteCard = (req: express.Request | any, res: express.Response, next: NextFunction) => {
  if (req.user && req.body) {
    CardsModel.deleteOne({ _id: req.body.id }, (err: Error) => {
      if (err) console.error(err.message);
      console.log(`Card ${req.body.id} deleted`);
      res.sendStatus(200);
    })
  }
}

export default deleteCard;