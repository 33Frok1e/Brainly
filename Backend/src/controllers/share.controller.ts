import { NextFunction, Request, Response } from "express";
import { createShareLinkValidation } from "../validations/share.validation";
import shareDao from "../dao/share.dao";
import httpStatus from 'http-status'
import { successResponse } from "../utils/apiResponse";
import ApiError from "../utils/apiError";


export const createShareLinkController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user?.id) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authenticated');
        }
        const { body } = await createShareLinkValidation.parseAsync(req)

        const shareLink = await shareDao.createShareLink(req.user.id, body.contentId)

        successResponse(res, shareLink, 'Share Link Created successfully!', httpStatus.CREATED)
    } catch(e) {
        next(e);
    }
};

export const getSharedContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { linkId } = req.params

        const shareLink = await shareDao.getShareLinkById(linkId)

        if(!shareLink) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Link Not Found!')
        }
        if(!shareLink.active) {
            throw new ApiError(httpStatus.GONE, 'This Link is no longer active!')
        }

        successResponse(res, {
            owner: shareLink.owner,
            contents: shareLink.contentIds
        });
    } catch(e) {
        next(e);
    }
};

export const deactiveShareLink = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.user?.id) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authenticated');
        }
        const { linkId } = req.params;

        await shareDao.deactivateShareLink(linkId, req.user.id);
        successResponse(res, null, 'Share link deactivate successfully!')
    } catch(e) {
        next(e);
    }
};