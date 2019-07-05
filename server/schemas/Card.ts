import { Document, Schema, Model, model } from 'mongoose';
import { CardSetSchema } from './CardSet';

type UserId = string;
type Date = string | number;

export interface ICard {
    question: string,
    answer: string,
    creator: UserId,
    createdAt: Date 
    // findByUserId(id : UserId): any;
    // isCreator(id:UserId): boolean;
    // lmao(): void;
}
export interface ICardModel extends Document, ICard {
    findByUserId(id : UserId): boolean;
    isCreator(id:UserId): boolean;
    lmao(): void;
}

export const CardSchema : Schema = new Schema({
    question: String,
    answer: String,
    creator: Schema.Types.ObjectId,
    createdAt: { type: Date, default: Date.now }
})
export const CardsModel : Model<ICardModel> = model<ICardModel>('Cards', CardSchema);

CardSchema.method({
    lmao: function() {
        console.log('lmao');
    },
    isCreator: function(id : UserId) {
        return this.creator === id;
    }
})

CardSchema.static('findByUserId', function(this : any, id : UserId)  {
    return this.find({ creator: id});
})