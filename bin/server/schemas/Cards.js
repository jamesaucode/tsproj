"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
exports.CardsSchema = new Schema({
    question: String,
    answer: String,
    id: String
});
exports.CardsModel = Model('Cards', exports.CardsSchema);
//# sourceMappingURL=Cards.js.map