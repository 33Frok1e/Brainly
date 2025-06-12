import mongoose, { Schema, model } from "mongoose";
import { ITag } from "../interfaces/tag.interface";

const tagSchema = new Schema<ITag>(
  {
    name: { 
      type: String, 
      required: true 
    },
    createdBy: { 
      type: Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
  },
  { timestamps: true }
);

tagSchema.index({ name: 1, createdBy: 1 }, { unique: true });

export default model<ITag>("Tag", tagSchema);
