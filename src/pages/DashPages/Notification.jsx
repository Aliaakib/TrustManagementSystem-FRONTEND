import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar"; // adjust path as per your structure
import "./Notification.css";
import { FaTrash } from "react-icons/fa";

const Notification = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Member Registration",
      message: "A new member has registered and is waiting for approval.",
      time: "7/9/2025, 12:28:33 PM",
      priority: "high",
      read: false,
    },
    {
      id: 2,
      title: "Trust Meeting Scheduled",
      message: "Monthly trust meeting scheduled for next week.",
      time: "7/9/2025, 12:28:33 PM",
      priority: "medium",
      read: true,
    },
  ]);

  const [filter, setFilter] = useState("all");

  const handleDelete = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const filteredNotifications =
    filter === "unread"
      ? notifications.filter((n) => !n.read)
      : filter === "read"
      ? notifications.filter((n) => n.read)
      : notifications;

  return (
    <div className="notification-container">
      <Sidebar />
      <div className="notification-main">
        <h2 className="notify-title">Notifications</h2>

        <div className="notify-tabs">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "unread" ? "active" : ""}
            onClick={() => setFilter("unread")}
          >
            Unread
          </button>
          <button
            className={filter === "read" ? "active" : ""}
            onClick={() => setFilter("read")}
          >
            Read
          </button>
          <button className="notify-count">
            {notifications.length} notifications
          </button>
        </div>

        {filteredNotifications.length === 0 ? (
          <p className="notify-empty">No notifications found.</p>
        ) : (
          filteredNotifications.map((note) => (
            <div
              key={note.id}
              className={`notify-card ${note.read ? "read" : "unread"}`}
            >
              <div className="notify-header">
                <span className="notify-icon">
                  {note.title.includes("Meeting") ? "📢" : "ℹ️"}
                </span>
                <strong>{note.title}</strong>
                <span className={`notify-priority ${note.priority}`}>
                  {note.priority}
                </span>
                <FaTrash
                  className="notify-delete"
                  onClick={() => handleDelete(note.id)}
                />
              </div>
              <p className="notify-message">{note.message}</p>
              <span className="notify-time">{note.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notification;
