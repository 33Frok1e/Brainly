import { Request, Response, NextFunction } from "express";
import { signupValidation } from "../validations/auth.validation";
import userDao from "../dao/user.dao";
import { generateToken } from "../services/token.service";
import { cookieOptions } from "../utils/cookieOptions";
import { successResponse } from "../utils/apiResponse";

export const signUpController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = await signupValidation.parseAsync(req)

        const user = await userDao.createUser({
            fullName: body.fullName,
            email: body.email,
            passwordHash: body.password
        });

        const token = generateToken({ userId: user.id});

        res.cookie('accessToken', token, cookieOptions);

        successResponse(res, {
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                // passwordHash: user.passwordHash --> Password shouldn't be sent
                avatarUrl: user.avatarUrl
            }
        })
    } catch(e) {
        next(e)
    }
};

export const signInController = (req: Request, res: Response) => {
    console.log("login successfully !")
};

export const logoutController = (req: Request, res: Response) => {
    console.log("logout successfully !")
}

export const getCurrentUser = (req: Request, res: Response) => {
    console.log("User Fetched!");
}