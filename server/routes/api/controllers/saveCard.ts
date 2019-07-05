import * as express from "express";
import { CardsModel, CardSchema } from "../../../schemas/Card";
import { CardSetModel, CardSetSchema } from "../../../schemas/CardSet";

const saveCard: express.RequestHandler = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }
  if (req.body) {
    if (!req.body.question || !req.body.answer) {
      console.log("Empty question or answer, cannot be saved!");
      return res.status(400).json({ message: "Cannot save this card" });
    }
    const CardInstance = new CardsModel(req.body);
    console.log(CardInstance.isCreator(req.user._id));
    /* Using findOneAndUpdate with upsert so if the cardset doesn't already exist, it will be created */
    CardSetModel.findOneAndUpdate(
      { creator: req.body.creator, name: req.params.cardSetName },
      { $push: { cards: CardInstance } },
      { upsert: true },
      (err: Error) => {
        if (err) {
          console.log(err.message);
          return res.json({ message: err.message });
        } else {
          console.log("Saved!");
          CardInstance.save();
          return res.json({ message: "Card saved!" });
        }
      }
    );
  }
};

export default saveCard;
