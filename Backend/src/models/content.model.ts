import mongoose, { Schema, Document } from 'mongoose';

const contentTypes = ['twitter', 'youtube', 'gdocs', 'note', 'image', 'video', 'article', 'audio'];

const contentSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    sourceType: {
      type: String,
      enum: contentTypes,
      required: true,
    },
    url: {
      type: String,
      trim: true,
    },
    contentText: {
      type: String,
      trim: true,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Content = mongoose.model('Content', contentSchema);

export default Content;