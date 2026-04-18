import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function StudentRegister() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

  const register = async () => {
    try {
      await API.post("/auth/student/register", form);
      alert("Student registered successfully");
      navigate("/student/login");
    } catch (error) {
      alert(error.response?.data?.message || "Student registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card card">
        <span className="badge" style={{ background: "rgba(16, 185, 129, 0.12)", color: "#059669" }}>
          Student Access
        </span>
        <h2>Student Registration</h2>
        <p style={{ marginBottom: "20px" }}>
          Create your student account to sign in later.
        </p>

        <div className="form-grid">
          <div className="field full-width">
            <label>Name</label>
            <input
              placeholder="Full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div className="field full-width">
            <label>Email</label>
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="field full-width">
            <label>Phone</label>
            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div className="field full-width">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>
        </div>

        <div className="actions-row">
          <button
            onClick={register}
            className="button-primary"
            style={{ background: "linear-gradient(135deg, #10b981, #059669)" }}
          >
            Student Register
          </button>
        </div>

        <p style={{ marginTop: "18px" }}>
          Already have an account?{" "}
          <span
            className="text-emerald-600 cursor-pointer"
            onClick={() => navigate("/student/login")}
          >
            Student Login
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
