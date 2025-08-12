import React, { useState } from "react";
import "./Auth.css";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaFingerprint,
} from "react-icons/fa";
import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const TrusteeRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    trustId: "", // Manual input
    role: "trustee",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.trustId) {
      alert("Please enter the Trust ID.");
      return;
    }

    try {
      await registerUser(formData);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="register1-container">
      <section className="register1-card">
        <h2 className="register1-title">Trustee Registration</h2>
        <p className="register1-subtitle">Join the Trust as a Trustee</p>
        <form className="register1-form" onSubmit={handleSubmit}>
          <div className="register1-input-group">
            <FaUser className="register1-icon" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              value={formData.name}
              onChange={handleChange}
              className="register1-input"
            />
          </div>

          <div className="register1-input-group">
            <FaEnvelope className="register1-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={handleChange}
              className="register1-input"
            />
          </div>

          <div className="register1-input-group">
            <FaPhoneAlt className="register1-icon" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="register1-input"
            />
          </div>

          <div className="register1-input-group">
            <FaMapMarkerAlt className="register1-icon" />
            <input
              type="text"
              name="address"
              placeholder="Address"
              required
              value={formData.address}
              onChange={handleChange}
              className="register1-input"
            />
          </div>

          <div className="register1-input-group">
            <FaLock className="register1-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="register1-input"
            />
          </div>

          <div className="register1-input-group">
            <FaFingerprint className="register1-icon" />
            <input
              type="text"
              name="trustId"
              placeholder="Trust ID (provided by admin)"
              required
              value={formData.trustId}
              onChange={handleChange}
              className="register1-input"
            />
          </div>

          <input type="hidden" name="role" value="trustee" />

          <button type="submit" className="register1-btn">
            Register as Trustee
          </button>
        </form>

        <p className="register1-login-link">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </section>
    </div>
  );
};

export default TrusteeRegister;
