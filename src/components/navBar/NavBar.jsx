/* eslint-disable */
import React from "react";

import "./NavBar.css";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
const NavBar = ({ isOpen, setIsOpen }) => {
  const user = useSelector((state) => state.user);

  const navigate = useNavigate();
  const location = useLocation();

  const handleClickProfile = () => {
    const userId = user._id;
    navigate(`/information/${userId}`);
  };

  return (
    <div className="main" style={{display: isOpen ? "block" : "none"}}>
      <div className="navBar">
        <div className="navBar-user">
          <div className="user-avt">
            <img src={user.avatar} alt="" onClick={handleClickProfile} />
          </div>
          <div className="user-name" onClick={handleClickProfile}>
            {user.userName}
          </div>
        </div>

        <hr />

        <div className="navBar-menu">
          <div className="navBar-menu-item">
            <p
              onClick={() => navigate("/")}
              className={`${location.pathname === "/" ? "active" : ""}`}
            >
              <i className="fa-solid fa-chart-pie icon-navbar"></i>Tổng quan
            </p>
          </div>

          <div className="navBar-menu-item">
            <div className="menu-item-title">
              <p>
                {" "}
                <i className="fa-solid fa-clipboard icon-navbar"></i>Xuất - nhập
                với NCC
              </p>
              <div className="sub-menu">
                <div className="sub-menu-item">
                  <p>
                    <i className="fa-solid fa-chevron-right icon-navbar"></i>
                    Xuất kho
                  </p>
                </div>
                <p
                  className={`sub-menu-item ${
                    location.pathname === "/listExportSlip/Provider"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => navigate("/listExportSlip/Provider")}
                >
                  Phiếu xuất kho
                </p>
              </div>
              <div className="sub-menu">
                <div className="sub-menu-item">
                  <p>
                    <i className="fa-solid fa-chevron-right icon-navbar"></i>
                    Nhập kho
                  </p>
                </div>
                <p
                  className={`sub-menu-item ${
                    location.pathname === "/listImportSlip/Provider"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => navigate(`/listImportSlip/Provider`)}
                >
                  Phiếu nhập kho
                </p>
              </div>
            </div>
          </div>

          <div className="navBar-menu-item">
            <div className="menu-item-title">
              <p>
                <i className="fa-solid fa-clipboard icon-navbar"></i>Xuất - nhập
                với nội bộ
              </p>
              <div className="sub-menu">
                <div className="sub-menu-item">
                  <p>
                    <i className="fa-solid fa-chevron-right icon-navbar"></i>
                    Xuất kho
                  </p>
                </div>
                <p
                  className={`sub-menu-item ${
                    location.pathname === "/listExportSlip/Agency"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => navigate(`/listExportSlip/Agency`)}
                >
                  Phiếu xuất kho
                </p>
              </div>

              <div className="sub-menu">
                <div className="sub-menu-item">
                  <p>
                    <i className="fa-solid fa-chevron-right icon-navbar"></i>
                    Nhập kho
                  </p>
                </div>
                <p
                  className={`sub-menu-item ${
                    location.pathname === "/listImportSlip/Agency"
                      ? "active"
                      : ""
                  }`}
                  onClick={() => navigate(`/listImportSlip/Agency`)}
                >
                  Phiếu nhập kho
                </p>
              </div>
            </div>
          </div>

          <div className="navBar-menu-item">
            <p
              onClick={() => navigate("/listInventory")}
              className={`${
                location.pathname === "/listInventory" ? "active" : ""
              }`}
            >
              <i className="fa-solid fa-chart-simple icon-navbar"></i>Quản lý
              kiểm kê
            </p>
          </div>
          <div className="navBar-menu-item">
            <div className="menu-item-title">
              <p>
                <i className="fa-solid fa-chart-simple icon-navbar"></i>Báo cáo
                thống kê
              </p>
              <div className="sub-menu">
                <div className="sub-menu-item">
                  <p
                    onClick={() => navigate("/report-import")}
                    className={`${
                      location.pathname === "/report-import" ? "active" : ""
                    }`}
                  >
                    <i className="fa-solid fa-chevron-right icon-navbar"></i>Báo
                    cáo nhập kho
                  </p>
                  <p
                    onClick={() => navigate("/report-inventory")}
                    className={`${
                      location.pathname === "/report-inventory" ? "active" : ""
                    }`}
                  >
                    <i className="fa-solid fa-chevron-right icon-navbar"></i>Báo
                    cáo tồn kho
                  </p>
                  <p
                    onClick={() => navigate("/report-export-import-inventory")}
                    className={`${
                      location.pathname === "/report-export-import-inventory"
                        ? "active"
                        : ""
                    }`}
                  >
                    <i className="fa-solid fa-chevron-right icon-navbar"></i>Báo
                    cáo xuất nhập tồn
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="navBar-menu-item">
            <div className="menu-item-title">
              <p>
                <i className="fa-solid fa-bars-staggered icon-navbar"></i>Danh
                mục
              </p>
              <div className="sub-menu">
                <div className="sub-menu-item">
                  <p
                    onClick={() => navigate("/listAgency")}
                    className={`${
                      location.pathname === "/listAgency" ? "active" : ""
                    }`}
                  >
                    <i className="fa-solid fa-chevron-right icon-navbar"></i>
                    Nguồn hàng xuất/nhập
                  </p>
                  <p
                    onClick={() => navigate("/listProduct")}
                    className={`${
                      location.pathname === "/listProduct" ? "active" : ""
                    }`}
                  >
                    <i className="fa-solid fa-chevron-right icon-navbar"></i>
                    Danh mục hàng hóa
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
