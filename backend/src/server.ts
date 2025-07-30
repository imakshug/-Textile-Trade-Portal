import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import { errorHandler, notFound } from './middleware/errorMiddleware';
import { logger } from './utils/logger';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import categoryRoutes from './routes/categoryRoutes';
import quotationRoutes from './routes/quotationRoutes';
import adminRoutes from './routes/adminRoutes';
import notificationRoutes from './routes/notificationRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Security middleware
app.use(helmet());
app.use(compression());
app.use(limiter);

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    data: {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
    },
  });
});

// API routes
const API_PREFIX = `/api/${process.env.API_VERSION || 'v1'}`;

app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/users`, userRoutes);
app.use(`${API_PREFIX}/products`, productRoutes);
app.use(`${API_PREFIX}/categories`, categoryRoutes);
app.use(`${API_PREFIX}/quotations`, quotationRoutes);
app.use(`${API_PREFIX}/admin`, adminRoutes);
app.use(`${API_PREFIX}/notifications`, notificationRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Database connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.NODE_ENV === 'test' 
      ? process.env.MONGODB_URI_TEST 
      : process.env.MONGODB_URI;
    
    if (!mongoURI) {
      throw new Error('MongoDB URI is not defined');
    }

    await mongoose.connect(mongoURI);
    logger.info(`MongoDB connected: ${mongoURI}`);
  } catch (error) {
    logger.error('Database connection failed:', error);
    process.exit(1);
  }
};

// Graceful shutdown
const gracefulShutdown = (server: any) => {
  logger.info('Received shutdown signal. Closing server gracefully...');
    server.close(() => {
    logger.info('HTTP server closed.');
    
    mongoose.disconnect().then(() => {
      logger.info('MongoDB connection closed.');
      process.exit(0);
    }).catch((error) => {
      logger.error('Error closing MongoDB connection:', error);
      process.exit(1);
    });
  });

  // Force close server after 30secs
  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 30000);
};

// Start server
const startServer = async () => {
  try {
    await connectDB();
    
    const server = app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
    });

    // Handle shutdown signals
    process.on('SIGTERM', () => gracefulShutdown(server));
    process.on('SIGINT', () => gracefulShutdown(server));

    return server;
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server if this file is run directly
if (require.main === module) {
  startServer();
}

export default app;
