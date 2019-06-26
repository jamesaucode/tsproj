const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

export interface CardsScehmaTypes {
    question: string,
    answer: string,
    id: string
}

export const CardsSchema = new Schema({
    question: String,
    answer: String,
    id: String
})

export const CardsModel = Model('Cards', CardsSchema);