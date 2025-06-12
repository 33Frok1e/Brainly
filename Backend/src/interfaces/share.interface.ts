import { Document } from 'mongoose'

export type PrivacyType = 'private' | 'public'

export interface IShareLink extends Document {
    linkId: string;
    owner: any;
    contentIds: any[];
    privacy: PrivacyType;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
}