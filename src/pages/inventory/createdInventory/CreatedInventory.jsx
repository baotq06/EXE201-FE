/* eslint-disable */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { searchSupply } from "@/api/suppliesAPI/supply";
import { createdRecordInventory } from "@/api/recordInventoryApi/recordInventory";
import { formatCurrency } from "@/utils/function/slipFuntion";
import DLFromLocal from "@/components/downloadProduct/downloadProductFromLocal/DLFromLocal";

import "./CreatedInventory.css";
import Layout from "@/components/layout/Layout";
const CreatedInventory = () => {
  const [agencies, setAgencies] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [showUploadFromLocal, setShowUploadFromLocal] = useState(false);
  const [recordInventory, setRecordInventory] = useState({
    recordInventoryCode: `BBKK${Math.floor(Math.random() * 1000000)}`,
    recordInventoryDate: "",
    agencyId: "",
    purpose: "",
    userId: "",
    products: [],
  });

  const navigate = useNavigate();
  useEffect(() => {
    const getAgencies = async () => {
      const res = await searchSupply("", "", "", "agency", 1, 100);
      setAgencies(res.supplies);
    };

    getAgencies();
  }, []);

  useEffect(() => {
    setRecordInventory({
      ...recordInventory,
      products: selectedProducts.map((product) => ({
        productId: product._id,
        numberOfSystem: product.productQuantityRemaining,
        numberOfReality: 0,
        difference: product.productQuantityRemaining,
        solution: "",
      })),
    });
  }, [isRefresh]);

  const handleChangeFied = (e) => {
    const { name, value } = e.target;
    setRecordInventory({
      ...recordInventory,
      [name]: value,
    });
  };

  const handleCancelUploadLocal = () => {
    setShowUploadFromLocal(false);
  };

  const handleChangeInput = (e, productId) => {
    const { name, value } = e.target;
    setRecordInventory((prev) => ({
      ...prev,
      products: prev.products.map((product) => {
        if (product.productId === productId) {
          if (name === "numberOfReality") {
            return {
              ...product,
              numberOfReality: +value,
              difference: Math.abs(product.numberOfSystem - value),
            };
          }
          if (name === "solution") {
            return {
              ...product,
              solution: value,
            };
          }
        }
        return product;
      }),
    }));
  };

  const handleCountDifference = () => {
    let count = 0;
    if (recordInventory.products?.length > 0) {
      recordInventory.products?.forEach((item) => {
        count += +item.difference;
      });
    }
    return count;
  };

  const handleSubmit = async () => {
    const data = {
      recordInventoryCode: recordInventory.recordInventoryCode,
      recordInventoryDate: recordInventory.recordInventoryDate,
      agencyId: recordInventory.agencyId,
      purpose: recordInventory.purpose,
      userId: localStorage.getItem("userId"),
      products: recordInventory.products,
    };

    try {
      await createdRecordInventory(data);
      toast.success("Tạo mới biên bản kiểm kê hàng hóa thành công");
      navigate("/listInventory");
    } catch (error) {
      toast.error("Tạo mới biên bản kiểm kê hàng hóa thất bại");
      console.log(error);
    }
  };

  const handleCancelCreate = () => {
    setSelectedProducts([]);
    setRecordInventory({});
    navigate("/listInventory");
  };
  return (
    <>
      <Layout>
        <div className="CreatedInventory-body">
          <div className="cis-address">
            <p>
              <span onClick={() => navigate("/listInventory")}>
                Danh sách biên bản kiểm kê hàng hóa
              </span>
              <span>
                <i
                  className="fa-solid fa-chevron-right"
                  style={{ color: "black" }}
                ></i>
              </span>{" "}
              Tạo mới phiếu nhập kho{" "}
            </p>
          </div>
          <div
            className="cis-addbutton"
            onClick={() => setShowUploadFromLocal(true)}
          >
            <button>+Thêm hàng từ hệ thống</button>
          </div>
          <div className="cis-frame">
            <div className="cis-title">BẢN KIỂM KÊ HÀNG HÓA</div>
            <div className="cis-info">
              <div className="i-title">Thông tin chung</div>
              <div className="i-line1">
                <div className="i-o">
                  <div className="i-name">Kiểm kê tại kho</div>
                  <select
                    name="agencyId"
                    id="source"
                    onChange={(e) => handleChangeFied(e)}
                  >
                    <option value="">Chọn kho</option>
                    {agencies.map((agency) => (
                      <option key={agency._id} value={agency._id}>
                        {agency.agencyName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="i-o">
                  <div className="date_CreatedInventory2">Ngày kiểm</div>
                  <input
                    type="date"
                    className="date_CreatedInventory"
                    name="recordInventoryDate"
                    value={recordInventory.recordInventoryDate}
                    onChange={(e) => handleChangeFied(e)}
                  />
                </div>
              </div>
              <div className="i-line4">
                <div className="i-name_1"></div>
                Mục đích
                <textarea
                  typeof="text"
                  name="purpose"
                  value={recordInventory.purpose}
                  onChange={(e) => handleChangeFied(e)}
                  style={{ padding: "10px" }}
                ></textarea>
              </div>
            </div>
            <div className="CreatedInventory-table">
              <table className="CreatedInventory-data">
                <tbody>
                  <tr>
                    <th className="listProduct_th" rowSpan={2}>
                      STT
                    </th>
                    <th className="listProduct_th" rowSpan={2}>
                      Tên hàng hoá
                    </th>
                    <th className="listProduct_th" rowSpan={2}>
                      Mã hàng
                    </th>
                    <th className="listProduct_th" rowSpan={2}>
                      Đơn vị <div>tính</div>
                    </th>
                    <th className="listProduct_th" rowSpan={2}>
                      Đơn giá
                    </th>
                    <th className="listProduct_th" colSpan={3}>
                      Số Lượng
                    </th>
                    <th className="listProduct_th" rowSpan={2}>
                      Xử lý
                    </th>
                  </tr>
                  <tr>
                    <th className="listProduct_th">
                      Theo hệ <div>thống</div>
                    </th>
                    <th className="listProduct_th">
                      Theo <div>kiểm kê</div>
                    </th>
                    <th className="listProduct_th">
                      Chênh <div>Lệch</div>
                    </th>
                  </tr>

                  {selectedProducts.length > 0 &&
                    selectedProducts.map((product, index) => (
                      <tr key={product._id}>
                        <td>{index + 1}</td>
                        <td>{product.productName}</td>
                        <td>{product.productCode}</td>
                        <td>{product.productDVT}</td>
                        <td>{formatCurrency(product.productPrice)}</td>
                        <td>{product.productQuantityRemaining}</td>
                        <td>
                          <input
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              border: "none",
                            }}
                            type="number"
                            name="numberOfReality"
                            onChange={(e) => handleChangeInput(e, product._id)}
                          />
                        </td>
                        <td>
                          {recordInventory.products?.length > 0 && (
                            <span>
                              {
                                recordInventory.products.find(
                                  (item) => item.productId === product._id
                                )?.difference
                              }
                            </span>
                          )}
                        </td>
                        <td>
                          <textarea
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              border: "none",
                            }}
                            name="solution"
                            onChange={(e) => handleChangeInput(e, product._id)}
                          />
                        </td>
                      </tr>
                    ))}
                  <tr className="tr_infim">
                    <th className="sum_inf_1" colSpan={8}>
                      Tổng
                      <span className="count_inf">
                        {handleCountDifference()}
                      </span>
                    </th>
                    <th className="sum_inf_2"></th>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="cis-button">
              <button className="cis-cancel" onClick={handleCancelCreate}>
                Huỷ
              </button>
              <button className="cis-save" type="submit" onClick={handleSubmit}>
                Lưu
              </button>
            </div>
          </div>
        </div>
        {showUploadFromLocal && (
          <div className="overlay" onClick={handleCancelUploadLocal}>
            <motion.div
              className="item-upload"
              onClick={(e) => e.stopPropagation()}
              animate={{ opacity: 1, scal: 1 }}
              initial={{ opacity: 0, scal: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <DLFromLocal
                onCancel={handleCancelUploadLocal}
                selectedProducts={selectedProducts}
                setSelectedProducts={setSelectedProducts}
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

export default CreatedInventory;
