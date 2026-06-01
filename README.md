# Task Manager

Task Manager is a robust, full-stack task management application built by **vedantvermajsx**. It provides a modern, high-tech user interface for users to manage their daily tasks along with a secure, reliable backend API.

## Project Structure

The project is structured as a monorepo containing both the frontend and backend applications:

- `frontend/`: Contains the React application built with Vite.
- `backend/`: Contains the Node.js/Express API server.

### Backend Structure

- **controller/**: Business logic for handling requests
- **middleware/**: Custom middleware (auth, logging, file upload)
- **models/**: MongoDB schema definitions (User, Task, OTP, response formatters)
- **routes/**: API endpoint definitions
- **utils/**: Helper utilities (database, JWT, bcrypt, Cloudinary, EmailJS, OTP)
- `index.js`: Application entry point

### Frontend Structure

- **src/api/**: API integration and request handling
  - `Api.js`: Base API configuration
  - `AuthApi.js`: Authentication API calls
  - `TaskApi.js`: Task management API calls
- **src/components/**: Reusable React UI components and pages
  - `Home.jsx`: Main dashboard (task management, calendar, stats)
  - `Login.jsx`: Login page
  - `Register.jsx`: Register page
  - `ForgotPassword.jsx`: Password reset page
  - `Profile.jsx`: User profile page
  - `Task.jsx`: Single task component
  - `TaskList.jsx`: Task list component
  - `MonthStatus.jsx`: Month-wise task statistics with charts
  - `StatCard.jsx`: Statistics card component
  - `GradientBackground.jsx`: Animated gradient background
  - `MyToaster.jsx`: Toast notification utility
- **src/contexts/**: React Context providers for global state
  - `AuthContext.jsx`: Authentication state management
- **src/routes/**: Route protection and management
  - `ProtectedRoute.jsx`: Protected route wrapper (requires authentication)
- **src/models/**: Frontend data models or type definitions
  - `LoginRequest.js`: Login request model
  - `ResisterRequest.js`: Register request model
  - `TaskRequest.js`: Task creation request model
  - `PasswordRequest.js`: Password reset request model
  - `Task.js`: Task model
- `src/App.jsx` & `src/main.jsx`: React entry points and routing setup


## Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Build tool & dev server
- **Tailwind CSS & PostCSS** - Styling
- **Framer Motion** - Animations
- **React Three Fiber / Drei** - 3D graphics and shaders
- **Chakra UI** - Component library
- **Axios** - HTTP client
- **React Router DOM** - Routing
- **React Hot Toast** - Notifications
- **React Calendar** - Date picker
- **React Icons** - Icons
- **Recharts** - Charts
- **Three.js** - 3D graphics

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB (via Mongoose)** - Database & ORM
- **JSON Web Token (JWT)** - Authentication
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Cookie handling
- **Dotenv** - Environment variables
- **Multer** - File upload handling
- **Cloudinary** - Cloud storage for files/avatars
- **EmailJS (@emailjs/nodejs)** - Email sending (OTP, password reset)
- **Express Rate Limit** - Rate limiting (30 requests per minute per IP)
- **Nodemon** - Dev server reload

## Features

### Backend Features
- User authentication (register/login/logout)
- Password reset with OTP verification
- Profile picture upload (Cloudinary)
- Task CRUD operations (create, read, update, delete)
- Secure API endpoints with JWT middleware
- Request interceptor logging
- CORS configuration for frontend communication
- Rate limiting (30 requests per minute per IP using express-rate-limit)

### Frontend Features
- Modern animated UI with gradients & 3D elements
- Responsive design
- User profile page
- Calendar for date selection
- Task management dashboard
- Month-wise task statistics with charts
- Toast notifications
- Protected routes (authentication required)

## Setup and Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB instance (local or Atlas)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Environment Configuration:
   Create a `.env` file in the `backend` directory with the following configuration:
   - `PORT`: (Default: 8080)
   - `JWT_SECRET`: Your secret key for testing or production.

4. Run the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies (npm or pnpm):
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Features

- User Authentication (Registration and Login) utilizing JWT in HTTP-only cookies.
- Creating, reading, updating, and deleting tasks.
- Advanced animated UI and responsive layout using modern React libraries.
- Secure API endpoints wrapped with authentication middleware.

## Developer

This project is developed and maintained by **vedantvermajsx**.
