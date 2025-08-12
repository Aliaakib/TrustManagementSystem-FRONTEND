import React from "react";
import "./Roles.css";
import { FaUserTie, FaUsers, FaUserShield } from "react-icons/fa";

const Roles = () => {
  return (
    <div className="roles1-container">
      <section className="roles1-header">
        <h1 className="roles1-title">System User Roles</h1>
        <p className="roles1-subtitle">
          Clearly defined roles for transparency and accountability.
        </p>
      </section>

      <section className="roles1-section">
        <div className="roles1-card">
          <FaUserShield className="roles1-icon" />
          <h3>Admin</h3>
          <ul>
            <li>Full access to system</li>
            <li>Create & manage trust</li>
            <li>Add/remove trustees & members</li>
            <li>Access all financial reports</li>
          </ul>
        </div>

        <div className="roles1-card">
          <FaUserTie className="roles1-icon" />
          <h3>Trustee</h3>
          <ul>
            <li>View trust details & members</li>
            <li>Manage donations & expenses</li>
            <li>Generate reports</li>
            <li>Limited access to settings</li>
          </ul>
        </div>

        <div className="roles1-card">
          <FaUsers className="roles1-icon" />
          <h3>Member</h3>
          <ul>
            <li>View trust info & their profile</li>
            <li>Pay monthly fees</li>
            <li>View donation history</li>
            <li>Download receipts</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Roles;
