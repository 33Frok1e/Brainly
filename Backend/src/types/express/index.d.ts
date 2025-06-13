import { Request } from 'express';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface Request {
      user?: {
        id: string;
        // userId: mongoose.Types.ObjectId;
      };
    }
  }
} 