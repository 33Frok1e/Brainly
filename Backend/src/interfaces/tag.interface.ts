import { Document, Types } from 'mongoose'

export interface ITag extends Document {
    _id: Types.ObjectId;
    name: string;
    createdBy: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

// Interface for creating a new tag
export interface ICreateTag {
    name: string;
    createdBy: string; // String ID from request
}