import React, { useState, useEffect } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [message, setMessage] = useState("");
  const [countdown, setCountdown] = useState(5);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
  };

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const validate = () => {
    const errors = {};
    const { email, newPassword, confirmPassword } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

    if (!email.trim()) {
      errors.email = "You cannot leave the email blank";
    } else if (!emailRegex.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!newPassword) {
      errors.newPassword = "New password is required";
    } else if (!passwordRegex.test(newPassword)) {
      errors.newPassword =
        "Password must be 8+ chars with uppercase, lowercase, number & special char";
    }

    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post("/api/auth/reset-password", {
        email: formData.email,
        newPassword: formData.newPassword,
      });

      setMessage(res.data.message || "Password has been reset successfully!");
      setResetSuccess(true);
    } catch (error) {
      setMessage(error.response?.data?.message || "Reset failed");
    }
  };

  useEffect(() => {
    if (resetSuccess) {
      const interval = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        navigate("/login");
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }
  }, [resetSuccess, navigate]);

  return (
    <div className="register1-container">
      <section className="register1-card">
        <h2 className="register1-title">Reset Password</h2>
        <p className="register1-subtitle">Enter your new password</p>

        <form className="register1-form" onSubmit={handleReset}>
          {/* Email */}
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

          {/* New Password */}
          <div className="register1-input-group">
            <FaLock className="register1-icon" />
            <input
              type={showPassword.newPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              className={`register1-input ${
                fieldErrors.newPassword ? "error" : ""
              }`}
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
            <span
              className="toggle-password"
              onClick={() => toggleVisibility("newPassword")}
            >
              {showPassword.newPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {fieldErrors.newPassword && (
            <p className="error-text">{fieldErrors.newPassword}</p>
          )}

          {/* Confirm Password */}
          <div className="register1-input-group">
            <FaLock className="register1-icon" />
            <input
              type={showPassword.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm New Password"
              className={`register1-input ${
                fieldErrors.confirmPassword ? "error" : ""
              }`}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span
              className="toggle-password"
              onClick={() => toggleVisibility("confirmPassword")}
            >
              {showPassword.confirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {fieldErrors.confirmPassword && (
            <p className="error-text">{fieldErrors.confirmPassword}</p>
          )}

          <button type="submit" className="register1-btn">
            Reset Password
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "1rem",
              color: resetSuccess ? "green" : "red",
              textAlign: "center",
            }}
          >
            {message}
          </p>
        )}

        {resetSuccess && (
          <p
            style={{ textAlign: "center", marginTop: "0.5rem", color: "#555" }}
          >
            Redirecting to login in {countdown} seconds...
          </p>
        )}

        <p className="register1-login-link">
          Back to <a href="/login">Login</a>
        </p>
      </section>
    </div>
  );
};

export default ForgetPassword;
