import mongoose, { Schema } from 'mongoose';

const shareSchema: Schema = new Schema(
  {
    linkId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    contentIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Content',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const ShareableLink = mongoose.model('ShareableLink', shareSchema);

export default ShareableLink;