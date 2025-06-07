import Header from "@/components/header/Header";
import NavBar from "@/components/navBar/NavBar";
import React, { useState } from "react";
import "./Layout.css";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div className="layout-h">
        <Header isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div className="layout-n">
        <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <main className="layout-m" style={{width: isOpen ? "79%" : "100%", position: "fixed", left: isOpen ? "21%" : "0%", top: "70px"}}>{children}</main>
    </div>
  );
};

export default Layout;
