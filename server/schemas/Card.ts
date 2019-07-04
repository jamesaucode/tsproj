import { Document, Schema, Model, model } from 'mongoose';

type UserId = string;

export interface ICard {
    question: string,
    answer: string,
    creator: UserId 
}
export interface ICardModel extends Document, ICard {
    findByUserId(id : UserId): boolean;
}

export const CardSchema : Schema<ICardModel> = new Schema({
    question: String,
    answer: String,
    creator: Schema.Types.ObjectId 
})

CardSchema.statics.findByUserId = function(id : UserId) : boolean {
    return this.find({ creator: id });
}

export const CardsModel : Model<ICardModel> = model<ICardModel>('Cards', CardSchema);