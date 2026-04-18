import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
  requiredRole,
  redirectTo,
}) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to={redirectTo || "/"} replace />;
  }

  if (requiredRole && role !== requiredRole) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    return <Navigate to={redirectTo || "/"} replace />;
  }

  return children;
}
