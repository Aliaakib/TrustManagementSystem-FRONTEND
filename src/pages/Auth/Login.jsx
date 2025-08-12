import React, { useState } from "react";
import { loginUser } from "../../services/authService";
import { getTrustByUser } from "../../services/trustService";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
  };

  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      errors.email = "You cannot leave the email blank";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      errors.password = "Password cannot be blank.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const data = await loginUser(formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("user", JSON.stringify(data.user));

      const trust = await getTrustByUser(data.user.id);
      if (trust) {
        localStorage.setItem("trustId", trust._id);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.response?.status === 404) {
        navigate("/create-trust");
      } else {
        setError(err.response?.data?.message || "Login failed");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="register1-container">
      <section className="register1-card">
        <h2 className="register1-title">Welcome Back</h2>
        <p className="register1-subtitle">
          Login to your Trust Track account
        </p>

        <form className="register1-form" onSubmit={handleSubmit}>
          <div className="register1-input-group">
            <FaEnvelope className="register1-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className={`register1-input ${fieldErrors.email ? "error" : ""}`}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          {fieldErrors.email && (
            <p className="error-text">{fieldErrors.email}</p>
          )}

          <div className="register1-input-group">
            <FaLock className="register1-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className={`register1-input ${
                fieldErrors.password ? "error" : ""
              }`}
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="toggle-password"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {fieldErrors.password && (
            <p className="error-text">{fieldErrors.password}</p>
          )}

          {error && <p className="error-text">{error}</p>}

          <div className="register1-forgot">
            <a href="/forgot-password">Forgot Password?</a>
          </div>

          <button type="submit" className="register1-btn">
            Login
          </button>
        </form>

        <p className="register1-login-link">
          Don't have an account? <a href="/register">Register here</a>
        </p>
      </section>
    </div>
  );
};

export default Login;
