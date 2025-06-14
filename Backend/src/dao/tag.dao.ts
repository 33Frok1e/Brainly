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

export default {
    createTag
}