import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/auth/admin/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "admin");
      navigate("/admin/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="auth-page admin-auth">
      <div
        className="auth-card card"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(239,246,255,0.96) 100%)",
          border: "1px solid rgba(59, 130, 246, 0.18)",
          boxShadow: "0 28px 60px rgba(37, 99, 235, 0.14)",
        }}
      >
        <span
          className="badge"
          style={{
            background: "rgba(37, 99, 235, 0.14)",
            color: "#1d4ed8",
          }}
        >
          Admin Access
        </span>
        <h2>Admin Login</h2>
        <p style={{ marginBottom: "20px" }}>
          College staff can manage students and courses here.
        </p>

        <div className="form-grid">
          <div className="field full-width">
            <label>Email</label>
            <input
              placeholder="Enter admin email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="field full-width">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        </div>

        <div className="actions-row">
          <button
            onClick={login}
            className="button-primary full-width"
            style={{
              background: "linear-gradient(135deg, #2563eb, #0f766e)",
              boxShadow: "0 18px 34px rgba(37, 99, 235, 0.24)",
            }}
          >
            Admin Login
          </button>
        </div>

        <p style={{ marginTop: "18px" }}>
          Need an admin account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/admin/register")}
          >
            Admin Register
          </span>
        </p>

        <p style={{ marginTop: "10px" }}>
          Go back to{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Home Page
          </span>
        </p>
      </div>
    </div>
  );
}
