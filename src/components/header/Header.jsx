/* eslint-disable */
import React, { useState } from "react";

import "./Header.css";
import { logout } from "@/api/userAPI/user";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Header = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout();
      toast.success("Đăng xuất thành công");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Đăng xuất thất bại");
    }
  };

  return (
    <div className="headercontaint">
      <i
        className="fa-solid fa-bars"
        style={{ display: "flex", alignItems: "center", marginLeft: "20px" }}
        onClick={() => setIsOpen(!isOpen)}
      ></i>
      <p
        className="tenheader"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        <i className="fa-solid fa-star-half-stroke"></i>Smart POS
      </p>
      <div className="iconheader">
        <i className="fa-solid fa-bell"></i>
        <i
          className="fa-solid fa-right-to-bracket"
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        ></i>
      </div>
    </div>
  );
};

export default Header;
