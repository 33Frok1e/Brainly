import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../services/token.service';
import ApiError from '../utils/apiError';
import httpStatus from 'http-status';

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;
    
    // Check for token in cookies first
    if (req.cookies?.token) {
      token = req.cookies.token;
    }
    
    // If not in cookies, check Authorization header
    if (!token && req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Not Authenticated');
    }

    const decoded = verifyToken(token);
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;