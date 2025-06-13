import { NextFunction, Request, Response } from 'express';
import ApiError from '../utils/apiError';
import logger from '../utils/logger';
import httpStatus from 'http-status';

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;
  
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode as keyof typeof httpStatus] as string || 
    'Unknown error';
    error = new ApiError(statusCode, message, false);
  }

  const { statusCode, message } = error;
  
  if (statusCode >= 500) {
    logger.error(error);
  } else if (statusCode >= 400) {
    logger.warn(error);
  }

  res.locals.errorMessage = message;

  const response = {
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  };

  res.status(statusCode).json(response);
};

export { errorHandler };