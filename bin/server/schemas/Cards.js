"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.CardsSchema = new mongoose_1.Schema({
    question: String,
    answer: String
});
exports.CardsModel = mongoose_1.model('Cards', exports.CardsSchema);
//# sourceMappingURL=Cards.js.map