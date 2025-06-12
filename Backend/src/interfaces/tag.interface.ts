import { Document } from 'mongoose'

export interface ITag extends Document {
    name: string;
    createdBy: any;
    createdAt: Date;
    updatedAt: Date;
}