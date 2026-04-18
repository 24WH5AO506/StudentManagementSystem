import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalCourses: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data } = await API.get("/dashboard");
        setStats(data);
      } catch {
        alert("Error fetching dashboard data");
      }
    };

    loadStats();
  }, []);

  return (
    <section>
      <div className="page-header">
        <div>
          <span className="badge">Overview</span>
          <h2>Dashboard</h2>
          <p>
            Keep the college records organized from one clean place. The cards
            below show the current system totals.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="surface-card stat-card accent-blue">
          <p>Total Students</p>
          <h3>{stats.totalStudents}</h3>
        </div>
        <div className="surface-card stat-card accent-green">
          <p>Total Courses</p>
          <h3>{stats.totalCourses}</h3>
        </div>
      </div>

      <div className="highlight-strip">
        <div className="highlight-card bg-blue-soft">
          <h3>Student Records</h3>
          <p>Use the Students page for accounts, passwords, and course assignments.</p>
        </div>
        <div className="highlight-card bg-green-soft">
          <h3>Course Catalog</h3>
          <p>Keep course titles and descriptions organized for clean student mapping.</p>
        </div>
        <div className="highlight-card bg-purple-soft">
          <h3>Admin Control</h3>
          <p>This dashboard is now only for summary and quick actions, not mixed content.</p>
        </div>
      </div>

      <div className="panel-grid">
        <div className="surface-card">
          <h3 className="section-title">What else should be on the dashboard</h3>
          <p className="section-text">
            A stronger college dashboard should show quick stats, shortcuts, and
            record quality. Right now it has totals, and the next useful backend
            additions would be recently added students, unassigned students, and
            course-wise counts.
          </p>
        </div>
        <div className="surface-card">
          <h3 className="section-title">Current recommendation</h3>
          <p className="section-text">
            Keep dashboard as the college summary page only. Keep Students for
            account management, and Courses for catalog management. That avoids
            the mixed-up feeling you pointed out.
          </p>
        </div>
      </div>

      <div className="quick-grid">
        <button className="quick-card" onClick={() => navigate("/admin/students")}>
          <span className="badge">Quick Action</span>
          <h3>Create or edit students</h3>
          <p>Jump directly to student account management with aligned forms and actions.</p>
        </button>

        <button className="quick-card" onClick={() => navigate("/admin/courses")}>
          <span className="badge">Quick Action</span>
          <h3>Manage courses</h3>
          <p>Add courses, keep descriptions updated, and structure the academic catalog.</p>
        </button>

        <div className="quick-card">
          <span className="badge">Future Upgrade</span>
          <h3>Useful next metrics</h3>
          <p>Pending student approvals, course occupancy, and recently registered students.</p>
        </div>
      </div>
    </section>
  );
}
