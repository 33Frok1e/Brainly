import { ITag } from "../interfaces/tag.interface";
import { ICreateTag } from "../interfaces/tag.interface";
import Tag from "../models/tag.model";
import ApiError from "../utils/apiError";
import httpStatus from "http-status";

const createTag = async (tagData: ICreateTag): Promise<ITag> => {
    try {
        return await Tag.create(tagData)
    } catch (error) {
        if((error as any).code == 11000) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Tag already exists for this user')
        }
        throw error;
    }
};

const getTagsByUser = async (userId: string): Promise<ITag[]> => {
    const tags = await Tag.find({ createdBy: userId });
    return tags || [];
};

const getTagById = async (id: string): Promise<ITag | null> => {
  return await Tag.findById(id);
};

const deleteTagById = async (id: string): Promise<void> => {
  const tag = await Tag.findByIdAndDelete(id);
  if (!tag) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Tag not found');
  }
};

export default {
    createTag,
    getTagsByUser,
    getTagById,
    deleteTagById
}