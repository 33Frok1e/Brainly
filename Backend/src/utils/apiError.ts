class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;
  error?: any;
  
  constructor(statusCode: number, message: string, isOperational = true, error?: any) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.error = error;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;