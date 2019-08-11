import { Document, Schema, Model, model } from "mongoose";

type UserId = string;
type Date = string | number;

export interface CardTypes {
  question: string;
  answer: string;
  creator: UserId;
  createdAt: Date;
}
export interface CardModelTypes extends Document, CardTypes {}

export const CardSchema: Schema = new Schema({
  question: String,
  answer: String,
  creator: Schema.Types.ObjectId,
  createdAt: { type: Date, default: Date.now },
});
export const CardsModel: Model<CardModelTypes> = model<CardModelTypes>(
  "Cards",
  CardSchema,
);
