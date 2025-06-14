# Online Learning Platform - MasterLearn

## Overview

MasterLearn is a full-stack online learning platform inspired by MasterClass, featuring course browsing, instructor profiles, and a modern dark-themed UI. The application uses a React frontend with a Node.js/Express backend, PostgreSQL database with Drizzle ORM, and shadcn/ui components for a polished user experience.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom MasterClass-inspired theme
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with organized route handlers
- **Error Handling**: Centralized error handling middleware
- **Logging**: Custom request/response logging with performance metrics

### Database Architecture
- **Database**: PostgreSQL (configured for Neon Database)
- **ORM**: Drizzle ORM with schema-first approach
- **Migrations**: Drizzle Kit for database migrations
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`

## Key Components

### Data Models
- **Courses**: Core learning content with metadata (title, description, duration, difficulty, pricing)
- **Instructors**: Expert profiles with bio, specialty, and course associations
- **Categories**: Course categorization system with icons and course counts
- **Testimonials**: User feedback and ratings system

### Frontend Components
- **Navigation**: Fixed header with mobile-responsive design
- **Course Cards**: Rich course previews with thumbnails, ratings, and instructor info
- **Video Player**: Custom video player component with preview functionality
- **Category Grid**: Visual category browsing with icons
- **Hero Section**: Landing page with call-to-action elements

### API Endpoints
- `GET /api/courses` - Retrieve all courses with instructor data
- `GET /api/courses/featured` - Get featured/promoted courses
- `GET /api/courses/category/:category` - Filter courses by category
- `GET /api/courses/search?q=query` - Search courses by title/instructor/description
- `GET /api/courses/:id` - Get detailed course information
- `GET /api/instructors/:id` - Get instructor profile with courses
- `GET /api/categories` - List all course categories
- `GET /api/testimonials` - Retrieve user testimonials

## Data Flow

### Course Discovery Flow
1. User visits homepage → Hero section displays featured courses
2. User browses categories → Category grid filters courses by type
3. User searches → Search API returns matching courses
4. Course cards display → Rich previews with instructor and pricing info

### Course Detail Flow
1. User clicks course card → Navigate to course detail page
2. Fetch course data with instructor info → Display comprehensive course information
3. Video player loads → Show course preview/trailer
4. Related courses displayed → Show similar courses in same category

### Instructor Profile Flow
1. User clicks instructor name → Navigate to instructor profile
2. Fetch instructor data with courses → Display bio, expertise, and course portfolio
3. Course grid renders → Show all courses by this instructor

## External Dependencies

### UI Framework Dependencies
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Utility for creating consistent component variants

### Data & State Management
- **TanStack Query**: Server state management, caching, and synchronization
- **Drizzle ORM**: Type-safe database operations and schema management
- **Neon Database**: Serverless PostgreSQL database provider

### Development Tools
- **TypeScript**: Type safety across frontend and backend
- **Vite**: Fast development server and build tool
- **ESBuild**: Fast JavaScript bundler for production builds

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with Replit environment
- **Database**: PostgreSQL 16 module in Replit
- **Port Configuration**: Backend on port 5000, frontend served via Vite dev server
- **Hot Reload**: Vite HMR for frontend, tsx watch mode for backend

### Production Build Process
1. **Frontend Build**: `vite build` - Creates optimized static assets in `dist/public`
2. **Backend Build**: `esbuild` bundles server code into `dist/index.js`
3. **Database Migration**: `drizzle-kit push` applies schema changes
4. **Asset Serving**: Express serves built frontend assets in production

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment mode (development/production)
- **Replit Integration**: Configured for seamless Replit deployment with autoscale

## Recent Changes

- June 14, 2025: Successfully created complete MasterLearn platform
  - Built homepage with hero section, featured courses, and category grid
  - Implemented course catalog with advanced filtering and search
  - Created detailed course pages with video previews and instructor profiles
  - Added instructor profile pages with achievements and course listings
  - Applied premium dark theme with MasterClass-inspired design
  - Fixed all console warnings and TypeScript errors
  - Platform now fully functional with responsive design
  - Upgraded to PostgreSQL database with Drizzle ORM
  - Migrated all data from memory storage to persistent database
  - Added advanced search with case-insensitive SQL queries
  - Database seeded with sample instructors, courses, and testimonials

## User Preferences

Preferred communication style: Simple, everyday language.