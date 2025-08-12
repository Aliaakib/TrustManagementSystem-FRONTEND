import React from "react";
import "./Home.css";
import {
  FaUsers,
  FaShieldAlt,
  FaDonate,
  FaChartLine,
  FaCheckCircle,
  FaLaptopCode,
  FaHandshake,
} from "react-icons/fa";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>A modern system to manage your Trust.</h1>
          <p>
            Manage Trustees, Members, Donations, and Fees—all in one place, with
            analytics and reports.
          </p>
          <div className="hero-buttons">
            <button className="btn primary">Get Started</button>
            <button className="btn secondary">Learn More</button>
          </div>
          <div className="stats">
            <div>
              <strong>10+</strong> Trusts onboarded
            </div>
            <div>
              <strong>₹10L+</strong> Donations Managed
            </div>
          </div>
        </div>
        <div className="hero-image">
          <img src="/vv1.jpeg" alt="Trust Card" />
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <h2>Why Choose Our Trust Management System</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaUsers className="icon" />
            <h3>Member Management</h3>
            <p>Add, manage and organize all trust members efficiently.</p>
          </div>
          <div className="feature-card">
            <FaShieldAlt className="icon" />
            <h3>Trustee Control</h3>
            <p>Assign and track trustee roles with secure access.</p>
          </div>
          <div className="feature-card">
            <FaDonate className="icon" />
            <h3>Donation Tracking</h3>
            <p>Record donations, generate receipts, and report insights.</p>
          </div>
          <div className="feature-card">
            <FaChartLine className="icon" />
            <h3>Fee Collection</h3>
            <p>Monitor member fees and auto-generate monthly reports.</p>
          </div>
        </div>
      </section>

      {/* Customers */}
      <section className="customers-section">
        <h2>Trusted by Leading Organizations</h2>
        <div className="logos">
          <span>TrustOne</span>
          <span>HelpingHands</span>
          <span>FaithGroup</span>
          <span>CareCircle</span>
          <span>UnityTrust</span>
        </div>
      </section>

      {/* Value Section */}
      <section className="value-section">
        <h2>Make every step user–centric</h2>
        <div className="value-grid">
          <div className="value-card">
            <FaLaptopCode className="icon" />
            <h3>Easy Onboarding</h3>
            <p>Quickly onboard your team with a few simple steps.</p>
          </div>
          <div className="value-card">
            <FaHandshake className="icon" />
            <h3>Collaborative Tools</h3>
            <p>Work seamlessly with trustees and admins together.</p>
          </div>
          <div className="value-card">
            <FaCheckCircle className="icon" />
            <h3>Reliable System</h3>
            <p>Secure and optimized for stability and performance.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
