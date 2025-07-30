# Textile Trade Portal

A comprehensive B2B textile marketplace platform that connects textile manufacturers with buyers, enabling seamless product discovery, quotation management, and verified business transactions.

## 🌟 Features

### For Manufacturers
- **Company Registration & Verification**: Complete profile setup with GST and business document verification
- **Product Management**: Comprehensive product listings with specifications, pricing, and inventory
- **Quotation Management**: Receive and respond to buyer inquiries with detailed quotes
- **Dashboard Analytics**: Track product performance and business metrics

### For Buyers
- **Advanced Search & Filtering**: Find products by material, color, price, manufacturer, and more
- **Product Discovery**: Browse verified products with detailed specifications
- **Quotation Requests**: Request custom quotes with specific requirements
- **Supplier Verification**: Access to verified manufacturer information

### For Administrators
- **Verification Management**: Review and approve manufacturer applications
- **Content Moderation**: Oversee product listings and platform content
- **Analytics Dashboard**: Monitor platform performance and user activity
- **User Management**: Manage user accounts and platform access

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **React Hook Form** - Form management and validation
- **React Query** - Server state management
- **NextAuth.js** - Authentication solution

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type safety for backend development
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - Secure authentication tokens
- **Multer & Sharp** - File upload and image processing

### Infrastructure
- **AWS S3** - File storage and CDN
- **Redis** - Caching and session management
- **SendGrid** - Email service
- **Vercel** - Frontend deployment
- **Railway/DigitalOcean** - Backend deployment

## 📁 Project Structure

```
textile-trade-portal/
├── frontend/                 # Next.js React application
│   ├── src/
│   │   ├── app/             # App Router pages
│   │   ├── components/      # Reusable UI components
│   │   ├── lib/            # Utilities and API clients
│   │   ├── types/          # TypeScript definitions
│   │   └── styles/         # Global styles
│   └── public/             # Static assets
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── middleware/     # Custom middleware
│   │   ├── services/       # Business logic
│   │   └── utils/          # Helper functions
│   └── uploads/            # Temporary file storage
├── shared/                  # Shared types and utilities
├── docs/                   # Project documentation
└── scripts/                # Build and deployment scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm 9+
- MongoDB 6.0+
- Redis 6+ (optional, for caching)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/textile-trade-portal.git
cd textile-trade-portal
```

### 2. Install Dependencies
```bash
npm run install:all
```

### 3. Environment Setup
```bash
# Copy environment template
cp .env.example .env

# Update .env with your configuration
```

### 4. Start Development Servers
```bash
# Start both frontend and backend
npm run dev

# Or start individually
npm run dev:frontend  # http://localhost:3000
npm run dev:backend   # http://localhost:3001
```

### 5. Database Setup
```bash
# Seed the database with initial data
cd backend
npm run db:seed
```

## 📊 Database Schema

### Core Collections
- **Users** - Base user authentication and profile
- **Manufacturers** - Company details and verification status
- **Buyers** - Buyer profiles and preferences
- **Products** - Product listings with specifications
- **Categories** - Product categorization
- **Quotations** - Quote requests and responses
- **Notifications** - System and user notifications

For detailed schema documentation, see [Database Schema](./docs/database/schema.md).

## 🔗 API Documentation

The platform provides a comprehensive REST API with the following endpoints:

- **Authentication**: `/api/v1/auth/*`
- **Users**: `/api/v1/users/*`
- **Products**: `/api/v1/products/*`
- **Categories**: `/api/v1/categories/*`
- **Quotations**: `/api/v1/quotations/*`
- **Admin**: `/api/v1/admin/*`

For complete API documentation, see [API Specification](./docs/api/api-spec.md).

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start both frontend and backend
npm run dev:frontend     # Start frontend only
npm run dev:backend      # Start backend only

# Building
npm run build           # Build both applications
npm run build:frontend  # Build frontend
npm run build:backend   # Build backend

# Testing
npm run test           # Run all tests
npm run test:frontend  # Frontend tests
npm run test:backend   # Backend tests

# Linting
npm run lint           # Lint all code
npm run lint:frontend  # Lint frontend
npm run lint:backend   # Lint backend
```

### Code Quality
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Husky** - Git hooks for code quality
- **TypeScript** - Type checking

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
cd frontend
vercel --prod
```

### Backend (Railway/DigitalOcean)
```bash
# Build production version
npm run build:backend

# Start production server
npm run start:backend
```

## 📈 Features Roadmap

### Phase 1 (MVP) - Current
- [x] User authentication and registration
- [x] Manufacturer verification workflow
- [x] Product management system
- [x] Advanced search and filtering
- [x] Quotation system
- [x] Admin panel for moderation

### Phase 2 (Q2 2025)
- [ ] Mobile applications (React Native)
- [ ] Advanced analytics dashboard
- [ ] Review and rating system
- [ ] Bulk quotation management
- [ ] Integration with payment gateways

### Phase 3 (Q3 2025)
- [ ] AI-powered product recommendations
- [ ] Automated pricing suggestions
- [ ] Supply chain integration
- [ ] Multi-language support
- [ ] Advanced reporting tools

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](./CONTRIBUTING.md) for details on:
- Code of conduct
- Development process
- Pull request guidelines
- Testing requirements

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🆘 Support

For support and questions:
- 📧 Email: support@textiletradeportal.com
- 📖 Documentation: [Project Wiki](./docs/)
- 🐛 Bug Reports: [GitHub Issues](https://github.com/your-username/textile-trade-portal/issues)

## 👥 Team

- **Development Team** - Full-stack development
- **UI/UX Team** - Design and user experience
- **DevOps Team** - Infrastructure and deployment
- **QA Team** - Testing and quality assurance

---

**Built with ❤️ for the textile industry**