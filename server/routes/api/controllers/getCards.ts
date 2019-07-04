import * as express from 'express';
import { CardsModel, ICard } from "../../../schemas/Card";

const getCards = (
  req: Request | any,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.user) {
    CardsModel.find(
      { creator: req.user._id },
      (err: Error, cards: ICard) => {
        if (err) throw err;
        console.log(cards);
        res.json(cards);
      }
    );
  } else {
    res.sendStatus(400);
    next();
  }
}

export default getCards;