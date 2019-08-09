import { Document, Schema, Model, model } from "mongoose";
import { CardSchema } from "../card/card.model";

type UserId = string;
type CardId = string;

export interface CardSetDocument extends Document {
  name: string;
  cards: CardId[];
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
  // isCreator(id : UserId),
  // isAccessible(id : UserId)
});

// CardSetSchema.pre<CardSetDocument>("save", function() {});

CardSetSchema.method({
  isCreator: function(id: UserId): boolean {
    return id === this.creator;
  },
});

// CardSetSchema.methods.isCreator = function(id : UserId) {
//     return this.creator === id;
// }
// CardSetSchema.methods.isAccessible = function(id : UserId) {
//     return this.accessible.includes(id);
// }

export const CardSetModel: CardSetModelTypes = model<
  CardSetDocument,
  CardSetModelTypes
>("CardSet", CardSetSchema);
