# TaskManager

TaskManager is a robust, full-stack task management application. It provides a modern, high-tech user interface for users to manage their daily tasks along with a secure, reliable backend API.

## Project Structure

The project is structured as a monorepo containing both the frontend and backend applications:

- `frontend/`: Contains the React application built with Vite.
- `backend/`: Contains the Node.js/Express API server.

### Backend Structure

- `controller/`: Business logic for request handling.
- `middleware/`: Custom middleware (e.g., authentication).
- `models/`: MongoDB schema definitions.
- `routes/`: API endpoint definitions.
- `utils/`: Helper utilities (e.g., JWT token generation).
- `index.js`: Application entry point.

### Frontend Structure

- `src/api/`: API integration and request handling.
- `src/components/`: Reusable React UI components.
- `src/contexts/`: React Context providers for global state.
- `src/routes/`: Application views/pages.
- `src/models/`: Frontend data models or type definitions.
- `src/App.jsx` & `src/main.jsx`: React entry points and routing setup.


## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS & PostCSS
- Framer Motion (Animations)
- React Three Fiber / Drei (3D graphics and shaders)
- Chakra UI
- Axios
- React Router DOM

### Backend
- Node.js
- Express
- MongoDB (via Mongoose)
- JSON Web Token (JWT) (Authentication)
- Bcrypt (Password Hashing)

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
