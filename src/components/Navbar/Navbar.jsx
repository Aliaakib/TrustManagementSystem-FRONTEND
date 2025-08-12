import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="highlight">/</span>TRUSTBLOCKS
      </div>
      <ul className="navbar-links">
        {/* <li>
          <a href="#">Solutions</a>
        </li> */}
        <li>
          <a href="/features">Features</a>
        </li>
        <li>
          <a href="/roles">Roles</a>
        </li>
        <li>
          <a href="/about">About Us</a>
        </li>
      </ul>
      <div className="navbar-actions">
        {/* <a href="#" className="signin">
          Sign in
        </a> */}
        <button className="create-btn">Register</button>
      </div>
    </nav>
  );
};

export default Navbar;
