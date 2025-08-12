import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home1 from "./pages/Home/Home1";
import Features from "./pages/Features/Features";
import Roles from "./pages/Roles/Roles";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

import Dashboard from "./pages/Dashboard/Dashboard";
import Member from "./pages/DashPages/Member";
import Trustee from "./pages/DashPages/Trustee";
import Donation from "./pages/DashPages/Donation";
import FeesPayment from "./pages/DashPages/FeesPayment";
import ManageExpense from "./pages/DashPages/ManageExpense";
import TrustDetails from "./pages/DashPages/TrustDetails";
import Document from "./pages/DashPages/Document";
import Notification from "./pages/DashPages/Notification";
import Setting from "./pages/DashPages/Setting";

import PublicLayout from "./components/Layout/PublicLayout";
import CreateTrust from "./pages/CreateTrust/CreateTrust";
import ForgetPassword from "./pages/Auth/ForgetPassword";
import OurStory from "./pages/OurStory";
function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes with navbar and footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home1 />} />
          <Route path="/features" element={<Features />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/our-story" element={<OurStory />} />

          <Route path="/create-trust" element={<CreateTrust />} />
        </Route>

        {/* Dashboard/private routes without navbar/footer */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/members" element={<Member />} />
        <Route path="/trustees" element={<Trustee />} />
        <Route path="/donations" element={<Donation />} />
        <Route path="/fees" element={<FeesPayment />} />
        <Route path="/expenses" element={<ManageExpense />} />
        <Route path="/trust-details" element={<TrustDetails />} />
        <Route path="/documents" element={<Document />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
