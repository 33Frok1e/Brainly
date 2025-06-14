import { Request, Response, NextFunction } from "express";
import { signinValidation, signupValidation } from "../validations/auth.validation";
import userDao from "../dao/user.dao";
import { generateToken } from "../services/token.service";
import { cookieOptions } from "../utils/cookieOptions";
import { successResponse } from "../utils/apiResponse";
import ApiError from "../utils/apiError";
import httpStatus from 'http-status'

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
                // Password shouldn't be sent
                avatarUrl: user.avatarUrl
            }
        }, 'Registerd Successfully!')
    } catch(e) {
        next(e)
    }
};

export const signInController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body } = await signinValidation.parseAsync(req)

        const user = await userDao.getUserByEmail(body.email)
        if(!user) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Credentials')
        }

        const isPasswordValid = await user.comparePassword(body.password)
        if(!isPasswordValid) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid Credentials')
        }

        const token = generateToken({ userId: user.id })

        res.cookie('accessToken', token, cookieOptions);

        successResponse(res, {
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                avatarUrl: user.avatarUrl
            }
        }, 'Logged in Succesfully!');
    } catch(e) {
        next(e)
    }
};

export const logoutController = (req: Request, res: Response) => {
    res.clearCookie('accessToken');
    successResponse(res, null, 'Logged out successfully!')
};

export const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user?.id) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Not Authenticated');
      }

      const user = await userDao.getUserById(req.user.id);
      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
      }
  
      successResponse(res, {
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          avatarUrl: user.avatarUrl,
        },
      });
    } catch (error) {
      next(error);
    }
};