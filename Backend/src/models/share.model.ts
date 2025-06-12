import mongoose, { Schema, model } from 'mongoose';
import { IShareLink } from '../interfaces/share.interface';

const shareLinkSchema = new Schema<IShareLink>(
  {
    linkId: { 
      type: String, 
      required: true, 
      unique: true 
    },
    owner: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    contentIds: [
      { 
        type: Schema.Types.ObjectId, 
        ref: 'Content' 
      }
    ],
    privacy: {
      type: String,
      enum: ['private', 'public'],
      default: 'private',
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default model<IShareLink>('ShareLink', shareLinkSchema);