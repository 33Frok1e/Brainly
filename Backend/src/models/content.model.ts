import mongoose, { Schema, model } from "mongoose";
import { IContent } from "../interfaces/content.interface";

const contentSchema = new Schema<IContent>(
  {
    title: {
      type: String,
      required: true,
    },
    sourceType: {
      type: String,
      required: true,
      enum: ["twitter", "youtube", "note"],
    },
    url: {
      type: String,
    },
    contentText: {
      type: String,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Content = mongoose.model<IContent>('Content', contentSchema);
export default Content;

// export default model<IContent>("Content", contentSchema);
