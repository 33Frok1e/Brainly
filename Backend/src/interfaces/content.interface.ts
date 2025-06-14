import { Document, Types } from 'mongoose'

export type SourceType = 'twitter' | 'youtube' | 'note';

// Interface for the document returned from MongoDB
export interface IContent extends Document {
    title: string;
    sourceType: SourceType;
    url?: string;
    contentText: string;
    tags: Types.ObjectId[];
    createdBy: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

// Interface for creating a new content document
export interface ICreateContent {
    title: string;
    sourceType: SourceType;
    url?: string;
    contentText: string;
    tags: Types.ObjectId[];
    createdBy: string; // String ID from request
}