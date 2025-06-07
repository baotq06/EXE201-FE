/* eslint-disable */
import React, { useEffect, useState } from "react";

import "./CreatedAgency.css";
import { useNavigate } from "react-router-dom";
import { createdSupply } from "@/api/suppliesAPI/supply";
import { toast } from "react-toastify";
import Layout from "@/components/layout/Layout";
const CreatedAgency = () => {

  const navigate = useNavigate();

  const [supply, setSupply] = useState({
    supplyCode: `${Math.floor(Math.random() * 1000000)}`,
    supplyName: "",
    supplyType: "",
    supplyAddress: "",
    supplyPhone: "",
    supplyEmail: "",
    supplyRepresentative: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupply({
      ...supply,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const data = {
        code: supply.supplyCode,
        name: supply.supplyName,
        address: supply.supplyAddress,
        phone: supply.supplyPhone,
        email: supply.supplyEmail,
        representative: supply.supplyRepresentative,
        type: supply.supplyType,
      };
      await createdSupply(data);
      toast.success("Thêm nguồn hàng thành công");
      navigate('/listAgency');
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      throw error;
    }
  };

  return (
    <div>
      <Layout>
        <div className="main-CreatedAgency">
          <div className="body-CreatedAgency">
            <div className="breadcrumb">
              <p
                className="title-createdAgency"
                onClick={() => navigate("/listAgency")}
                style={{ cursor: "pointer" }}
              >
                Quản lý nguồn hàng xuất/nhập
              </p>
              <span className="title-createdAgency">&gt;</span>
              <p className="title-createdAgency">Thêm loại nguồn</p>
            </div>
            <div className="content-container-agency">
              <div className="title-bar-agency">Thêm mới nguồn</div>

              <div className="form-container">
                <div className="form-group-created-agency">
                  <label className="form-label">Mã nguồn</label>
                  <input
                    type="text"
                    name="supplyCode"
                    value={supply.supplyCode}
                    className="form-input"
                    readOnly
                  />
                </div>

                <div className="form-group-created-agency">
                  <label className="form-label">Tên nguồn</label>
                  <input
                    type="text"
                    name="supplyName"
                    value={supply.supplyName}
                    className="form-input"
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group-created-agency">
                  <label className="form-label">Loại nguồn</label>
                  <select
                    name="supplyType"
                    value={supply.supplyType}
                    onChange={handleChange}
                    id=""
                    className="form-input"
                    required
                  >
                    <option value="">-Loại nguồn-</option>
                    <option value="provider">Nhà cung cấp</option>
                    <option value="agency">Đại lý</option>
                  </select>
                </div>

                <div className="form-group-created-agency">
                  <label className="form-label">Địa chỉ</label>
                  <input
                    type="text"
                    name="supplyAddress"
                    value={supply.supplyAddress}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group-created-agency">
                  <label className="form-label">Số điện thoại</label>
                  <input
                    type="text"
                    name="supplyPhone"
                    value={supply.supplyPhone}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group-created-agency">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    name="supplyEmail"
                    value={supply.supplyEmail}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group-created-agency">
                  <label className="form-label">Người đại diện</label>
                  <input
                    type="text"
                    name="supplyRepresentative"
                    value={supply.supplyRepresentative}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                {/* <div className="form-group-created-agency">
                <label className="form-label">Thêm thông tin (Nếu có)</label>
                <textarea
                  type="text"
                  name=""
                  className="form-input"
                  rows={5}
                ></textarea>
              </div> */}

                <div className="button-group">
                  <button
                    className="save-btn"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Lưu
                  </button>
                  <button
                    className="cancel-btn"
                    onClick={() => navigate("/listAgency")}
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default CreatedAgency;
