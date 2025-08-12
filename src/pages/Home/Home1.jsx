import React from "react";
import "./Home1.css";
import {
  FaDatabase,
  FaMoneyCheckAlt,
  FaUsersCog,
  FaDonate,
  FaFileInvoiceDollar,
  FaFilePdf,
  FaLaptopCode,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Home1 = () => {
  const navigate = useNavigate();

  return (
    <div className="home1-container">
      {/* Hero Section */}
      <header className="home1-hero">
        <div className="home1-hero-content">
          <h4 className="home1-subtitle">Welcome to</h4>
          <h1 className="home1-title">
            Efficient Trust Management
            <br />
            for a Transparent Future
          </h1>
          <button className="home1-btn" onClick={() => navigate("/register")}>
            Get Started
          </button>
        </div>
        <div className="home1-hero-image">
          <img src="/trustimg1.jpg" alt="Trust Hero" />
        </div>
      </header>

      {/* Features */}
      <section className="home1-features">
        <div className="home1-feature-card">
          <FaDatabase className="home1-feature-icon" />
          <h4>Centralized Records</h4>
          <p>
            Securely manage all trust data, donations, and member info in one
            place.
          </p>
        </div>
        <div className="home1-feature-card highlight">
          <FaMoneyCheckAlt className="home1-feature-icon" />
          <h4>Transparent Finance</h4>
          <p>
            Track donations, fees, and expenses with real-time financial
            clarity.
          </p>
        </div>
        <div className="home1-feature-card">
          <FaLaptopCode className="home1-feature-icon" />
          <h4>Simple UI</h4>
          <p>
            A clean and easy-to-use interface to manage all trust activities.
            <br />
          
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="home1-about">
        <div className="home1-about-image">
          <img src="/trustimg2.jpg" alt="About Trust" />
        </div>
        <div className="home1-about-content">
          <span className="home1-section-label">About Us</span>
          <h2>
            Since 2025
            <br />
            Empowering Charitable Trusts Digitally
          </h2>
          <p>
            Our mission is to simplify trust operations with reliable and modern
            tools for trustees and members alike.
          </p>
          <button className="home1-btn">Learn More</button>
        </div>
      </section>

      {/* Services */}
      <section className="home1-services">
        <h2 className="home1-section-title">
          Key Modules of the Trust Management System
        </h2>
        <div className="home1-services-grid">
          <div className="home1-service-card">
            <FaDonate className="home1-service-icon" />
            <p>Donation Tracking</p>
          </div>
          <div className="home1-service-card">
            <FaMoneyCheckAlt className="home1-service-icon" />
            <p>Member Fee Management</p>
          </div>
          <div className="home1-service-card">
            <FaFileInvoiceDollar className="home1-service-icon" />
            <p>Expense Records</p>
          </div>
          <div className="home1-service-card">
            <FaDatabase className="home1-service-icon" />
            <p>Trust Information Registry</p>
          </div>
          <div className="home1-service-card">
            <FaUsersCog className="home1-service-icon" />
            <p>Trustee & Member Roles</p>
          </div>
          <div className="home1-service-card">
            <FaFilePdf className="home1-service-icon" />
            <p>PDF Reports & Receipts</p>
          </div>
        </div>
        <button className="home1-btn">Explore All Features</button>
      </section>
    </div>
  );
};

export default Home1;
