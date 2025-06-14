import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/token.service';
import ApiError from '../utils/apiError';
import httpStatus from 'http-status';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;
    
    // Check for token in cookies first
    if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }
    
    // If not in cookies, check Authorization header
    if (!token && req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Not authenticated');
    }

    try {
      const decoded = verifyToken(token);
      req.user = { id: decoded.userId };
      next();
    } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid token');
    }
  } catch (error) {
    next(error);
  }
};

export default auth;