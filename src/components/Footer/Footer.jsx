import React from "react";
import "./Footer.css";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3>Trust Track</h3>
          <p>Secure, Organized, and Efficient Trust Administration</p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/features">Features</a>
            </li>
            {/* <li>
              <a href="#roles">Roles</a>
            </li> */}
            <li>
              <a href="/register">Get Started</a>
            </li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://wa.me/+916353556477">
              <FaWhatsapp />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="https://www.instagram.com/me.aliaakibbukhari?igsh=bDRubHdlaTIxMW1t&utm_source=qr ">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/in/bukhari-aliaakib-9056581ab/">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Trust Track. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
