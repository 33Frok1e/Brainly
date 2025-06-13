import { Response } from 'express';
import httpStatus from 'http-status';

const successResponse = (
  res: Response,
  data: any,
  message: string = 'Success',
  statusCode: number = httpStatus.OK
): void => {
  res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const errorResponse = (
  res: Response,
  message: string = 'Something went wrong',
  statusCode: number = httpStatus.INTERNAL_SERVER_ERROR,
  error: any = {}
): void => {
  res.status(statusCode).json({
    success: false,
    message,
    error,
  });
};

export { successResponse, errorResponse };