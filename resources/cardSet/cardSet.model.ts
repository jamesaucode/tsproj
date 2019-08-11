import { Document, Schema, Model, model } from "mongoose";
import { CardSchema, CardModelTypes } from "../card/card.model";

type UserId = string;
type CardId = string;

export interface CardSetDocument extends Document {
  name: string;
  cards: CardModelTypes[];
  creator: UserId;
  accessible: UserId[];
}

export interface CardSetModelTypes extends Model<CardSetDocument> {
  placeholder?: string;
}

export const CardSetSchema: Schema = new Schema({
  name: String,
  cards: [CardSchema],
  creator: Schema.Types.ObjectId,
  accessible: [Schema.Types.ObjectId],
  createdAt: { type: Date, default: Date.now },
});

CardSetSchema.method({
  isCreator: function(id: UserId): boolean {
    return id === this.creator;
  },
});

export const CardSetModel: CardSetModelTypes = model<
  CardSetDocument,
  CardSetModelTypes
>("CardSet", CardSetSchema);
