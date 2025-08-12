import React, { useState } from "react";
import "./Auth.css";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    role: "admin",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const digits = value.replace(/\D/g, "").slice(0, 10); // allow only 10 digits
      setFormData((prev) => ({ ...prev, [name]: digits }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

    if (!nameRegex.test(formData.name)) {
      newErrors.name = "Only alphabets allowed in name";
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await registerUser(formData);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="register1-container">
      <section className="register1-card">
        <h2 className="register1-title">Create an Account</h2>
        <p className="register1-subtitle">Join the Trust Track </p>
        <form className="register1-form" onSubmit={handleSubmit}>
          <div className="register1-input-group">
            <FaUser className="register1-icon" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={`register1-input ${errors.name ? "error" : ""}`}
              required
            />
          </div>
          {errors.name && <p className="error-text">{errors.name}</p>}

          <div className="register1-input-group">
            <FaEnvelope className="register1-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={`register1-input ${errors.email ? "error" : ""}`}
              required
            />
          </div>
          {errors.email && <p className="error-text">{errors.email}</p>}

          <div className="register1-input-group">
            <FaPhoneAlt className="register1-icon" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className={`register1-input ${errors.phone ? "error" : ""}`}
              required
            />
          </div>
          {errors.phone && <p className="error-text">{errors.phone}</p>}

          <div className="register1-input-group">
            <FaMapMarkerAlt className="register1-icon" />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className={`register1-input ${errors.address ? "error" : ""}`}
              required
            />
          </div>
          {errors.address && <p className="error-text">{errors.address}</p>}

          <div className="register1-input-group">
            <FaLock className="register1-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`register1-input ${errors.password ? "error" : ""}`}
              required
            />
            <span className="toggle-password" onClick={togglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <p className="error-text">{errors.password}</p>}

          <input type="hidden" name="role" value="admin" />
          <button type="submit" className="register1-btn">
            Register
          </button>
        </form>
        <p className="register1-login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </section>
    </div>
  );
};

export default Register;
