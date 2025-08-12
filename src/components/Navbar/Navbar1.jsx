import React, { useState } from "react";
import "./Navbar1.css";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar1 = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar1">
      <div className="navbar1-topbar">
        <span className="navbar1-email">aliaakibbukhari1@gmail.com</span>
        <div className="navbar1-top-links">
          {/* <a href="/register" className="navbar1-auth-link">
            Login / Register
          </a> */}
          <span className="navbar1-lang">Language: ENG</span>
        </div>
      </div>

      <div className="navbar1-main">
        <div className="navbar1-logo">TrustTrack</div>

        <div className={`navbar1-links ${menuOpen ? "active" : ""}`}>
          <a href="/" className="navbar1-link">
            Home
          </a>
          <a href="/our-story" className="navbar1-link">
            Our Story
          </a>
          <a href="/features" className="navbar1-link">
            Features
          </a>

          <a href="/about" className="navbar1-link">
            About
          </a>
          <a href="/contact" className="navbar1-link">
            Contact
          </a>
          <a href="/login" className="navbar1-link">
            Login
          </a>
        </div>

        <div className="navbar1-contact">
          <span className="navbar1-phone-icon">📞</span>
          <span className="navbar1-phone-number">+91 63535 56477</span>
        </div>

        <div className="navbar1-toggle" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </div>
  );
};

export default Navbar1;
