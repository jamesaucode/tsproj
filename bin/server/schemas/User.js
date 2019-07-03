"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    displayName: String,
    googleId: String,
    group: [[mongoose_1.Schema.Types.ObjectId]]
});
exports.UserSchema.methods.fullName = function () {
    return this.firstName.trim() + " " + this.lastName.trim();
};
exports.UserModel = mongoose_1.model('User', exports.UserSchema);
//# sourceMappingURL=User.js.map