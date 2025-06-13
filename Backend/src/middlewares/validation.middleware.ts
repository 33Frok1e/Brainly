import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';
import ApiError from '../utils/apiError';
import httpStatus from 'http-status';

const validate = (schema: AnyZodObject) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      next(new ApiError(httpStatus.BAD_REQUEST, 'Validation error', false, error));
    }
  };

export default validate;