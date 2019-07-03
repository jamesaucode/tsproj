import { Document, Schema, Model, model} from 'mongoose';

export interface IGroup {
    name: string
    ownerId: string[],  // id
    usersId?: string[]
}
export interface IGroupModel extends Document, IGroup {
    isMemberById(id : string): boolean;
}

export const GroupSchema : Schema = new Schema({
    name: String,
    ownerId: [Schema.Types.ObjectId],
    usersId: [Schema.Types.ObjectId]
}) 
GroupSchema.methods.isMemberById = function(id : string) : boolean {
    return this.usersId.include(id) || this.ownerId.include(id);
}

export const GroupModel : Model<IGroupModel> = model<IGroupModel>('Group', GroupSchema);