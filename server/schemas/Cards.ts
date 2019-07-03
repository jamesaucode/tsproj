import { Document, Schema, Model, model } from 'mongoose';

export interface ICards {
    question: string,
    answer: string
}

export interface ICardsModel extends Document, ICards {

}

export const CardsSchema : Schema = new Schema({
    question: String,
    answer: String
})

export const CardsModel : Model<ICardsModel> = model<ICardsModel>('Cards', CardsSchema);