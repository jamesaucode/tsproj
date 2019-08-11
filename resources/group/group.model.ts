import { Document, Schema, Model, model } from "mongoose";

type UserId = string;
export interface GroupTypes {
  name: string;
  creator: UserId;
  adminId?: UserId[];
  usersId?: UserId[];
}
export interface GroupModelTypes extends Document, GroupTypes {}

export const GroupSchema: Schema = new Schema({
  name: String,
  adminId: [Schema.Types.ObjectId],
  usersId: [Schema.Types.ObjectId],
  creator: Schema.Types.ObjectId,
});
GroupSchema.methods.isMemberById = function(id: string): boolean {
  return this.usersId.include(id) || this.adminId.include(id);
};
GroupSchema.methods.isAdminById = function(id: string): boolean {
  return this.adminId.include(id);
};

export const GroupModel: Model<GroupModelTypes> = model<GroupModelTypes>(
  "Group",
  GroupSchema,
);
