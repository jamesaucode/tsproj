import { Document, Model, model, Schema } from "mongoose";
import { CardTypes, CardSchema } from "../card/card.model";

type name = string;

export interface UserTypes {
  _id: string;
  firstName: name;
  lastName: name;
  email: string;
  displayName: name;
  cardSet: CardTypes[];
  password: string;
  googleId?: string;
  group: string[];
}
// export interface UserModelTypes extends Document, UserTypes {
//     placeholder?: string;
// }
export const UserSchema: Schema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true },
  password: { type: String, minlength: 8 },
  displayName: String,
  googleId: String, //optional
  cardSet: [CardSchema],
  group: [[Schema.Types.ObjectId]],
});

UserSchema.methods.fullName = function(): string {
  return this.firstName.trim() + " " + this.lastName.trim();
};

export const UserModel: Model<Document> = model("User", UserSchema);
