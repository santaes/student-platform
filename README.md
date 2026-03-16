# Student Learning Platform

A full-stack production-ready learning platform built with Angular 21 and NestJS.

## Features

### Frontend (Angular 21)
- Modern Angular 21 with standalone components
- Angular Material UI components
- Reactive forms with validation
- JWT authentication with guards
- Lazy-loaded routes
- Responsive design
- Real-time progress tracking
- File upload/download capabilities

### Backend (NestJS)
- RESTful API with OpenAPI/Swagger documentation
- JWT authentication and authorization
- PostgreSQL database with TypeORM
- Role-based access control (Student/Teacher/Admin)
- File upload handling
- Password hashing with bcrypt
- Comprehensive validation with class-validator

### Database (PostgreSQL)
- User management with profiles
- Learning roadmaps and modules
- Lesson progress tracking
- Homework assignment and submission
- Resource management
- Comprehensive relationships

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Angular CLI (for local development)

## Quick Start

### Using Docker (Recommended)

1. Clone the repository:
```bash
git clone <repository-url>
cd student-learning-platform
```

2. Start all services:
```bash
docker-compose up -d
```

3. Access the applications:
- Frontend: http://localhost:4200
- Backend API: http://localhost:3000
- API Documentation: http://localhost:3000/api
- Database: localhost:5432 (postgres/password)

### Local Development

#### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the backend:
```bash
npm run start:dev
```

#### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start the frontend:
```bash
npm start
```

## API Documentation

### 🌐 **Interactive Swagger UI**

**Live Production API**: https://student-platform-jl4x.onrender.com/api

**Local Development**: http://localhost:3000/api

The Swagger UI provides interactive API documentation where you can:
- **Test all endpoints** directly in your browser
- **View request/response schemas**
- **Try authentication flows**
- **Explore API capabilities** without writing code

### 🚀 **Quick Start with Swagger UI**

#### **1. Access the Documentation**
Visit: https://student-platform-jl4x.onrender.com/api

#### **2. Test User Registration**
1. Expand `POST /auth/register`
2. Click "Try it out"
3. Fill in the request body:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com", 
  "password": "password123"
}
```
4. Click "Execute" → Should return `201 Created`

#### **3. Test User Login**
1. Expand `POST /auth/login`
2. Click "Try it out"
3. Fill in the request body:
```json
{
  "email": "maria.garcia@example.com",
  "password": "password123"
}
```
4. Click "Execute" → Returns JWT token

#### **4. Test Protected Endpoints**
1. Copy the JWT token from login response
2. Expand `GET /auth/profile`
3. Click "Try it out"
4. In the "Authorization" field, enter: `Bearer YOUR_JWT_TOKEN`
5. Click "Execute" → Returns user profile

### 📋 **Available Endpoints in Swagger**

#### **Authentication Endpoints**
- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration
- `GET /auth/profile` - Get current user profile (requires JWT)

#### **Learning Content Endpoints**
- `GET /roadmap` - Get student's learning roadmap
- `GET /homework` - Get homework assignments
- `GET /resources` - Get learning resources

#### **User Management Endpoints**
- `GET /users/dashboard` - Get dashboard statistics
- `GET /users/profile` - Get user profile details

### 🎯 **Swagger UI Features**

#### **Interactive Testing**
- **Try it out** buttons for each endpoint
- **Live parameter validation**
- **Real-time request/response**
- **Error message display**

#### **Documentation**
- **Endpoint descriptions** and purposes
- **Request body schemas** with examples
- **Response format documentation**
- **Authentication requirements**

#### **Development Tools**
- **CORS testing** from browser
- **Authentication flow testing**
- **Error scenario testing**
- **API exploration**

### 🔧 **Using Swagger for Development**

#### **For Frontend Developers**
- Test API integration before coding
- Understand exact request/response formats
- Debug authentication issues
- Validate API contracts

#### **For QA Testing**
- Manual API testing without tools
- Regression testing
- Error scenario validation
- Performance testing baseline

#### **For API Documentation**
- Always up-to-date API specs
- Interactive examples
- Clear authentication flows
- Complete endpoint coverage

### 🚨 **Authentication in Swagger**

#### **JWT Token Required**
Most endpoints require authentication. To test protected endpoints:

1. **First, login** to get a JWT token
2. **Copy the token** from the login response
3. **Add Authorization header**: `Bearer YOUR_JWT_TOKEN`
4. **Execute the request**

#### **Example Token Format**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0ZDAyMWI1Zi1iMDhhLTRkZTEtODZmYi0wMGI5Yzk1M2U1OWYiLCJlbWFpbCI6Im1hcmlhLmdhcmNpYUBleGFtcGxlLmNvbSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzczNjIwMDg4LCJleHAiOjE3NzM3MDY0ODh9.KShme7Q2fYzjV1hleYam-tEMuNPqT1ygTpF5dwuXzNI
```

