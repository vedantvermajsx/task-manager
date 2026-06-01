# Task Manager - Backend API

This is the backend API for Task Manager, a robust task management application built by **vedantvermajsx**  in collaboration with **yash yadav**. The API provides secure user authentication and comprehensive CRUD operations for tasks.

## Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JSON%20Web%20Tokens-000000?style=flat&logo=jsonwebtokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-47A248?style=flat&logo=lock&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=flat&logo=cloudinary&logoColor=white)

- Server: Node.js with Express framework
- Database: MongoDB using Mongoose ORM
- Authentication: JSON Web Token (JWT) and Bcrypt for password hashing
- File Upload: Multer (memory storage) + Cloudinary (cloud storage)
- Email Service: EmailJS (@emailjs/nodejs)
- Other Dependencies: dotenv, cookie-parser, cors, nodemon (development)

## API Endpoints

### Authentication
- POST `/auth/register`: Register a new user. Requires username, email, and password.
- POST `/auth/login`: Authenticate a user and receive a JWT cookie. Requires email and password.
- POST `/auth/logout`: Logout user and clear JWT cookie.

### Password Reset
- POST `/reset/sendOtp`: Send OTP to email for password reset.
- POST `/reset/verifyOtp`: Verify OTP and get reset token.
- POST `/reset/updatePassword`: Update password using reset token.

### User (Protected Routes)
- GET `/user/authenticate`: Get authenticated user's details.
- PUT `/user/updateUser`: Update user's username and description.
- PUT `/user/updateProfilePic`: Upload and update user's profile picture (uses Multer + Cloudinary).

### Tasks (Protected Routes)
- GET `/task/getTasks`: Fetch all tasks created by the authenticated user.
- POST `/task/addTask`: Create a new task. Requires title and description.
- PUT `/task/updateTask/:id`: Update an existing task's title, description, or completed status.
- DELETE `/task/deleteTask/:id`: Permanently remove a task by its ID.

### Health Check
- GET `/health`: Health check endpoint (returns 200 OK).

## Setup and Installation

1. Clone the repository and navigate to the backend directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Environment Configuration:
   Create a .env file in the backend directory with the following variables:
   - PORT (default: 8080)
   - JWT_SECRET (optional, default provided)
   - Note: The database connection string is currently managed in db.js.

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

## Developer

This project is developed and maintained by **vedantvermajsx**.
