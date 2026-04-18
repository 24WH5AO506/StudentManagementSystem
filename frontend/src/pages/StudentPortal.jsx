import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function StudentPortal() {
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data } = await API.get("/students/me");
        setStudent(data);
      } catch (error) {
        alert(error.response?.data?.message || "Unable to load profile");
      }
    };

    loadProfile();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/student/login");
  };

  const profileScore = [
    student?.name,
    student?.email,
    student?.phone,
    student?.course?.name,
  ].filter(Boolean).length * 25;

  return (
    <div className="app-shell">
      <div className="page-shell">
        <div className="student-hero">
          <div className="page-header" style={{ marginBottom: 0 }}>
            <div>
              <span
                className="badge"
                style={{ background: "rgba(16, 185, 129, 0.16)", color: "#a7f3d0" }}
              >
                Student Space
              </span>
              <h1>Welcome{student ? `, ${student.name}` : ""}</h1>
              <p style={{ color: "#c7d8eb", marginTop: "10px" }}>
                Your personal details and assigned course are shown below in a
                separate student-only layout.
              </p>
            </div>
            <button onClick={logout} className="app-logout">
              Logout
            </button>
          </div>
        </div>

        <div className="student-summary-grid">
          <div className="mini-card">
            <h3>Account Status</h3>
            <span className={`status-pill ${student?.course ? "active" : "pending"}`}>
              {student?.course ? "Course Assigned" : "Waiting for Course"}
            </span>
          </div>

          <div className="mini-card">
            <h3>Profile Completion</h3>
            <p>{profileScore}% completed</p>
            <div className="progress-track">
              <div className="progress-bar" style={{ width: `${profileScore}%` }} />
            </div>
          </div>

          <div className="mini-card">
            <h3>What could be improved here</h3>
            <p>
              A stronger student page could also show attendance, grades,
              announcements, timetable, and fee status.
            </p>
          </div>
        </div>

        <div className="student-grid">
          <div className="student-card-light">
            <h2>Profile</h2>
            <div className="student-meta">
              <div>
                <strong>Name</strong>
                <span>{student?.name || "-"}</span>
              </div>
              <div>
                <strong>Email</strong>
                <span>{student?.email || "-"}</span>
              </div>
              <div>
                <strong>Phone</strong>
                <span>{student?.phone || "-"}</span>
              </div>
            </div>
          </div>

          <div className="student-card-green">
            <h2>Assigned Course</h2>
            <div className="student-meta">
              <div>
                <strong>Course</strong>
                <span>{student?.course?.name || "Not assigned"}</span>
              </div>
              <div>
                <strong>Description</strong>
                <span>
                  {student?.course?.description || "No course description available"}
                </span>
              </div>
              <div>
                <strong>Recommendation</strong>
                <span>
                  Course and description are a good start. The next useful fields
                  would be course code, duration, department, instructor, and schedule.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
