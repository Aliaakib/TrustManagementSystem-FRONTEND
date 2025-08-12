import React from "react";
import "./Contact.css";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="contact1-container">
      {/* Header */}
      <section className="contact1-header">
        <h1 className="contact1-title">Get in Touch</h1>
        <p className="contact1-subtitle">
          We’d love to hear from you! Reach out with any questions or feedback.
        </p>
      </section>

      {/* Contact Section */}
      <section className="contact1-content">
        {/* Contact Info */}
        <div className="contact1-info">
          <div className="contact1-info-card">
            <FaMapMarkerAlt className="contact1-icon" />
            <h3>Address</h3>
            <p>121/B, Astodia, Saiyedwada, Ahmedabad - 380001</p>
          </div>

          <div className="contact1-info-card">
            <FaPhoneAlt className="contact1-icon" />
            <h3>Phone</h3>
            <p>+91 6353556477</p>
          </div>

          <div className="contact1-info-card">
            <FaEnvelope className="contact1-icon" />
            <h3>Email</h3>
            <p>aliaakibbukhari1@gmail.com </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact1-form">
          <form>
            <input
              type="text"
              placeholder="Your Name"
              className="contact1-input"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="contact1-input"
              required
            />
            <textarea
              placeholder="Your Message"
              className="contact1-textarea"
              required
            ></textarea>
            <button type="submit" className="contact1-btn">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
