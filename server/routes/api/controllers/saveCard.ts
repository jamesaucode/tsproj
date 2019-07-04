import * as express from 'express';
import { CardsModel } from "../../../schemas/Card";

const saveCard = (
  req: Request | any,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.body) {
    console.log(req.body);
    if (!req.body.question || !req.body.answer) {
      console.log('Empty question or answer, cannot be saved!');
      res.status(400).json({ message: "Cannot save this card", good: false });
      return;
    }
    const CardInstance = new CardsModel(req.body);
    CardInstance.save((err: Error) => {
      if (err) return res.json({ message:err.message, good: false});
      console.log('Card saved');
      res.json({ message: 'Card saved!', good: true });
      return ;
    })
  }
};

export default saveCard;