### 📱 **Mobile App Integration**

Use Swagger UI to:
- **Test mobile API calls**
- **Validate request formats**
- **Debug authentication**
- **Understand response structures**

### 🎉 **Benefits of Swagger UI**

✅ **No coding required** for API testing
✅ **Interactive exploration** of all endpoints
✅ **Live documentation** always in sync
✅ **Authentication testing** made easy
✅ **Error handling** examples
✅ **Request/response validation**
✅ **Developer-friendly** interface

### 🔗 **Quick Links**

- **🌐 Live API**: https://student-platform-jl4x.onrender.com/api
- **📱 Frontend**: https://student-platform-frontend-71i9.onrender.com
- **🔧 Backend**: https://student-platform-jl4x.onrender.com

**Start exploring the API now at the Swagger UI!** 🚀

### Main Endpoints

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /auth/profile` - Get current user profile (protected)

#### Roadmap
- `GET /roadmap` - Get student roadmap
- `GET /roadmap/modules` - Get roadmap modules
- `GET /roadmap/lessons` - Get lessons

#### Homework
- `GET /homework` - Get homework list
- `GET /homework/:id` - Get homework details
- `POST /homework/:id/submit` - Submit homework

#### Resources
- `GET /resources` - Get learning resources

## Project Structure

```bash
student-learning-platform/
├── app/                      # Angular application
│   ├── src/
│   │   ├── app/              # App configuration
│   │   ├── core/             # Core services and guards
│   │   ├── shared/           # Shared components and models
│   │   └── features/         # Feature modules
│   ├── package.json
│   └── Dockerfile
├── backend/                  # NestJS application
│   ├── src/
│   │   ├── auth/             # Authentication module
│   │   ├── users/            # User management
│   │   ├── roadmap/          # Roadmap management
│   │   ├── homework/          # Homework system
│   │   ├── resources/        # Resource management
│   │   ├── entities/         # Database entities
│   │   └── common/           # Common utilities
│   ├── package.json
│   └── Dockerfile
├── database/                 # Database scripts
│   ├── init.sql
│   └── seed.sql
├── docker-compose.yml        # Docker configuration
├── nginx.conf                # Nginx configuration
└── README.md
```

## Environment Variables

### Backend (.env)
```env
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_DATABASE=student_learning_platform
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
FRONTEND_URL=http://localhost:4200
```

## Demo Data

The platform comes with pre-configured demo data:

### Demo Users
- **Email**: maria.garcia@example.com
- **Password**: password123
- **Language**: Spanish

- **Email**: oleks.petrov@example.com  
- **Password**: password123
- **Language**: Ukrainian

### Sample Content
- Ukrainian and Spanish language learning roadmaps
- Multiple modules and lessons
- Homework assignments
- Learning resources
- Progress tracking data

## Database Setup

The database is automatically initialized when running with Docker Compose. The setup includes:

1. **Database Schema** (`database/init.sql`)
   - Creates all necessary tables
   - Sets up indexes and triggers
   - Configures relationships

2. **Seed Data** (`database/seed.sql`)
   - Demo users with hashed passwords
   - Sample roadmaps and modules
   - Lessons and homework assignments
   - Learning resources

### Manual Database Setup

If you need to set up the database manually:

1. Start PostgreSQL:
```bash
docker-compose up postgres -d
```

2. Run initialization scripts:
```bash
psql -h localhost -U postgres -d student_learning_platform -f database/init.sql
psql -h localhost -U postgres -d student_learning_platform -f database/seed.sql
```

## Deployment

### Production Deployment

1. Update environment variables for production
2. Build and deploy with Docker:
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Environment-Specific Configurations

- Development: Hot reload, verbose logging
- Production: Optimized builds, security hardening

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Ensure PostgreSQL is running
   - Check database credentials in .env
   - Verify database exists

2. **Frontend Build Errors**
   - Clear node_modules and reinstall
   - Check Angular CLI version compatibility

3. **Backend API Errors**
   - Verify all dependencies are installed
   - Check environment variables
   - Review logs for specific errors

### Getting Help

- Check the logs: `docker-compose logs [service-name]`
- Review API documentation at /api endpoint
- Ensure all services are running: `docker-compose ps`

## Tech Stack

- **Frontend**: Angular 21, Angular Material, TypeScript
- **Backend**: NestJS, TypeORM, PostgreSQL
- **Authentication**: JWT, Passport.js
- **Documentation**: Swagger/OpenAPI
- **Containerization**: Docker, Docker Compose
- **Web Server**: Nginx (production)
- **Database**: PostgreSQL 15

## Testing

### Unit Tests
```bash
# Backend tests
cd backend && npm test

# Frontend tests
ng test
```

### End-to-End Tests
```bash
ng e2e
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
