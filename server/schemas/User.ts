const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Model = mongoose.model;

export interface UserSchemaTypes {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    id: string
}
export const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    id: String 
})

export const UserModel = Model('User', UserSchema);