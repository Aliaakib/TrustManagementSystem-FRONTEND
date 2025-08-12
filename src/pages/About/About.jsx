import React from "react";
import "./About.css";
import { FaHandsHelping, FaRegBuilding, FaHeart } from "react-icons/fa";

const About = () => {
  return (
    <div className="about1-container">
      {/* Header */}
      <section className="about1-header">
        <h1 className="about1-title">About Our Trust Track</h1>
        <p className="about1-subtitle">
          Simplifying trust operations through innovation and transparency.
        </p>
      </section>

      {/* About Content */}
      <section className="about1-content">
        <div className="about1-text">
          <p>
            Established with the vision to empower charitable trusts and
            organizations, our Trust Management System provides a digital
            backbone for all trust-related activities. From registering a trust
            to managing donations, expenses, members, and trustees — everything
            is streamlined under one intuitive platform.
          </p>
          <p>
            Our mission is to eliminate paperwork, improve accountability, and
            foster trust among stakeholders by making processes transparent,
            secure, and accessible.
          </p>
        </div>
        <div className="about1-image">
          <img src="/about.png" alt="About Trust" />
        </div>
      </section>

      {/* Core Values Section */}
      <section className="about1-values">
        <div className="about1-value-card">
          <FaHandsHelping className="about1-icon" />
          <h3>Empowerment</h3>
          <p>Enabling trusts to operate independently with efficient tools.</p>
        </div>

        <div className="about1-value-card">
          <FaRegBuilding className="about1-icon" />
          <h3>Accountability</h3>
          <p>Role-based access, PDF reports, and clear transaction history.</p>
        </div>

        <div className="about1-value-card">
          <FaHeart className="about1-icon" />
          <h3>Impact</h3>
          <p>
            Helping you focus on making real social change, not admin tasks.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
