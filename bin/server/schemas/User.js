"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;
exports.UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    displayName: String,
    id: String,
    group: [[Schema.Types.ObjectId]]
});
exports.UserModel = Model('User', exports.UserSchema);
//# sourceMappingURL=User.js.map