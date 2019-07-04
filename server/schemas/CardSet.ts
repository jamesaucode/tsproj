import { Document, Schema, Model, model} from 'mongoose';

export interface ICardSet {
    name: string
    cards: string[],
    creator: string,
    accessible: string[]
}

export interface ICardSetModel extends ICardSet, Document {
    isCreator(id : string): boolean;
    isAccessible(id : string): boolean;
}

export const CardSetSchema : Schema = new Schema({
    name: String,
    cards: [Schema.Types.ObjectId],
    creator: Schema.Types.ObjectId,
    accessible: [Schema.Types.ObjectId]
})

CardSetSchema.methods.isCreator = function(id : string) {
    return this.creator === id;
}
CardSetSchema.methods.isAccessible = function(id : string) {
    return this.accessible.include(id);
}

export const ICardsSetModel : Model<ICardSetModel> = model<ICardSetModel>('CardSet', CardSetSchema);