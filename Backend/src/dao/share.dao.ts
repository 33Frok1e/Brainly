import { IShareLink } from "../interfaces/share.interface";
import ShareLink from "../models/share.model";
import { v4 as uuidv4 } from 'uuid'
import ApiError from "../utils/apiError";
import httpStatus from 'http-status'

const createShareLink = async (ownerId:string, contentIds: string[]): Promise<IShareLink> => {
    const shareLink = await ShareLink.create({
        linkId: uuidv4(),
        owner: ownerId,
        contentIds,
        privacy: 'public',
        active: true
    });
    return shareLink
};

const getShareLinkById = async (linkId: string): Promise<IShareLink | null> => {
    return await ShareLink.findOne({ linkId }).populate('contentIds').populate('owner', 'fullName email avatarUrl')
};

const deactivateShareLink = async (linkId: string, ownerId: string): Promise<void> => {
    const shareLink = await ShareLink.findOneAndUpdate(
        { linkId, owner: ownerId },
        { active: false },
        { new: true }
    );
    if(!shareLink) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Share link not found or disable by owner!')
    }
}

export default {
    createShareLink,
    getShareLinkById,
    deactivateShareLink
}