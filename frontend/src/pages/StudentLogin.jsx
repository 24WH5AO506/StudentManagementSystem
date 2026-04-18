import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function StudentLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/auth/student/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "student");
      navigate("/student/portal");
    } catch (error) {
      alert(error.response?.data?.message || "Student login failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <span className="badge" style={{ background: "rgba(16, 185, 129, 0.12)", color: "#059669" }}>
          Student Access
        </span>
        <h2>Student Login</h2>
        <p style={{ marginBottom: "20px" }}>
          Sign in using your registered email and password.
        </p>

        <div className="form-grid">
          <div className="field full-width">
            <label>Email</label>
            <input
              placeholder="Enter registered email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="field full-width">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        </div>

        <div className="actions-row">
          <button
            onClick={login}
            className="button-primary"
            style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
          >
            Student Login
          </button>
        </div>

        <p style={{ marginTop: "18px" }}>
          Don't have an account?{" "}
          <span
            className="text-emerald-600 cursor-pointer"
            onClick={() => navigate("/student/register")}
          >
            Student Register
          </span>
        </p>

        <p style={{ marginTop: "10px" }}>
          Go back to{" "}
          <span
            className="text-emerald-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home Page
          </span>
        </p>
      </div>
    </div>
  );
}
