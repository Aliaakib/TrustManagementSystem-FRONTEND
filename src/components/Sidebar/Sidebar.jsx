

import React, { useEffect, useState } from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserTie,
  FaDonate,
  FaMoneyCheckAlt,
  FaFileInvoiceDollar,
  FaBuilding,
  FaFileAlt,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaStickyNote,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { getTrustByUser } from "../../services/trustService";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [trust, setTrust] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState(""); // ✅ new state for user's name
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const fetchTrustAndUser = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setUserRole(user.role); // ✅ set user role
        setUserName(user.name); // ✅ set user name

        try {
          const trustData = await getTrustByUser(user.id);
          setTrust(trustData);
        } catch (error) {
          console.error("Error fetching trust:", error);
        }
      }
    };

    fetchTrustAndUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("trustId");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className={`sidebar-container ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <img
            src={trust?.logo || "/trust-logo.png"}
            alt="Trust Logo"
            className="sidebar-logo-img"
          />
          <div>
            <h3 className="sidebar-logo">{trust?.name || "No Trust Yet"}</h3>
            <p className="sidebar-role">Welcome, {userName || " User"}</p>{" "}
            {/* ✅ updated line */}
          </div>
        </div>
        <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <hr className="sidebar-divider" />

      <nav className="sidebar-nav">
        <Link to="/dashboard" className="sidebar-link" onClick={toggleSidebar}>
          <FaTachometerAlt className="sidebar-icon" />
          <span>Dashboard</span>
        </Link>
        <Link to="/members" className="sidebar-link" onClick={toggleSidebar}>
          <FaUsers className="sidebar-icon" />
          <span>Members</span>
        </Link>
        <Link to="/trustees" className="sidebar-link" onClick={toggleSidebar}>
          <FaUserTie className="sidebar-icon" />
          <span>Trustees</span>
        </Link>
        <Link to="/donations" className="sidebar-link" onClick={toggleSidebar}>
          <FaDonate className="sidebar-icon" />
          <span>Donations</span>
        </Link>
        <Link to="/fees" className="sidebar-link" onClick={toggleSidebar}>
          <FaMoneyCheckAlt className="sidebar-icon" />
          <span>Fees & Payment</span>
        </Link>
        <Link to="/expenses" className="sidebar-link" onClick={toggleSidebar}>
          <FaFileInvoiceDollar className="sidebar-icon" />
          <span>Manage Expense</span>
        </Link>
        <Link
          to="/trust-details"
          className="sidebar-link"
          onClick={toggleSidebar}
        >
          <FaBuilding className="sidebar-icon" />
          <span>Trust Details</span>
        </Link>
        <Link to="/documents" className="sidebar-link" onClick={toggleSidebar}>
          <FaFileAlt className="sidebar-icon" />
          <span>Documents</span>
        </Link>

        {/* <Link
          to="/notifications"
          className="sidebar-link"
          onClick={toggleSidebar}
        >
          <FaBell className="sidebar-icon" />
          <span>Notifications</span>
        </Link>
        <Link to="/settings" className="sidebar-link" onClick={toggleSidebar}>
          <FaCog className="sidebar-icon" />
          <span>Settings</span>
        </Link> */}
      </nav>

      <div className="sidebar-logout">
        <button className="sidebar-link" onClick={handleLogout}>
          <FaSignOutAlt className="sidebar-icon" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
