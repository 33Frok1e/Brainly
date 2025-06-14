import { Types } from "mongoose";
import { IContent, ICreateContent } from "../interfaces/content.interface";
import Content from "../models/content.model";
import ApiError from "../utils/apiError";
import httpStatus from 'http-status'

const createContent = async (contentData: ICreateContent): Promise<IContent> => {
  return Content.create(contentData);
};

const getContentById = async (id: string): Promise<IContent | null> => {
  return await Content.findById(id).populate([
    { path: 'tags' },
    { path: 'createdBy', select: 'fullName email avatarUrl' }
  ])
};

const updatedContentById = async (id: string, updateData: Partial<IContent>): Promise<IContent | null> => {
  const content = await Content.findByIdAndUpdate(id, updateData, { new: true } );
  if(!content) {
    throw new ApiError(httpStatus.NOT_FOUND, "Content Not Found!")
  }
  return content;
};

const getContentByUser = async (
  userId: string,
  limit: number = 10,
  cursor?: string
): Promise<IContent[]> => {
  const query: any = { createdBy: userId };
  
  if (cursor) {
    query._id = { $lt: new Types.ObjectId(cursor) };
  }

  return Content.find(query)
    .sort({ _id: -1 })
    .limit(limit)
    .populate('tags')
    .populate('createdBy', 'fullName email avatarUrl');
};

const deleteContentById = async (id: string): Promise<void> => {
  const content = await Content.findByIdAndDelete(id);
  if(!content) {
    throw new ApiError(httpStatus.NOT_FOUND, "Content Not Found!")
  }
};


export default {
  createContent,
  getContentById,
  updatedContentById,
  getContentByUser,
  deleteContentById
}