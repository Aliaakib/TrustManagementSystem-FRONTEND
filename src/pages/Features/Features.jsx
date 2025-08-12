import React from "react";
import "./Features.css";
import {
  FaUserShield,
  FaUsers,
  FaDonate,
  FaMoneyCheckAlt,
  FaFileInvoice,
  FaChartPie,
  FaLock,
  FaFilePdf,
  FaSyncAlt,
} from "react-icons/fa";

const Features = () => {
  return (
    <div className="feature1-container">
      <section className="feature1-header">
        <h1 className="feature1-title">Key Features of Trust Track</h1>
        <p className="feature1-subtitle">
          Modern tools to empower your trust's operations with transparency and
          control.
        </p>
      </section>

      <section className="feature1-grid">
        <div className="feature1-card">
          <FaUserShield className="feature1-icon" />
          <h3>Admin Control</h3>
          <p>
            Full administrative access to manage trustees, members, donations,
            and settings.
          </p>
        </div>

        <div className="feature1-card">
          <FaUsers className="feature1-icon" />
          <h3>Member Management</h3>
          <p>
            Add, edit, or remove members and trustees with secure role-based
            access.
          </p>
        </div>

        <div className="feature1-card">
          <FaDonate className="feature1-icon" />
          <h3>Donation Records</h3>
          <p>
            Track every donation with amount, donor, date, and purpose logged
            securely.
          </p>
        </div>

        <div className="feature1-card">
          <FaMoneyCheckAlt className="feature1-icon" />
          <h3>Fee Management</h3>
          <p>
            Monitor monthly fees, update payment status, and notify unpaid
            members.
          </p>
        </div>

        <div className="feature1-card">
          <FaFileInvoice className="feature1-icon" />
          <h3>Expense Tracking</h3>
          <p>
            Record every expense with details, categories, and receipt
            attachments.
          </p>
        </div>

        <div className="feature1-card">
          <FaChartPie className="feature1-icon" />
          <h3>Analytics & Reports</h3>
          <p>
            Visualize income, expenses, and generate reports for transparency.
          </p>
        </div>

        <div className="feature1-card">
          <FaLock className="feature1-icon" />
          <h3>Secure Authentication</h3>
          <p>
            Secure login for admins, trustees, and members with unique
            credentials.
          </p>
        </div>

        <div className="feature1-card">
          <FaFilePdf className="feature1-icon" />
          <h3>PDF Generation</h3>
          <p>
            Instantly generate PDF receipts and financial reports with branding.
          </p>
        </div>

        <div className="feature1-card">
          <FaSyncAlt className="feature1-icon" />
          <h3>Real-time Updates</h3>
          <p>
            Live sync across all users for changes in donations, fees, and
            expenses.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Features;
