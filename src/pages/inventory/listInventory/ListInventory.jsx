/* eslint-disable */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";

import {
  getRecordInventories,
  searchRecordInventory,
  updatedStatusRecordInventory,
} from "@/api/recordInventoryApi/recordInventory";
import ConfirmDeleteProduct from "@/components/confirmDeleteProduct/ConfirmDeleteProduct";
import { formatDate } from "@/utils/function/slipFuntion";

import "./ListInventory.css";
import Layout from "@/components/layout/Layout";
const ListInventory = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [isRefresh, setIsRefresh] = useState(false);
  const [searchInfo, setSearchInfo] = useState({
    recordInventoryCode: "",
    status: "",
    timeStart: "",
    timeEnd: "",
  });
  const [showDelete, setShowDelete] = useState(false);
  const [infoDelete, setInfoDelete] = useState({
    type: "recordInventory",
    id: "",
  });
  const [recordInventories, setRecordInventories] = useState([]);

  const navitate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const response = await getRecordInventories(page, limit);
      setRecordInventories(response.recordInventories);
      setTotal(response.totalResult);
    };

    getData();
  }, [isRefresh, page, limit]);

  const handleChangeFiedSearch = (e) => {
    const { name, value } = e.target;
    setSearchInfo({
      ...searchInfo,
      [name]: value,
    });
  };

  const handleSearch = async () => {
    const res = await searchRecordInventory(
      searchInfo.recordInventoryCode,
      searchInfo.status,
      searchInfo.timeStart,
      searchInfo.timeEnd,
      page,
      limit
    );
    setRecordInventories(res.recordInventories);
    setTotal(res.totalResult);
  };

  const handleChangeStatus = async (recordInventoryId, status) => {
    const data = {
      recordInventoryId,
      status,
      userId: localStorage.getItem("userId"),
    };

    await updatedStatusRecordInventory(data);
    setIsRefresh(!isRefresh);
    toast.success("Cập nhật trạng thái thành công");
  };

  const handleChangePage = (page) => {
    setPage(page);
  };

  const handleCancelDelete = () => {
    setShowDelete(false);
  };

  const handleClickBin = (id) => {
    setInfoDelete({
      type: "recordInventory",
      id,
    });
    setShowDelete(true);
  };

  const handleClickPen = (recordInventoryId) => {
    navitate(`/inforInventory/${recordInventoryId}`);
  };

  return (
    <>
      <Layout>
        <div className="container_ListInventory">
          <div className="sub_ListInventory">
            <div className="sub_1_ListInventory">
              <div>
                <span>Mã phiếu</span>
                <input
                  type="text"
                  className="input_ListImportSlip"
                  name="recordInventoryCode"
                  value={searchInfo.recordInventoryCode}
                  onChange={(e) => handleChangeFiedSearch(e)}
                />
                <span>Tình trạng</span>
                <select
                  name="status"
                  className="input2_ListInventory"
                  onChange={(e) => handleChangeFiedSearch(e)}
                  value={searchInfo.status}
                >
                  <option value="">-Chọn tình trạng-</option>
                  <option value="PENDING">Chờ duyệt</option>
                  <option value="REJECTED">Từ chối</option>
                  <option value="CONFIRMED">Đã duyệt</option>
                </select>
              </div>

              <div>
                <span className="date_ListInventory1">Từ ngày</span>
                <input
                  type="date"
                  className="date_ListInventory"
                  name="timeStart"
                  value={searchInfo.timeStart}
                  onChange={(e) => handleChangeFiedSearch(e)}
                />
                <span className="date_ListInventory2">Đến ngày</span>
                <input
                  type="date"
                  className="date_ListInventory3"
                  name="timeEnd"
                  value={searchInfo.timeEnd}
                  onChange={(e) => handleChangeFiedSearch(e)}
                />
              </div>
            </div>
            <div className="sub_2_ListInventory" onClick={handleSearch}>
              <span>
                Tìm kiếm <i className="fa fa-search" aria-hidden="true"></i>
              </span>
            </div>
          </div>
          <div
            className="sub_3_ListInventory"
            onClick={() => navitate("/createdInventory")}
          >
            <p>+ Tạo biên bản kiểm kê</p>
          </div>
          <div className="table_ListInventory">
            <table className="table2_ListInventory">
              <tbody>
                <tr className="ListInventory_tr">
                  <th className="ListInventory_th_1">STT</th>
                  <th className="ListInventory_th_2">Mã biên bản</th>
                  <th className="ListInventory_th_2">Mục đích</th>
                  <th className="ListInventory_th">Thời gian</th>
                  <th className="ListInventory_th">Tình trạng</th>
                  <th className="ListInventory_th">Thao tác</th>
                </tr>
                {recordInventories.length > 0 &&
                  recordInventories.map((recordInventory, index) => (
                    <tr
                      key={recordInventory._id}
                      style={{ backgroundColor: "white" }}
                    >
                      <td className="listinvetory_td">
                        {(page - 1) * limit + index + 1}
                      </td>
                      <td className="listinvetory_td">
                        {recordInventory.recordInventoryCode}
                      </td>
                      <td className="listinvetory_td">
                        {recordInventory.purpose}
                      </td>
                      <td className="listinvetory_td">
                        {formatDate(recordInventory.recordInventoryDate)}
                      </td>
                      <td className="listinvetory_td">
                        <select
                          className={
                            recordInventory.status === "PENDING"
                              ? "button1_ListInventory"
                              : recordInventory.status === "REJECTED"
                              ? "button3_ListInventory"
                              : "button_ListInventory"
                          }
                          onChange={(e) =>
                            handleChangeStatus(
                              recordInventory._id,
                              e.target.value
                            )
                          }
                        >
                          <option
                            className={
                              recordInventory.status === "PENDING"
                                ? "button1_ListInventory"
                                : recordInventory.status === "REJECTED"
                                ? "button3_ListInventory"
                                : "button_ListInventory"
                            }
                            value={recordInventory.status}
                          >
                            {recordInventory.status === "PENDING"
                              ? "Chờ duyệt"
                              : recordInventory.status === "CONFIRMED"
                              ? "Đã duyệt"
                              : "Từ chối"}
                          </option>
                          <option
                            className="button1_ListInventory"
                            value="PENDING"
                          >
                            Chờ duyệt
                          </option>
                          <option
                            className="button_ListInventory"
                            value="CONFIRMED"
                          >
                            Đã duyệt
                          </option>
                          <option
                            className="button3_ListInventory"
                            value="REJECTED"
                          >
                            Từ chối
                          </option>
                        </select>
                      </td>
                      <td className="purple">
                        <span
                          className="pen_ListImportSlip"
                          onClick={() => handleClickPen(recordInventory._id)}
                        >
                          <i
                            className="fa-solid fa-pen"
                            style={{ color: "blue", fontSize: "20px" }}
                          ></i>
                        </span>
                        <span
                          className="bin_ListImportSlip"
                          onClick={() => handleClickBin(recordInventory._id)}
                        >
                          <i
                            className="fa-solid fa-trash"
                            style={{ color: "red", fontSize: "20px" }}
                          ></i>
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

export default ListInventory;
