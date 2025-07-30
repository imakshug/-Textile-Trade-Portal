import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

// Security middleware
app.use(helmet());
app.use(compression());

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

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    data: {
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      version: '1.0.0'
    },
  });
});

// API routes placeholder
const API_PREFIX = `/api/${process.env.API_VERSION || 'v1'}`;

app.get(`${API_PREFIX}/test`, (req, res) => {
  res.json({
    success: true,
    message: 'API is working!',
    data: {
      routes: ['auth', 'users', 'products', 'categories', 'quotations', 'admin', 'notifications'],
      status: 'Development mode - Routes coming soon'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
    data: null
  });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API test: http://localhost:${PORT}${API_PREFIX}/test`);
});

export default app;
