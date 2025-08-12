import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Setting.css";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const [profile, setProfile] = useState({
    fullName: "Aliaakib Bukhari",
    email: "aliaakibbukhari110@gmail.com",
    phone: "6353556477",
    role: "admin",
    address: "Astodia",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const saveProfile = () => {
    alert("Profile updated successfully");
  };

  const updatePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      alert("New passwords do not match");
      return;
    }
    alert("Password updated successfully");
  };

  return (
    <div className="setting-container">
      <Sidebar />
      <div className="setting-main">
        <h2 className="setting-title">Settings</h2>

        <div className="setting-tabs">
          <button
            className={`setting-tab ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            👤 Profile
          </button>
          <button
            className={`setting-tab ${
              activeTab === "password" ? "active" : ""
            }`}
            onClick={() => setActiveTab("password")}
          >
            🔐 Password
          </button>
        </div>

        {activeTab === "profile" && (
          <div className="setting-card">
            <h3>Profile Information</h3>
            <div className="setting-field">
              <label>Full Name</label>
              <input
                name="fullName"
                value={profile.fullName}
                onChange={handleProfileChange}
              />
            </div>
            <div className="setting-field">
              <label>Email</label>
              <input
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
              />
            </div>
            <div className="setting-field">
              <label>Phone Number</label>
              <input
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
              />
            </div>
            <div className="setting-field">
              <label>Role</label>
              <input value={profile.role} readOnly className="readonly" />
            </div>
            <div className="setting-field">
              <label>Address</label>
              <textarea
                name="address"
                value={profile.address}
                onChange={handleProfileChange}
              ></textarea>
            </div>
            <button className="setting-btn" onClick={saveProfile}>
              💾 Save Changes
            </button>
          </div>
        )}

        {activeTab === "password" && (
          <div className="setting-card">
            <h3>Change Password</h3>
            <div className="setting-field">
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="setting-field">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="setting-field">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirmNewPassword"
                value={passwordData.confirmNewPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <button className="setting-btn" onClick={updatePassword}>
              💾 Update Password
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Setting;
