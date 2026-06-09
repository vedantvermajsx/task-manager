# Task Manager

Task Manager is a robust, full-stack task management application built by vedantvermajsx in collaboration with yashyadav. It provides a modern, high-tech user interface for users to manage their daily tasks along with a secure, reliable backend API.

## Project Structure

The project is structured as a monorepo containing both the frontend and backend applications:

- `frontend/`: Contains the React application built with Vite.
- `backend/`: Contains the Node.js/Express API server.

### Backend Structure

- **controller/**: Business logic for handling requests
  - `registerUser.controller.js`
  - `loginUser.controller.js`
  - `authenticateUser.controller.js`
  - `logoutUser.controller.js`
  - `addTasks.controller.js`
  - `deleteTask.controller.js`
  - `getTask.controller.js`
  - `updateTask.controller.js`
  - `updateUser.controller.js`
  - `updateProfilePic.controller.js`
  - `sendOtp.controller.js`
  - `verifyOtp.controller.js`
  - `updatePassword.controller.js`
- **middleware/**: Custom middleware (auth, logging, file upload)
  - `auth.middleware.js`: JWT authentication
  - `interceptor.middleware.js`: Request logging
  - `upload.middleware.js`: Multer file upload handling
- **models/**: MongoDB schema definitions (User, Task, OTP, response formatters)
  - `User.model.js`
  - `Task.model.js`
  - `Otp.model.js`
  - `UserResponse.model.js`
  - `TaskResponse.model.js`
- **routes/**: API endpoint definitions
  - `auth.routes.js`: Authentication routes
  - `reset.routes.js`: Password reset routes
  - `task.routes.js`: Task management routes
  - `user.routes.js`: User profile routes
- **utils/**: Helper utilities (database, JWT, bcrypt, Cloudinary, EmailJS, OTP)
  - `db.js`: MongoDB connection
  - `token.js`: JWT generation and verification
  - `passwordHash.js`: Bcrypt password hashing
  - `cloudinary.js`: Cloudinary integration
  - `emailJs.js`: EmailJS integration
  - `otpGenerator.js`: OTP generation
  - `MaskEmail.js`: Email masking for privacy
- `index.js`: Application entry point

### Frontend Structure

- **public/**: Static assets
  - `favicon.svg`
  - `icons.svg`
  - `logo.ico`
- **src/api/**: API integration and request handling
  - `Api.js`: Base API configuration with health check interceptor
  - `AuthApi.js`: Authentication API calls
  - `TaskApi.js`: Task management API calls
- **src/components/**: Reusable React UI components and pages
  - `Home.jsx`: Main dashboard (task management, calendar, stats)
  - `Login.jsx`: Login page
  - `Register.jsx`: Register page
  - `ForgotPassword.jsx`: Password reset page (3-step OTP flow)
  - `Profile.jsx`: User profile page
  - `Task.jsx`: Single task component
  - `TaskList.jsx`: Task list component
  - `MonthStatus.jsx`: Month-wise task statistics with charts
  - `StatCard.jsx`: Statistics card component
  - `GradientBackground.jsx`: Animated gradient background
  - `MyToaster.jsx`: Toast notification utility using Sonner
  - `NotFound.jsx`: 404 page
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
- Configuration files: `.env`, `.gitignore`, `eslint.config.js`, `postcss.config.js`, `tailwind.config.js`, `vite.config.js`

## Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=for-the-badge&logo=chakraui&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Sonner](https://img.shields.io/badge/Sonner-000000?style=for-the-badge)
![Recharts](https://img.shields.io/badge/Recharts-000000?style=for-the-badge)
![Lucide](https://img.shields.io/badge/Lucide-F7C40E?style=for-the-badge&logo=lucide&logoColor=000000)

- React 19 - UI library
- Vite - Build tool & dev server
- Tailwind CSS & PostCSS - Styling
- Framer Motion - Animations
- React Three Fiber / Drei - 3D graphics and shaders
- Chakra UI - Component library
- Axios - HTTP client
- React Router DOM - Routing
- Sonner - Notifications
- React Calendar - Date picker
- React Icons - Icons
- Recharts - Charts
- Three.js - 3D graphics
- Lucide React - Icon library
- React Device Detect - Responsive device detection

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JSON%20Web%20Tokens-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-339933?style=for-the-badge)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

- Node.js - Runtime
- Express - Web framework
- MongoDB (via Mongoose) - Database & ORM
- JSON Web Token (JWT) - Authentication
- Bcrypt - Password hashing
- CORS - Cross-origin resource sharing
- Cookie Parser - Cookie handling
- Dotenv - Environment variables
- Multer - File upload handling
- Cloudinary - Cloud storage for files/avatars
- EmailJS (@emailjs/nodejs) - Email sending (OTP, password reset)
- Express Rate Limit - Rate limiting (30 requests per minute per IP)
- Nodemon - Dev server reload

## Features

### Backend Features
- User authentication (register/login/logout)
- Password reset with OTP verification (via EmailJS)
- Profile picture upload (Cloudinary)
- Task CRUD operations (create, read, update, delete)
- Secure API endpoints with JWT middleware (HTTP-only cookies)
- Request interceptor logging
- CORS configuration for frontend communication
- Rate limiting (30 requests per minute per IP using express-rate-limit)
- Health check endpoint (`/health`)

### Frontend Features
- Modern animated UI with gradients & 3D elements
- Responsive design
- User profile page with avatar upload
- Calendar for date selection
- Task management dashboard
- Month-wise task statistics with charts (Recharts)
- Toast notifications (Sonner)
- Protected routes (authentication required)
- Health check before API requests
- 404 error page
- Password reset with 3-step OTP verification

## Setup and Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB instance (local or Atlas)
- Cloudinary account (for file uploads)
- EmailJS account (for sending OTP emails)

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
   ```
   PORT=4040
   MONGO_URI=mongodb://localhost:27017/task-manager
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRE=7d
   NODE_ENV=development
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   EMAILJS_SERVICE_ID=your_emailjs_service_id
   EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   EMAILJS_PRIVATE_KEY=your_emailjs_private_key
   ```

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
3. Environment Configuration:
   Create a `.env` file in the `frontend` directory with the following configuration:
   ```
   VITE_SERVER_API=http://localhost:4040
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Authors

- vedantvermajsx
- yashyadav (Collaboration)

