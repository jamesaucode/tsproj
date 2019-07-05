import { Document, Schema, Model, model, Error} from 'mongoose';
import { CardsModel, ICard, CardSchema, ICardModel } from './Card';

type UserId = string;
type CardId = string;

export interface ICardSetDocument extends Document{
    name: string
    cards: CardId[],
    creator: UserId,
    accessible: UserId[]
}

export interface ICardSetModel extends Model<ICardSetDocument> {
}

export const CardSetSchema : Schema = new Schema({
    name: String,
    cards: [CardSchema],
    creator: Schema.Types.ObjectId,
    accessible: [Schema.Types.ObjectId],
    createdAt: { type: Date, default: Date.now },
    // isCreator(id : UserId),
    // isAccessible(id : UserId)
})

CardSetSchema.pre<ICardSetDocument>("save", function() {

})

CardSetSchema.method({
    isCreator: function(id: UserId) {
        return id === this.creator
    }
})


// CardSetSchema.methods.isCreator = function(id : UserId) {
//     return this.creator === id;
// }
// CardSetSchema.methods.isAccessible = function(id : UserId) {
//     return this.accessible.includes(id);
// }

export const CardSetModel : ICardSetModel = model<ICardSetDocument, ICardSetModel>('CardSet', CardSetSchema);