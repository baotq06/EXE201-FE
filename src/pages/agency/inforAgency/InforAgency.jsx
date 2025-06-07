/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./InforAgency.css";
import { getSupplyById } from "@/api/suppliesAPI/supply";
import Layout from "@/components/layout/Layout";

const InforAgency = () => {
  const [supply, setSupply] = useState({});

  const { type, supplyId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const getSupplyInfo = async () => {
      const res = await getSupplyById(type, supplyId);
      if (type === "agency") {
        setSupply(res.agency);
      } else {
        setSupply(res.provider);
      }
    };

    getSupplyInfo();
  }, []);
  return (
    <>
      <Layout>
        <div className="inforAgency">
          <div className="inforAgency-nav">
            <p onClick={() => navigate("/listAgency")}>
              Quản lý nguồn hàng nhập/xuất {">"}{" "}
            </p>
            <p>Xem nguồn hàng</p>
          </div>
          {/* <div className="updateAgency-btn">
          <div className="btn">Cập nhật thông tin</div>
        </div> */}
          <div className="inforAgency-form">
            <div className="inforAgency-form-title">
              <div>Thông tin nguồn</div>
              <div
                className="close-btn"
                onClick={() => navigate("/listAgency")}
              >
                X
              </div>
            </div>
            <div className="inforAgency-form-main">
              <div className="inforAgency-form-row">
                <label htmlFor="agencyID" className="inforAgency-lbl">
                  Mã nguồn
                </label>
                <div id="agencyID" name="agencyID" className="inforBox">
                  {supply.providerCode || supply.agencyCode}
                </div>
              </div>

              <div className="inforAgency-form-row">
                <label htmlFor="agencyName" className="inforAgency-lbl">
                  Tên nguồn
                </label>
                <div id="agencyName" name="agencyName" className="inforBox">
                  {supply.providerName || supply.agencyName}
                </div>
              </div>

              <div className="inforAgency-form-row">
                <label htmlFor="agencyType" className="inforAgency-lbl">
                  Loại nguồn
                </label>
                <div id="agencyType" name="agencyType" className="inforBox">
                  {type === "provider" ? "Nhà cung cấp" : "Đại lý"}
                </div>
              </div>

              <div className="inforAgency-form-row">
                <label htmlFor="agencyManager" className="inforAgency-lbl">
                  Người đại diện
                </label>
                <div
                  id="agencyManager"
                  name="agencyManager"
                  className="inforBox"
                >
                  {supply.representative}
                </div>
              </div>

              <div className="inforAgency-form-row">
                <label htmlFor="agencyAddress" className="inforAgency-lbl">
                  Địa chỉ
                </label>
                <div
                  id="agencyAddress"
                  name="agencyAddress"
                  className="inforBox"
                >
                  {supply.providerAddress || supply.agencyAddress}
                </div>
              </div>

              <div className="inforAgency-form-row">
                <label htmlFor="agencyPhone" className="inforAgency-lbl">
                  Số điện thoại
                </label>
                <div id="agencyPhone" name="agencyPhone" className="inforBox">
                  {supply.providerPhone || supply.agencyPhone}
                </div>
              </div>

              <div className="inforAgency-form-row">
                <label htmlFor="agencyEmail" className="inforAgency-lbl">
                  Email
                </label>
                <div id="agencyEmail" name="agencyEmail" className="inforBox">
                  {supply.providerEmail || supply.agencyEmail}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default InforAgency;
