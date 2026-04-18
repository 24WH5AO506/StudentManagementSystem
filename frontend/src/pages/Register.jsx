import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Admin registered successfully");
      navigate("/admin/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-page admin-auth">
      <div className="auth-card card">
        <span className="badge">Admin Access</span>
        <h2>Admin Register</h2>
        <p style={{ marginBottom: "20px" }}>
          Create an admin account for official college management use.
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
              placeholder="Create password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        </div>

        <div className="actions-row">
          <button onClick={handleRegister} className="button-primary">
            Register Admin
          </button>
        </div>

        <p style={{ marginTop: "18px" }}>
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/admin/login")}
          >
            Login
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
