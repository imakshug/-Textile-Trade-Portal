import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export interface ApiError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const createError = (
  message: string,
  statusCode: number = 500,
  isOperational: boolean = true
): ApiError => {
  const error = new Error(message) as ApiError;
  error.statusCode = statusCode;
  error.isOperational = isOperational;
  return error;
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = createError(`Not Found - ${req.originalUrl}`, 404);
  next(error);
};

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  logger.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = createError(message, 404);
  }

  // Mongoose duplicate key
  if (err.name === 'MongoServerError' && (err as any).code === 11000) {
    const message = 'Duplicate field value entered';
    error = createError(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values((err as any).errors)
      .map((val: any) => val.message)
      .join(', ');
    error = createError(message, 400);
  }

  // JWT error
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = createError(message, 401);
  }

  // JWT expired error
  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = createError(message, 401);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    meta: {
      timestamp: new Date().toISOString(),
      requestId: req.headers['x-request-id'] || 'unknown',
    },
  });
};
