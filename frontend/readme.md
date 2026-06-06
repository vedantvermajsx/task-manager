# Task Manager - Frontend

This is the frontend application for Task Manager, a robust task management application built by vedantvermajsx in collaboration with yashyadav. It provides a modern, animated user interface for managing tasks. 

## Tech Stack

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
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

## Features

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

## Project Structure

- **public/**: Static assets
  - `logo.svg`
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

## Setup and Installation

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

5. Build for production:
   ```bash
   npm run build
   ```

6. Preview production build:
   ```bash
   npm run preview
   ```

## Authors

- vedantvermajsx
- yashyadav (Collaboration)

