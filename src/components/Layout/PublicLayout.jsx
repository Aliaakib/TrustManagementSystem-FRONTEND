// src/layouts/PublicLayout.jsx
import React from "react";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import Navbar1 from "../Navbar/Navbar1";

const PublicLayout = () => {
  return (
    <>
      <Navbar1 />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
