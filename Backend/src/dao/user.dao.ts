import { IUser, IUserDocument } from "../interfaces/user.interface";
import User from "../models/user.model"

export const findUserByEmail = async (email: string): Promise<IUserDocument | null> => {
    return await User.findOne({ email }).select('+password');
}

export const createUser = async (userData: IUser) => {
    const user = new User(userData)
    return await user.save();
}