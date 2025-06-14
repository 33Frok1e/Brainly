import config from '../config/env'
import { IAuthTokenPayload } from "../interfaces/auth.interface";
import jwt from 'jsonwebtoken'
import ApiError from '../utils/apiError';
import httpStatus from 'http-status';

export const generateToken = (payload: IAuthTokenPayload): string => {
    return jwt.sign(
      payload,
      config.jwtSecret,
      {
        expiresIn: config.jwtExpiresIn
      } as jwt.SignOptions // Explicit type assertion
    );
};

export const verifyToken = (token: string): IAuthTokenPayload => {
    try {
      return jwt.verify(token, config.jwtSecret) as IAuthTokenPayload;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Token expired');
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
      }
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Authentication failed');
    }
}