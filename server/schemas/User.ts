const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

export interface UserSchemaTypes {
    firstName: string
    lastName: string
    email: string
    displayName: string
    password: string
    id: string
    group: string[] 
}
export const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    displayName: String,
    id: String,
    group: [[Schema.Types.ObjectId]]
})

export const UserModel = Model('User', UserSchema);