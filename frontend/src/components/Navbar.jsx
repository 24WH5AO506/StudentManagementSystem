import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <header className="app-topbar">
      <div className="app-brand">
        <p>Admin Workspace</p>
        <h1>Student Management System</h1>
      </div>

      <nav className="app-nav">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `app-nav-link${isActive ? " active" : ""}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/students"
          className={({ isActive }) =>
            `app-nav-link${isActive ? " active" : ""}`
          }
        >
          Students
        </NavLink>
        <NavLink
          to="/admin/courses"
          className={({ isActive }) =>
            `app-nav-link${isActive ? " active" : ""}`
          }
        >
          Courses
        </NavLink>
      </nav>

      <button onClick={logout} className="app-logout">
        Logout
      </button>
    </header>
  );
}
