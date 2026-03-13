# Katyayani Task Manager

A full-stack modern task management application built with the MERN stack (MongoDB, Express, React, Node.js) for Katyayani Organics. This application allows users to securely register, login, and manage their daily tasks with an intuitive and animated user interface.

## 🌟 Features

- **User Authentication:** Secure registration and login using JWT (JSON Web Tokens) and bcrypt password hashing.
- **Full-Stack Task Management:** Create, read, update, and delete tasks with real-time syncing to a MongoDB database.
- **Task Tracking:** Track tasks with statuses (Pending, In Progress, Completed), and view auto-generated `createdAt` and `updatedAt` timestamps.
- **Modern UI/UX:** Built with React, Tailwind CSS, and Framer Motion for a beautiful, responsive, and animated user experience.
- **State Management:** Utilizes Redux Toolkit for efficient global state management.
- **API Integration:** Robust Axios setup with automatic JWT header injection and 401 unauthorized auto-logout handling.

## 🚀 Technology Stack

### Frontend
- **Framework:** React 18 with TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **Routing:** React Router DOM v6
- **Animations:** Framer Motion
- **Form Handling:** Formik & Yup
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Build Tool:** Vite

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (using Mongoose ODM)
- **Authentication:** JWT (jsonwebtoken) & bcryptjs
- **Other:** CORS, dotenv

## 📁 Project Structure

```
katyayani-task-manager/
├── src/                  # React Frontend
│   ├── api.ts            # Axios configuration & interceptors
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page components (Login, Register, Dashboard)
│   ├── store/            # Redux store & slices
│   └── types/            # TypeScript interface definitions
│
├── server/               # Express.js Backend
│   ├── index.js          # Server entry point & configuration
│   ├── models/           # Mongoose schemas (User, Task)
│   ├── routes/           # API route handlers (auth, tasks)
│   ├── middleware/       # Custom middleware (auth checking)
│   └── .env              # Backend environment variables
```

## ⚙️ Local Development Setup

### Prisma / Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Create a `.env` file in the `server` directory and add your MongoDB URI:
   ```env
   PORT=5001
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_random_string
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Open a new terminal and navigate to the project root:
   ```bash
   cd katyayani-task-manager
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   Ensure the frontend `.env` is configured to point to your local backend API:
   ```env
   VITE_API_URL=http://localhost:5001
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```

## 📡 API Documentation

### Auth Endpoints
- `POST /api/auth/register` - Register a new user (`username`, `password`)
- `POST /api/auth/login` - Authenticate a user and receive a JWT

### Task Endpoints (Requires Bearer Token)
- `GET /api/tasks` - Retrieve all tasks for the authenticated user
- `POST /api/tasks` - Create a new task (`title`, `description`, `status`)
- `PUT /api/tasks/:id` - Update an existing task
- `DELETE /api/tasks/:id` - Delete a task
- `GET /api/health` - Server health check (`status`, `message`)

## 📝 License

This project is created for Katyayani Organics.
