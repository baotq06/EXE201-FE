import React from "react";
import { useNavigate } from "react-router-dom";
import "./AccessDenied.css";

const AccessDenied = () => {
  const navigate = useNavigate();

  return (
    <div className="access-denied">
      <div className="access-denied-content">
        <h1>403</h1>
        <h2>Truy cập bị từ chối</h2>
        <p>Bạn không có quyền truy cập vào trang này.</p>
        <button onClick={() => navigate("/")}>Quay về trang chủ</button>
      </div>
    </div>
  );
};

export default AccessDenied;
