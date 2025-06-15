import { NextFunction, Request, Response } from 'express'
import { createTagValidation } from '../validations/tag.validation'
import tagDao from '../dao/tag.dao'
import { successResponse } from '../utils/apiResponse'
import httpStatus from 'http-status'
import ApiError from '../utils/apiError'

export const createTagController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user?.id) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authenticated');
        }
        const { body } = await createTagValidation.parseAsync(req)

        const tag = await tagDao.createTag({
            name: body.name,
            createdBy: req.user.id
        })

        successResponse(res, tag, 'Tag Created successfully!', httpStatus.CREATED)
    } catch(e) {
        next(e);
    }
};

export const getTagsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user?.id) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authenticated');
        }
        const tags = await tagDao.getTagsByUser(req.user.id);
        successResponse(res, tags)
    } catch(e) {
        next(e);
    }
};

export const deleteTagsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const existingTag = await tagDao.getTagById(id);
        if(!existingTag) {
            throw new ApiError(httpStatus.NOT_FOUND, "Tag not found")
        }
    
        if(existingTag.createdBy._id.toString() !== req.user?.id) {
            throw new ApiError(httpStatus.FORBIDDEN, "Not authorized to delete this tag")
        }
        await tagDao.deleteTagById(id);
        successResponse(res, null, "Tag deleted successfully!")
    } catch(e) {
        next(e);
    }
};