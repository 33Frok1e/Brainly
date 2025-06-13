import config from '../config/env'
import { IAuthTokenPayload } from "../interfaces/auth.interface";
import jwt from 'jsonwebtoken'

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
    return jwt.verify(token, config.jwtSecret) as IAuthTokenPayload
}