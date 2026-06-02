# Task Manager - Backend API

This is the backend API for Task Manager, a robust task management application built by vedantvermajsx in collaboration with yashyadav. The API provides secure user authentication and comprehensive CRUD operations for tasks.

## Tech Stack

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

## API Endpoints

### Authentication
- POST `/auth/register`: Register a new user. Requires username, email, and password.
- POST `/auth/login`: Authenticate a user and receive a JWT cookie. Requires email and password.
- GET `/auth/logout`: Logout user and clear JWT cookie.
- GET `/auth/me`: Get authenticated user's details.

### Password Reset
- POST `/reset/send-reset-email`: Send OTP to email for password reset.
- POST `/reset/reset-password/:token`: Verify OTP and update password using reset token.

### User (Protected Routes)
- GET `/user/authenticate`: Get authenticated user's details.
- PUT `/user/updateUser`: Update user's username and description.
- PUT `/user/updateProfilePic`: Upload and update user's profile picture (uses Multer + Cloudinary).

### Tasks (Protected Routes)
- GET `/task/getAll`: Fetch all tasks created by the authenticated user.
- GET `/task/get/:id`: Get a single task by ID.
- POST `/task/add`: Create a new task. Requires title and description.
- PUT `/task/update/:id`: Update an existing task's title, description, or completed status.
- PUT `/task/update-task/:id`: Update an existing task.
- DELETE `/task/delete/:id`: Permanently remove a task by its ID.

### Health Check
- GET `/health`: Health check endpoint (returns 200 OK).

## Setup and Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- MongoDB instance (local or Atlas)
- Cloudinary account (for file uploads)
- EmailJS account (for sending OTP emails)

1. Navigate to the backend directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Environment Configuration:
   Create a .env file in the backend directory with the following variables:
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

4. Run the application:
   - Development mode:
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm start
     ```

## Project Structure

- **controller/**: Business logic for handling requests (auth, tasks, user, password reset)
  - `addTasks.controller.js`: Add new task
  - `loginUser.controller.js`: Login user
  - `logoutUser.controller.js`: Logout user
  - `registerUser.controller.js`: Register new user
  - `getTask.controller.js`: Get user's tasks
  - `updateTask.controller.js`: Update existing task
  - `deleteTask.controller.js`: Delete task
  - `authenticateUser.controller.js`: Verify authenticated user
  - `updateUser.controller.js`: Update user profile details
  - `updatePassword.controller.js`: Update user password
  - `updateProfilePic.controller.js`: Update user's profile picture
  - `sendOtp.controller.js`: Send OTP for password reset
  - `verifyOtp.controller.js`: Verify OTP
- **models/**: MongoDB schema definitions
  - `User.model.js`: User schema
  - `Task.model.js`: Task schema
  - `Otp.model.js`: OTP schema (with TTL index)
  - `UserResponse.model.js`: User response formatter
  - `TaskResponse.model.js`: Task response formatter
- **routes/**: API endpoint route definitions
  - `auth.routes.js`: Authentication routes
  - `task.routes.js`: Task management routes
  - `user.routes.js`: User management routes
  - `reset.routes.js`: Password reset routes
- **middleware/**: Custom middleware
  - `auth.middleware.js`: JWT authentication middleware
  - `interceptor.middleware.js`: Request interceptor/logging
  - `upload.middleware.js`: Multer file upload middleware
- **utils/**: Helper utilities
  - `db.js`: MongoDB database connection
  - `token.js`: JWT token generation
  - `passwordHash.js`: Password hashing with bcrypt
  - `cloudinary.js`: Cloudinary integration for file storage
  - `emailJs.js`: EmailJS integration for sending emails
  - `otpGenerator.js`: OTP generation
  - `MaskEmail.js`: Email masking utility
- **index.js**: Application entry point

## Authors

- vedantvermajsx
- yashyadav (Collaboration)

