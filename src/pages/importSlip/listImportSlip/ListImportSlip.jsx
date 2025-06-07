/* eslint-disable */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { Pagination } from "antd";

import { searchSupply } from "@/api/suppliesAPI/supply";
import { getImportSlipByType, searchImportSlip, updateStatusImportSlip } from "@/api/importSlipApi/importSlip";
import { formatCurrency, formatDate } from "@/utils/function/slipFuntion";
import ConfirmDeleteProduct from "@/components/confirmDeleteProduct/ConfirmDeleteProduct";

import "./ListImportSlip.css";
import Layout from "@/components/layout/Layout";

const ListImportSlip = () => {
  const { type } = useParams();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [importSlips, setImportSlips] = useState([]);
  const [total, setTotal] = useState(0);
  const [isRefresh, setIsRefresh] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [infoDelete, setInfoDelete] = useState({
    type: "importSlip",
    id: "",
  });

  const [inforSearch, setInforSearch] = useState({
    importSlipCode: "",
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

  const navigate = useNavigate();

  useEffect(() => {
    const getListImportSlip = async () => {
      const res = await getImportSlipByType(type, page, limit);
      setImportSlips(res.importSlip);
      setTotal(res.totalResult);
    };
    getListImportSlip();
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
      importSlipCode: inforSearch.importSlipCode,
      providerId: inforSearch.providerId,
      status: inforSearch.status,
      timeStart: inforSearch.timeStart ? new Date(inforSearch.timeStart).toISOString() : "",
      timeEnd: inforSearch.timeEnd ? new Date(inforSearch.timeEnd).toISOString() : "",
      type: type,
    };

    try {
      let res;
      if (type === "Provider") {
        res = await searchImportSlip(data.importSlipCode, data.providerId, "", "", data.status, data.timeStart, data.timeEnd, page, limit, data.type);
      } else {
        if (type === "Agency") {
          res = await searchImportSlip(data.importSlipCode, "", data.providerId, "", data.status, data.timeStart, data.timeEnd, page, limit, data.type);
        }
      }
      setImportSlips(res.importSlips);
      setTotal(res.totalResult);
      setInforSearch({
        importSlipCode: "",
        providerId: "",
        status: "",
        timeStart: "",
        timeEnd: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateStatus = async (importSlipId, status) => {
    try {
      await updateStatusImportSlip(importSlipId, status);
      setIsRefresh(!isRefresh);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickPen = (importSlipId) => {
    navigate(`/inforImportSlip/${importSlipId}`);
  };

  const handleClickBin = (importSlipId) => {
    setShowDelete(true);
    setInfoDelete({
      type: "importSlip",
      id: importSlipId,
    });
  };

  const handleCancelDelete = () => {
    setShowDelete(false);
  };

  return (
    <>
      <Layout>
        <div className="container_ListImportSlip">
          <div className="sub_ListImportSlip">
            <div className="sub_1_ListImportSlip">
              <div>
                <span>Mã phiếu</span>
                <input
                  type="text"
                  className="input_ListImportSlip"
                  value={inforSearch.importSlipCode}
                  name="importSlipCode"
                  onChange={(e) => handleChangeFieldSearch(e)}
                />
                <span>Nguồn xuất</span>
                <select
                  name="providerId"
                  className="input1_ListImportSlip"
                  value={inforSearch.providerId}
                  onChange={(e) => handleChangeFieldSearch(e)}
                >
                  <option value="">-Chọn nguồn xuất</option>
                  {listProvider.length > 0 &&
                    listProvider.map((provider) => (
                      <option value={provider._id} key={provider._id}>
                        {(type === "Provider" && provider?.providerName) ||
                          (type === "Agency" && provider?.agencyName)}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <span>Tình trạng</span>
                <select
                  name="status"
                  value={inforSearch.status}
                  onChange={(e) => handleChangeFieldSearch(e)}
                  className="input2_ListImportSlip"
                >
                  <option value=""></option>
                  <option value="PENDING">Chờ duyệt</option>
                  <option value="DONE">Đã nhập</option>
                  <option value="REJECTED">Từ chối</option>
                  <option value="CONFIRMED">Đã duyệt</option>
                </select>
                <span className="date_ListImportSlip1">Từ ngày</span>
                <input
                  type="date"
                  className="date_ListImportSlip"
                  placeholder=""
                  name="timeStart"
                  value={inforSearch.timeStart}
                  onChange={(e) => handleChangeFieldSearch(e)}
                />
                <span className="date_ListImportSlip2">Đến ngày</span>
                <input
                  type="date"
                  className="date_ListImportSlip3"
                  placeholder=""
                  name="timeEnd"
                  value={inforSearch.timeEnd}
                  onChange={(e) => handleChangeFieldSearch(e)}
                />
              </div>
            </div>
            <div
              className="sub_2_ListImportSlip"
              onClick={handleSearch}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span>
                Tìm kiếm <i className="fa fa-search" aria-hidden="true"></i>
              </span>
            </div>
          </div>
          <div className="sub_3_ListImportSlip">
            <p onClick={() => navigate(`/createdImportSlip/${type}`)}>
              + Tạo phiếu nhập kho
            </p>
          </div>
          <div className="table_ListImportSlip">
            <table className="table2_ListImportSlip">
              <tbody>
                <tr className="ListImportSlip_tr">
                  <th className="ListImportSlip_th_1">STT</th>
                  <th className="ListImportSlip_th">Mã phiếu</th>
                  <th className="ListImportSlip_th">Nguồn nhập</th>
                  <th className="ListImportSlip_th">Giá trị</th>
                  <th className="ListImportSlip_th">Thời gian</th>
                  <th className="ListImportSlip_th">Tình trạng</th>
                  <th className="ListImportSlip_th">Thao tác</th>
                </tr>
                {importSlips.length > 0 &&
                  importSlips.map((importSlip, index) => (
                    <tr className="listImportSlip_tr_2" key={importSlip._id}>
                      <td className="ListImportSlip_td">
                        {(page - 1) * limit + index + 1}
                      </td>
                      <td className="ListImportSlip_td">
                        {importSlip.importSlipCode}
                      </td>
                      <td className="ListImportSlip_td">
                        {(type === "Provider" &&
                          importSlip.providerId?.providerName) ||
                          (type === "Agency" &&
                            importSlip.agencyId?.agencyName)}
                      </td>
                      <td className="ListImportSlip_td">
                        {formatCurrency(importSlip.importPrice || 0)}
                      </td>
                      <td className="ListImportSlip_td">
                        {formatDate(importSlip.createdAt)}
                      </td>
                      <td className="ListImportSlip_td">
                        <select
                          className={
                            importSlip.status === "PENDING"
                              ? "button1_ListImportSlip"
                              : importSlip.status === "DONE"
                              ? "button2_ListImportSlip"
                              : importSlip.status === "REJECTED"
                              ? "button3_ListImportSlip"
                              : importSlip.status === "CONFIRMED"
                              ? "button_ListImportSlip"
                              : ""
                          }
                          onChange={(e) =>
                            handleUpdateStatus(importSlip._id, e.target.value)
                          }
                        >
                          <option
                            className={
                              importSlip.status === "PENDING"
                                ? "button1_ListImportSlip"
                                : importSlip.status === "DONE"
                                ? "button2_ListImportSlip"
                                : importSlip.status === "REJECTED"
                                ? "button3_ListImportSlip"
                                : importSlip.status === "CONFIRMED"
                                ? "button_ListImportSlip"
                                : ""
                            }
                            value={importSlip.status}
                          >
                            {importSlip.status === "PENDING"
                              ? "Chờ duyệt"
                              : importSlip.status === "DONE"
                              ? "Đã nhập"
                              : importSlip.status === "REJECTED"
                              ? "Từ chối"
                              : importSlip.status === "CONFIRMED"
                              ? "Đã duyệt"
                              : ""}
                          </option>
                          <option
                            className="button1_ListImportSlip"
                            value="PENDING"
                          >
                            Chờ duyệt
                          </option>
                          <option
                            className="button2_ListImportSlip"
                            value="DONE"
                          >
                            Đã nhập
                          </option>
                          <option
                            className="button3_ListImportSlip"
                            value="REJECTED"
                          >
                            Từ chối
                          </option>
                          <option
                            className="button_ListImportSlip"
                            value="CONFIRMED"
                          >
                            Đã duyệt
                          </option>
                        </select>
                      </td>
                      <td className="purple">
                        <span
                          className="pen_ListImportSlip"
                          onClick={() => handleClickPen(importSlip._id)}
                        >
                          <i className="fa-solid fa-pen penListImportSlip"></i>
                        </span>
                        <span
                          className="bin_ListImportSlip"
                          onClick={() => handleClickBin(importSlip._id)}
                        >
                          <i className="fa-solid fa-trash binListImportSlip"></i>
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
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

export default ListImportSlip;
