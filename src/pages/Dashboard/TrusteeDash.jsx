import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../Dashboard/Dashboard.css";
import { FaUsers, FaUserTie, FaDonate, FaMoneyBillWave } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "../../components/Sidebar/Sidebar";

const COLORS = ["#0b1c3d", "#d9534f"];

const TrusteeDash = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const trustId = localStorage.getItem("trustId");
    if (!trustId) {
      console.warn("trustId missing; cannot fetch dashboard stats");
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/dashboard/stats?trustId=${trustId}`
        );
        console.log("Trustee Dashboard stats:", res.data);
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching trustee dashboard stats:", err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-container">
        <h2 className="dashboard-title">Trustee Dashboard</h2>

        {/* Summary Cards */}
        <div className="dashboard-cards">
          <div className="dashboard-card">
            <FaUsers className="dashboard-icon" />
            <h3>{stats.totalMembers}</h3>
            <p>Total Members</p>
          </div>
          <div className="dashboard-card">
            <FaUserTie className="dashboard-icon" />
            <h3>{stats.totalTrustees}</h3>
            <p>Total Trustees</p>
          </div>
          <div className="dashboard-card">
            <FaDonate className="dashboard-icon" />
            <h3>₹{stats.totalDonations}</h3>
            <p>Donations Received</p>
          </div>
          <div className="dashboard-card">
            <FaMoneyBillWave className="dashboard-icon" />
            <h3>₹{stats.feesCollected}</h3>
            <p>Fees Collected</p>
          </div>
        </div>

        {/* Charts */}
        <div className="dashboard-charts">
          <div className="dashboard-chart-card">
            <h4>Monthly Donation Overview</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stats.donationData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#002e83" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="dashboard-chart-card">
            <h4>Fee Payment Status</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={stats.feeStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {stats.feeStatusData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrusteeDash;
