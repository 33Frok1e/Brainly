import mongoose, { Schema } from 'mongoose';

const tagSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
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

// Ensure unique tag names per user
tagSchema.index({ name: 1, createdBy: 1 }, { unique: true });

const Tag = mongoose.model('Tag', tagSchema);

export default Tag;