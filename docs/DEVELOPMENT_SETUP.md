# Development Setup Guide - Textile Trade Portal

This guide will help you set up the development environment for the Textile Trade Portal.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** and **npm 9+**
- **MongoDB 6.0+** (Community Edition)
- **Redis 6+** (optional, for caching)
- **Git** for version control

### Installing Prerequisites

#### 1. Node.js and npm
```powershell
# Download and install from https://nodejs.org/
# Verify installation
node --version  # Should be 18.0.0 or higher
npm --version   # Should be 9.0.0 or higher
```

#### 2. MongoDB
```powershell
# Option 1: MongoDB Atlas (Cloud) - Recommended for development
# Sign up at https://www.mongodb.com/atlas
# Get connection string: mongodb+srv://<username>:<password>@cluster.mongodb.net/textile_trade_portal

# Option 2: Local MongoDB Installation
# Download from https://www.mongodb.com/try/download/community
# Install and start the service
# Default connection: mongodb://localhost:27017/textile_trade_portal
```

#### 3. Redis (Optional)
```powershell
# Option 1: Redis Cloud (Recommended for development)
# Sign up at https://redis.com/redis-enterprise-cloud/

# Option 2: Local Redis using Docker
docker run -d -p 6379:6379 redis:7-alpine

# Option 3: Windows Redis installation
# Download from https://github.com/microsoftarchive/redis/releases
```

## Project Setup

### 1. Clone and Install Dependencies

```powershell
# Clone the repository
git clone https://github.com/your-username/textile-trade-portal.git
cd textile-trade-portal

# Install all dependencies
npm run install:all
```

### 2. Environment Configuration

```powershell
# Copy environment template
cp .env.example .env

# Edit .env file with your configuration
notepad .env
```

#### Minimum Required Environment Variables

```env
# Database
MONGODB_URI=mongodb://localhost:27017/textile_trade_portal

# JWT
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters
JWT_EXPIRES_IN=24h

# Server
PORT=3001
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

# Email (for development, you can use console logging)
EMAIL_SERVICE=console
FROM_EMAIL=noreply@textiletradeportal.com
```

### 3. Database Setup

```powershell
# Navigate to backend
cd backend

# Install dependencies if not done already
npm install

# Run database migrations/seeds (when available)
npm run db:seed
```

### 4. Start Development Servers

```powershell
# From project root - Start both frontend and backend
npm run dev

# OR start individually
npm run dev:frontend  # Starts Next.js on http://localhost:3000
npm run dev:backend   # Starts Express.js on http://localhost:3001
```

### 5. Verify Setup

Open your browser and navigate to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/health

You should see:
- Frontend: Next.js welcome page or the textile portal homepage
- Backend: Health check response with server status

## Development Workflow

### 1. Code Structure

```
textile-trade-portal/
├── frontend/               # Next.js React application
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   │   ├── globals.css
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── components/    # Reusable components
│   │   ├── lib/          # Utilities and API clients
│   │   └── types/        # TypeScript type definitions
│   └── public/           # Static assets
├── backend/               # Express.js API server
│   ├── src/
│   │   ├── controllers/  # Route handlers
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Custom middleware
│   │   ├── services/     # Business logic
│   │   └── utils/        # Helper functions
│   └── logs/            # Application logs
└── docs/                # Documentation
```

### 2. Available Commands

```powershell
# Development
npm run dev              # Start both servers
npm run dev:frontend     # Start frontend only
npm run dev:backend      # Start backend only

# Building
npm run build           # Build both applications
npm run type-check      # Check TypeScript types

# Testing
npm run test           # Run all tests
npm run test:watch     # Run tests in watch mode

# Code Quality
npm run lint           # Lint all code
npm run lint:fix       # Fix linting issues
```

### 3. Git Workflow

```powershell
# Create feature branch
git checkout -b feature/user-authentication

# Make changes and commit
git add .
git commit -m "feat: implement user registration"

# Push and create pull request
git push origin feature/user-authentication
```

## API Development

### 1. API Testing

```powershell
# Test API endpoints using curl or Postman
curl http://localhost:3001/health

# Expected response:
{
  "success": true,
  "message": "Server is healthy",
  "data": {
    "timestamp": "2025-07-30T...",
    "uptime": 123.456,
    "environment": "development"
  }
}
```

### 2. Database Operations

```powershell
# Connect to MongoDB
mongo mongodb://localhost:27017/textile_trade_portal

# Or using MongoDB Compass (GUI)
# Download from https://www.mongodb.com/products/compass
```

### 3. Adding New Features

1. **API Endpoint**:
   ```typescript
   // backend/src/routes/exampleRoutes.ts
   import { Router } from 'express';
   const router = Router();
   
   router.get('/example', (req, res) => {
     res.json({ success: true, data: 'Hello World' });
   });
   
   export default router;
   ```

2. **Frontend Component**:
   ```typescript
   // frontend/src/components/ExampleComponent.tsx
   'use client';
   
   export default function ExampleComponent() {
     return <div>Hello from React!</div>;
   }
   ```

## Troubleshooting

### Common Issues

#### 1. Port Already in Use
```powershell
# Kill process using port 3000 or 3001
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

#### 2. MongoDB Connection Error
```powershell
# Check if MongoDB is running
# For Windows service:
net start MongoDB

# For Docker:
docker ps | grep mongo
```

#### 3. Node Modules Issues
```powershell
# Clear node_modules and reinstall
npm run clean
npm run install:all
```

#### 4. TypeScript Errors
```powershell
# Check TypeScript configuration
npm run type-check

# Restart TypeScript server in VS Code
# Ctrl+Shift+P -> "TypeScript: Restart TS Server"
```

### Environment Issues

#### 1. Missing Environment Variables
- Ensure all required variables are set in `.env`
- Check `.env.example` for reference
- Restart servers after changing environment variables

#### 2. CORS Issues
- Verify `ALLOWED_ORIGINS` includes your frontend URL
- Check browser network tab for CORS errors

### Performance Issues

#### 1. Slow Development Server
```powershell
# Clear Next.js cache
cd frontend
rm -rf .next

# Clear npm cache
npm cache clean --force
```

## IDE Setup (VS Code Recommended)

### Required Extensions
- TypeScript and JavaScript Language Features
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- MongoDB for VS Code
- GitLens
- Prettier - Code formatter
- ESLint

### VS Code Settings
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## Next Steps

1. **Review Documentation**:
   - [User Stories](../user-stories.md)
   - [API Specification](../api/api-spec.md)
   - [Database Schema](../database/schema.md)

2. **Start Development**:
   - Pick a user story from Sprint 1
   - Create feature branch
   - Implement backend API
   - Create frontend components
   - Test and create pull request

3. **Join Development**:
   - Set up project tracking (Jira/GitHub Projects)
   - Review coding standards
   - Join development discussions

## Getting Help

- **Documentation**: Check the `docs/` folder
- **Issues**: Create GitHub issues for bugs or questions
- **Code Review**: Use pull requests for all changes
- **Team Communication**: Set up Slack/Discord for team coordination

Happy coding! 🚀
