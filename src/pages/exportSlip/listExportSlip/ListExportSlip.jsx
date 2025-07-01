/* eslint-disable */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Pagination } from "antd";

import { searchSupply } from "@/api/suppliesAPI/supply";
import {
  getExportSlipByType,
  searchExportSlip,
  updateStatusExportSlip,
} from "@/api/exportSlipApi/exportSlip";
import { formatCurrency, formatDate } from "@/utils/function/slipFuntion";
import ConfirmDeleteProduct from "@/components/confirmDeleteProduct/ConfirmDeleteProduct";

import "./ListExportSlip.css";
import Layout from "@/components/layout/Layout";
import '@fortawesome/fontawesome-free/css/all.min.css';

const ListExportSlip = () => {
  const navigate = useNavigate();
  const { type } = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [exportSlips, setExportSlips] = useState([]);
  const [total, setTotal] = useState(0);
  const [isRefresh, setIsRefresh] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [infoDelete, setInfoDelete] = useState({
    type: "exportSlip",
    id: "",
  });

  const [inforSearch, setInforSearch] = useState({
    exportSlipCode: "",
    providerId: "",
    status: "",
    timeStart: "",
    timeEnd: "",
  });

  const [listProvider, setListProvider] = useState([]);
  useEffect(() => {
    const getProvider = async () => {
      let res;
      if (type === "Provider") {
        res = await searchSupply("", "", "", "provider", 1, 100);
      } else {
        if (type === "Agency") {
          res = await searchSupply("", "", "", "agency", 1, 100);
        }
      }
      setListProvider(res.supplies);
    };

    getProvider();
  }, [type]);

  useEffect(() => {
    const getListExportSlip = async () => {
      const res = await getExportSlipByType(type, page, limit);
      setExportSlips(res.exportSlip);
      setTotal(res.totalResult);
    };
    getListExportSlip();
  }, [isRefresh, page, type]);

  const handleChangeFieldSearch = (e) => {
    const { name, value } = e.target;
    setInforSearch({
      ...inforSearch,
      [name]: value,
    });
  };

  const handleChangePage = (page) => {
    setPage(page);
  };

  const handleSearch = async () => {
    const data = {
      exportSlipCode: inforSearch.exportSlipCode,
      providerId: inforSearch.providerId,
      status: inforSearch.status,
      timeStart: inforSearch.timeStart
        ? new Date(inforSearch.timeStart).toISOString()
        : "",
      timeEnd: inforSearch.timeEnd
        ? new Date(inforSearch.timeEnd).toISOString()
        : "",
      type: type,
    };

    try {
      let res;
      if (type === "Provider") {
        res = await searchExportSlip(
          data.exportSlipCode,
          data.providerId,
          "",
          "",
          data.status,
          data.timeStart,
          data.timeEnd,
          page,
          limit,
          data.type
        );
      } else {
        if (type === "Agency") {
          res = await searchExportSlip(
            data.exportSlipCode,
            "",
            data.providerId,
            "",
            data.status,
            data.timeStart,
            data.timeEnd,
            page,
            limit,
            data.type
          );
        }
      }
      setExportSlips(res.exportSlips);
      setTotal(res.totalResult);
      setInforSearch({
        exportSlipCode: "",
        providerId: "",
        status: "",
        timeStart: "",
        timeEnd: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStatus = async (exportSlipId, status) => {
    try {
      await updateStatusExportSlip(exportSlipId, status);
      setIsRefresh(!isRefresh);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickPen = (exportSlipId) => {
    navigate(`/inforExportSlip/${exportSlipId}`);
  };

  const handleClickBin = (exportSlipId) => {
    setShowDelete(true);
    setInfoDelete({
      type: "exportSlip",
      id: exportSlipId,
    });
  };

  const handleCancelDelete = () => {
    setShowDelete(false);
  };

  // Function to handle file download
  const handleDownload = async (exportSlipId) => {
    console.log(`Requesting file download for exportSlipId: ${exportSlipId}`);
    const token = localStorage.getItem("token");
    localStorage.setItem('token', token); // Lưu token vào localStorage

    console.log("token: ", token)
    // Kiểm tra nếu không có token
    if (!token) {
      alert("Bạn chưa đăng nhập hoặc token đã hết hạn");
      return;
    }

    try {


      // Gửi yêu cầu GET đúng endpoint
      const res = await fetch(`http://localhost:5789/api/dowload/export/${exportSlipId}?type=txt`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Gửi token trong header
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch the file. Status: ${res.status}`);
      }

      // Nếu nhận về HTML thay vì file => có lỗi
      const contentType = res.headers.get("Content-Type");
      if (contentType && contentType.includes("text/html")) {
        const text = await res.text();
        console.error("Lỗi từ server (HTML):", text);
        throw new Error("Server returned HTML instead of file");
      }

      // Lấy tên file từ Content-Disposition (nếu có)
      const contentDisposition = res.headers.get("Content-Disposition");
      let fileName = `exportSlip_${exportSlipId}.txt`;

      if (contentDisposition && contentDisposition.includes("filename=")) {
        const match = contentDisposition.match(/filename="?([^"]+)"?/);
        if (match && match[1]) {
          fileName = decodeURIComponent(match[1]);
        }
      }

      // Lấy blob từ phản hồi
      const blob = await res.blob();

      // Tạo và nhấp vào link tải
      const link = document.createElement("a");
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Dọn dẹp
    } catch (error) {
      console.error("Error downloading file:", error.message);
      alert("Không thể tải file. Vui lòng thử lại.");
    }
  };


  return (
    <>
      <Layout>
        <div className="container_ListExportSlip">
          <div className="sub_ListExportSlip">
            <div className="sub_1_ListExportSlip">
              <div>
                <span>Mã phiếu</span>
                <input
                  type="text"
                  className="input_ListExportSlip"
                  name="exportSlipCode"
                  value={inforSearch.exportSlipCode}
                  onChange={(e) => handleChangeFieldSearch(e)}
                />
                <span>Nguồn nhận</span>
                <select
                  name="providerId"
                  id=""
                  className="input1_ListExportSlip"
                  value={inforSearch.providerId}
                  onChange={(e) => handleChangeFieldSearch(e)}
                >
                  <option value="">-Chọn nguồn nhận-</option>
                  {listProvider.length > 0 &&
                    listProvider.map((provider) => (
                      <option value={provider._id} key={provider._id}>
                        {provider.providerName || provider.agencyName}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <span>Tình trạng</span>
                <select
                  name="status"
                  id=""
                  className="input2_ListExportSlip"
                  value={inforSearch.status}
                  onChange={(e) => handleChangeFieldSearch(e)}
                >
                  <option value=""></option>
                  <option value="PENDING">Chờ duyệt</option>
                  <option value="DONE">Đã xuất</option>
                  <option value="REJECTED">Từ chối</option>
                  <option value="CONFIRMED">Đã duyệt</option>
                  <option value="RETURNED">Hoàn hàng</option>
                </select>
                <span className="date_ListExportSlip1">Từ ngày</span>
                <input
                  type="date"
                  className="date_ListExportSlip"
                  value={inforSearch.timeStart}
                  name="timeStart"
                  onChange={(e) => handleChangeFieldSearch(e)}
                />
                <span className="date_ListExportSlip2">Đến ngày</span>
                <input
                  type="date"
                  className="date_ListExportSlip3"
                  value={inforSearch.timeEnd}
                  name="timeEnd"
                  onChange={(e) => handleChangeFieldSearch(e)}
                />
              </div>
            </div>
            <div className="sub_2_ListExportSlip" onClick={handleSearch}>
              <span>
                Tìm kiếm <i className="fa fa-search" aria-hidden="true"></i>
              </span>
            </div>
          </div>
          <div
            className="sub_3_ListExportSlip"
            onClick={() => navigate(`/createdExportSlip/${type}`)}
          >
            <p>+ Tạo phiếu xuất kho</p>
          </div>
          <div className="table_ListExportSlip">
            <table className="table2_ListExportSlip">
              <tr className="ListExportSlip_tr">
                <th className="ListExportSlip_th_1">STT</th>
                <th className="ListExportSlip_th">Mã phiếu</th>
                <th className="ListExportSlip_th">Nguồn xuất</th>
                <th className="ListExportSlip_th">Giá trị</th>
                <th className="ListExportSlip_th">Thời gian</th>
                <th className="ListExportSlip_th">Tình trạng</th>
                <th className="ListExportSlip_th">Thao tác</th>
              </tr>
              {exportSlips.length > 0 &&
                exportSlips.map((exportSlip, index) => (
                  <tr className="listExportSlip_tr_2" key={exportSlip._id}>
                    <td className="ListExportSlip_td">
                      {(page - 1) * limit + index + 1}
                    </td>
                    <td className="ListExportSlip_td">
                      {exportSlip.exportSlipCode}
                    </td>
                    <td className="ListExportSlip_td">
                      {" "}
                      {(type === "Provider" &&
                        exportSlip.providerId?.providerName) ||
                        (type === "Agency" && exportSlip.agencyId?.agencyName)}
                    </td>
                    <td className="ListExportSlip_td">
                      {formatCurrency(exportSlip.exportPrice)}
                    </td>
                    <td className="ListExportSlip_td">
                      {formatDate(exportSlip.createdAt)}
                    </td>
                    <td className="ListExportSlip_td">
                      <select
                        className={
                          exportSlip.status === "PENDING"
                            ? "button1_ListExportSlip"
                            : exportSlip.status === "DONE"
                              ? "button2_ListExportSlip"
                              : exportSlip.status === "REJECTED"
                                ? "button3_ListExportSlip"
                                : exportSlip.status === "CONFIRMED"
                                  ? "button_ListExportSlip"
                                  : exportSlip.status === "RETURNED"
                                    ? "button4_ListExportSlip"
                                    : ""
                        }
                        onChange={(e) =>
                          handleUpdateStatus(exportSlip._id, e.target.value)
                        }
                      >
                        <option
                          className={
                            exportSlip.status === "PENDING"
                              ? "button1_ListExportSlip"
                              : exportSlip.status === "DONE"
                                ? "button2_ListExportSlip"
                                : exportSlip.status === "REJECTED"
                                  ? "button3_ListExportSlip"
                                  : exportSlip.status === "CONFIRMED"
                                    ? "button_ListExportSlip"
                                    : exportSlip.status === "RETURNED"
                                      ? "button4_ListExportSlip"
                                      : ""
                          }
                          value={exportSlip.status}
                        >
                          {exportSlip.status === "PENDING"
                            ? "Chờ duyệt"
                            : exportSlip.status === "DONE"
                              ? "Đã xuất"
                              : exportSlip.status === "REJECTED"
                                ? "Từ chối"
                                : exportSlip.status === "CONFIRMED"
                                  ? "Đã duyệt"
                                  : exportSlip.status === "RETURNED"
                                    ? "Hoàn hàng"
                                    : ""}
                        </option>
                        <option
                          className="button1_ListExportSlip"
                          value="PENDING"
                        >
                          Chờ duyệt
                        </option>
                        <option className="button2_ListExportSlip" value="DONE">
                          Đã xuất
                        </option>
                        <option
                          className="button3_ListExportSlip"
                          value="REJECTED"
                        >
                          Từ chối
                        </option>
                        <option
                          className="button_ListExportSlip"
                          value="CONFIRMED"
                        >
                          Đã duyệt
                        </option>
                        <option
                          className="button4_ListExportSlip"
                          value="RETURNED"
                        >
                          Hoàn hàng
                        </option>
                      </select>
                    </td>
                    <td className="purple">
                      <span
                        className="pen_ListExportSlip"
                        onClick={() => handleClickPen(exportSlip._id)}
                      >
                        <i className="fa-solid fa-pen penListExportSlip"></i>
                      </span>

                      <span
                        className="bin_ListExportSlip"
                        onClick={() => handleClickBin(exportSlip._id)}
                      >
                        <i className="fa-solid fa-trash binListExportSlip"></i>
                      </span>

                      <p></p>

                      <span
                        className="download_ListExportSlip"
                        onClick={() => handleDownload(exportSlip._id)} // Trigger the download
                        title="Tải xuống"
                      >
                        <i className="fas fa-download downloadIcon" style={{ fontSize: "16px", color: "#007bff" }}></i>
                      </span>

                    </td>
                  </tr>
                ))}
            </table>
            <Pagination
              total={total}
              pageSize={limit}
              current={page}
              onChange={handleChangePage}
              style={{
                position: "absolute",
                bottom: "50px",
                right: "50px",
                position: "fixed",
              }}
            />
          </div>
        </div>
        {showDelete && (
          <div className="overlay" onClick={handleCancelDelete}>
            <motion.div
              className="itemDelete"
              onClick={(e) => e.stopPropagation()}
              animate={{ opacity: 1, scal: 1 }}
              initial={{ opacity: 0, scal: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <ConfirmDeleteProduct
                type={infoDelete.type}
                onCancel={handleCancelDelete}
                id={infoDelete.id}
                isRefresh={isRefresh}
                setIsRefresh={setIsRefresh}
              />
            </motion.div>
          </div>
        )}
      </Layout>
    </>
  );
};

export default ListExportSlip;
