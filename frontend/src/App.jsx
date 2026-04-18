import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Register from "./pages/Register";
import PortalHome from "./pages/PortalHome";
import StudentLogin from "./pages/StudentLogin";
import StudentRegister from "./pages/StudentRegister";
import StudentPortal from "./pages/StudentPortal";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortalHome />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/register" element={<Register />} />
        <Route path="/student/login" element={<StudentLogin />} />
        <Route path="/student/register" element={<StudentRegister />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole="admin" redirectTo="/admin/login">
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/students"
          element={
            <ProtectedRoute requiredRole="admin" redirectTo="/admin/login">
              <Layout>
                <Students />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute requiredRole="admin" redirectTo="/admin/login">
              <Layout>
                <Courses />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/portal"
          element={
            <ProtectedRoute requiredRole="student" redirectTo="/student/login">
              <StudentPortal />
            </ProtectedRoute>
          }
        />

        <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/students" element={<Navigate to="/admin/students" replace />} />
        <Route path="/courses" element={<Navigate to="/admin/courses" replace />} />
        <Route path="/register" element={<Navigate to="/admin/register" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
