import { Document, Model, model, Schema } from 'mongoose';

export interface IUser {
    _id: string
    firstName: string
    lastName: string
    email: string
    displayName: string
    password: string
    googleId?: string
    group: string[] 
}
// export interface IUserModel extends Document, IUser {

// }
export const UserSchema : Schema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    displayName: String,
    googleId: String, //optional
    group: [[Schema.Types.ObjectId]]
})

UserSchema.methods.fullName = function() : string {
    return this.firstName.trim() + " " + this.lastName.trim();
}


export const UserModel : Model<any> = model('User', UserSchema);