import { NextFunction, Request, Response } from "express"
import { createContentValidation, getContentsValidation, updateContentValidation } from "../validations/content.validation"
import  mongoose, { Types } from "mongoose"
import tagDao from '../dao/tag.dao'
import { successResponse } from "../utils/apiResponse";
import httpStatus from 'http-status'
import contentDao from "../dao/content.dao";
import ApiError from "../utils/apiError";
import { ICreateContent } from "../interfaces/content.interface";
import { ICreateTag } from '../interfaces/tag.interface'
import { ITag } from "../interfaces/tag.interface";

export const createContentController = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = await createContentValidation.parseAsync(req);
      
      if (!req.user?.id) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Not authenticated');
      }

      const userId = req.user.id; // Store user ID to avoid repeated optional chaining

      // Process tags
      let tagIds: Types.ObjectId[] = [];
      if (body.tags && body.tags.length > 0) {
        const tagPromises = body.tags.map(tagName => 
          tagDao.createTag({
            name: tagName,
            createdBy: userId,
          } as ICreateTag)
        );
        const tags = await Promise.all(tagPromises) as ITag[];
        tagIds = tags.map(tag => tag._id);
      }
  
      const contentData: ICreateContent = {
        title: body.title,
        sourceType: body.sourceType,
        url: body.url || undefined,
        contentText: body.contentText || '',
        tags: tagIds,
        createdBy: userId,
      };

      const content = await contentDao.createContent(contentData);
      successResponse(res, content, 'Content created successfully', httpStatus.CREATED);
    } catch (error) {
      next(error);
    }
};

export const updateContentController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = await updateContentValidation.parseAsync(req)
        const { id } = req.params

        const existingContent = await contentDao.getContentById(id);
        if(!existingContent) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Content not found')
        }
        if (existingContent.createdBy._id.toString() !== req.user?.id) {
            throw new ApiError(httpStatus.FORBIDDEN, 'Not authorized to update this content');
        }

        let tagIds: Types.ObjectId[] | undefined;
        if (body.tags && body.tags.length > 0) {
        const tagPromises = body.tags.map(tagName => 
            tagDao.createTag({
            name: tagName,
            createdBy: req.user?.id,
            } as ICreateTag)
        );
        const tags = await Promise.all(tagPromises) as ITag[];
        tagIds = tags.map(tag => tag._id);
        }

        const updatedContent = await contentDao.updatedContentById(id, {
            title: body.title,
            sourceType: body.sourceType,
            contentText: body.contentText,
            ...(tagIds && {tags: tagIds})
        })

    successResponse(res, updatedContent, 'Content Updated Successfully!')
    } catch(e) {
        next(e)
    }
};

export const getContents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { query } = await getContentsValidation.parseAsync(req)

        if (!req.user?.id) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Not authenticated');
        }

        const userId = req.user.id;

        const contents = await contentDao.getContentByUser(
            userId,
            query.limit,
            query.cursor
        );

        successResponse(res, contents, 'Contents retrieved successfully');
    } catch(e) {
        next(e)
    }
};

export const getContent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const content = await contentDao.getContentById(id);

    if(!content) {
        throw new ApiError(httpStatus.NOT_FOUND, "Content Not Found!");
    }

    if(content.createdBy._id.toString() !== req.user?.id) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Not authorize to view this content')
    }

    successResponse(res, content)
  } catch(e) {
    next(e)
  }
};

export const deleteContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params
        const existingContent = await contentDao.getContentById(id)

        if(!existingContent) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Content Not Found!')
        }

        if(existingContent.createdBy._id.toString() !== req.user?.id) {
            throw new ApiError(httpStatus.FORBIDDEN, "Not Authorized to delete this content")
        }

        await contentDao.deleteContentById(id);
        successResponse(res, null, "Content Deleted successfully!")
    } catch(e) {
        next(e)
    }
};