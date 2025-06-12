import { Document } from 'mongoose'

export type SourceType = 'twitter' | 'youtube' | 'note';

export interface IContent extends Document {
    title: string;
    sourceType: SourceType;
    url?: string;
    contentText: string;
    tags: any[];
    createdBy: any;
    createdAt: Date;
    updatedAt: Date;
}