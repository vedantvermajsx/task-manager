

# TaskManager - Backend API

This is the backend API for TaskManager, a robust task management application. The API provides secure user authentication and comprehensive CRUD operations for tasks.

## Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JSON%20Web%20Tokens-000000?style=flat&logo=jsonwebtokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-47A248?style=flat&logo=lock&logoColor=white)

- Server: Node.js with Express framework
- Database: MongoDB using Mongoose ORM
- Authentication: JSON Web Token (JWT) and Bcrypt for password hashing
- Dependencies: dotenv, cookie-parser, nodemon (development)


## API Endpoints

### Authentication

- POST /register: Register a new user. Requires name, email, and password.
- POST /login: Authenticate a user and receive a JWT cookie. Requires email and password.

### Tasks (Protected Routes)

- GET /getTasks: Fetch all tasks created by the authenticated user.
- POST /addTask: Create a new task. Requires title and description.
- PUT /updateTask/:id: Update an existing task's title, description, or status.
- DELETE /deleteTask/:id: Permanently remove a task by its ID.

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

- controller/: Contains business logic for handling requests.
- models/: Defines MongoDB schemas for User and Task.
- routes/: API route definitions.
- middleware/: Custom middleware for authentication.
- utils/: Helper functions including token generation.
- db.js: Database connection logic.
- index.js: Entry point of the application.
