// src/pages/CreateTrust/CreateTrust.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTrust } from "../../services/trustService";
import "./CreateTrust.css";

const CreateTrust = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    logo: null,
    name: "",
    description: "",
    dateCreated: new Date().toISOString().slice(0, 10),
    presidentName: "",
    presidentPhone: "",
    trusteeName: "",
    trusteePhone: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      logo,
      name,
      description,
      dateCreated,
      presidentName,
      presidentPhone,
      trusteeName,
      trusteePhone,
    } = formData;

    if (
      !logo ||
      !name ||
      !description ||
      !dateCreated ||
      !presidentName ||
      !presidentPhone ||
      !trusteeName ||
      !trusteePhone
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.id) {
      alert("User not logged in. Please login first.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    data.append("userId", user.id);

    try {
      const response = await createTrust(data); // ✅ capture response
      const createdTrust = response.trust; // ✅ get trust from backend response

      localStorage.setItem("trustId", createdTrust._id); // ✅ save trustId
      alert("Trust created successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(
        "Trust creation failed:",
        error.response?.data || error.message
      );
      alert("Failed to create trust");
    }
  };

  return (
    <div className="trust-container">
      <section className="trust-card">
        <h2 className="trust-title">Create New Trust</h2>
        <form className="trust-form" onSubmit={handleSubmit}>
          <label className="trust-label">Trust Logo</label>
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleChange}
            className="trust-input"
            required
          />

          <input
            type="text"
            name="name"
            placeholder="Trust Name"
            value={formData.name}
            onChange={handleChange}
            className="trust-input"
            required
          />

          <textarea
            name="description"
            placeholder="Trust Description"
            value={formData.description}
            onChange={handleChange}
            className="trust-textarea"
            rows={4}
            required
          ></textarea>

          <label className="trust-label">Date Created</label>
          <input
            type="date"
            name="dateCreated"
            value={formData.dateCreated}
            onChange={handleChange}
            className="trust-input"
            required
          />

          <div className="trust-grid">
            <input
              type="text"
              name="presidentName"
              placeholder="President Name"
              value={formData.presidentName}
              onChange={handleChange}
              className="trust-input"
              required
            />
            <input
              type="text"
              name="presidentPhone"
              placeholder="President Phone"
              value={formData.presidentPhone}
              onChange={handleChange}
              className="trust-input"
              required
            />
          </div>

          <div className="trust-grid">
            <input
              type="text"
              name="trusteeName"
              placeholder="Trustee Name"
              value={formData.trusteeName}
              onChange={handleChange}
              className="trust-input"
              required
            />
            <input
              type="text"
              name="trusteePhone"
              placeholder="Trustee Phone"
              value={formData.trusteePhone}
              onChange={handleChange}
              className="trust-input"
              required
            />
          </div>

          <button type="submit" className="trust-btn">
            Create Trust
          </button>
        </form>
      </section>
    </div>
  );
};

export default CreateTrust;
