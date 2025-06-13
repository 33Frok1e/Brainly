import { IUser } from "../interfaces/user.interface";
import User from "../models/user.model";
import ApiError from "../utils/apiError";
import httpStatus from 'http-status'

const createUser = async (userData: Partial<IUser>): Promise<IUser> => {
    const existingUser = await User.findOne({ email: userData.email})
    if(existingUser) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already taken');
    }
    return User.create(userData);
};

export default {
    createUser
}