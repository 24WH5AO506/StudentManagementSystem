# Student Management System

A full-stack student management system with separate admin and student portals. Admins can manage student accounts, assign courses, and view dashboard stats, while students can log in to see their profile and assigned course details.

## Features

- Admin authentication with JWT-based protected routes
- Student registration and login
- Admin dashboard with total student and course counts
- Student management with create, edit, delete, and search
- Course management with create, edit, and delete
- Course assignment to student accounts
- Student portal to view profile and assigned course
- Role-based access control for admin and student routes

## Tech Stack

- Frontend: React, Vite, React Router, Axios
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- Authentication: JWT, bcryptjs

## Project Structure

```text
StudentManagementSystem/
|-- backend/
|   |-- config/
|   |-- controllers/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   `-- server.js
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |-- features/
|   |   |-- pages/
|   |   `-- services/
|   `-- package.json
`-- README.md
```

## Main Pages

- `/` - portal landing page
- `/admin/register` - admin signup
- `/admin/login` - admin login
- `/admin/dashboard` - admin dashboard
- `/admin/students` - student account management
- `/admin/courses` - course management
- `/student/register` - student signup
- `/student/login` - student login
- `/student/portal` - student profile portal

## API Overview

### Auth

- `POST /api/auth/register` - register admin
- `POST /api/auth/admin/login` - login admin
- `POST /api/auth/student/register` - register student
- `POST /api/auth/student/login` - login student

### Students

- `GET /api/students/me` - get logged-in student profile
- `POST /api/students` - create student (admin only)
- `GET /api/students` - list students (admin only)
- `GET /api/students/:id` - get single student (admin only)
- `PUT /api/students/:id` - update student (admin only)
- `DELETE /api/students/:id` - delete student (admin only)

### Courses

- `POST /api/courses` - create course (admin only)
- `GET /api/courses` - list courses (admin only)
- `PUT /api/courses/:id` - update course (admin only)
- `PUT /api/courses/:id/assign-student` - assign student to course (admin only)
- `DELETE /api/courses/:id` - delete course (admin only)

### Dashboard

- `GET /api/dashboard` - fetch admin dashboard stats

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/student-management-system.git
cd student-management-system
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../frontend
npm install
```

### 4. Start MongoDB

Make sure MongoDB is running locally on:

```text
mongodb://127.0.0.1:27017/studentdb
```

### 5. Run the backend

```bash
cd backend
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### 6. Run the frontend

```bash
cd frontend
npm run dev
```

Frontend runs on the Vite local development URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Authentication Notes

- Tokens are stored in `localStorage`
- Protected frontend routes check both token and role
- Backend middleware validates JWTs before allowing access to protected endpoints

## Current Configuration Notes

- The backend currently uses a hardcoded MongoDB connection string in `backend/server.js`
- The backend listens on port `5000`
- The frontend API base URL is hardcoded to `http://localhost:5000/api`
- JWT secret falls back to `"secretkey"` if no environment variable is provided

For production, these values should be moved to environment variables.

## Future Improvements

- Add attendance, grades, announcements, and fee tracking
- Move configuration to `.env` files
- Add form validation and better error handling
- Add tests for frontend and backend
- Deploy the frontend and backend

## Author

Built by DIVYA NEERUDI
