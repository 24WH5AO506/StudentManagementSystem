import { useNavigate } from "react-router-dom";

export default function PortalHome() {
  const navigate = useNavigate();

  return (
    <div className="portal-page">
      <div className="page-shell">
        <div className="page-header" style={{ marginBottom: "24px" }}>
          <div>
            <h1>Student Management System</h1>
            <p>
              Choose the correct page and keep each role separate. Admin pages
              manage records, while student pages stay focused on personal
              information.
            </p>
          </div>
        </div>

        <div className="portal-grid">
          <button
            className="portal-card light card"
            onClick={() => navigate("/admin/login")}
          >
            <span className="badge">Admin Access</span>
            <h2>Manage students and courses</h2>
            <p>
              Use the admin area for dashboard summaries, student account
              management, and course control.
            </p>
            <div className="portal-cta">
              <span className="button-primary">Open Admin Login</span>
            </div>
          </button>

          <button
            className="portal-card dark"
            onClick={() => navigate("/student/login")}
          >
            <span className="badge" style={{ background: "rgba(16, 185, 129, 0.16)", color: "#a7f3d0" }}>
              Student Access
            </span>
            <h2>Sign in to your profile</h2>
            <p>
              Students can register, log in, and view their own profile details
              without mixing into the admin workspace.
            </p>
            <div className="portal-cta">
              <span
                className="button-primary"
                style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
              >
                Open Student Access
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
