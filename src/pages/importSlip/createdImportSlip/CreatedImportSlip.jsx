/* eslint-disable */
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

import recycle from "../../../assets/images/bin.png";
import { searchSupply } from "@/api/suppliesAPI/supply";
import { createdContract } from "@/api/contractApi/contract";
import { createdImportSlip } from "@/api/importSlipApi/importSlip";

import "./CreatedImportSlip.css";
import { formatCurrency } from "@/utils/function/slipFuntion";
import DLFromLocal from "@/components/downloadProduct/downloadProductFromLocal/DLFromLocal";
import Layout from "@/components/layout/Layout";

const CreatedImportSlip = () => {
  const { type } = useParams();
  const [showUploadFromLocal, setShowUploadFromLocal] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [fileNames, setFileNames] = useState([]);
  const [listProvider, setListProvider] = useState([]);
  const [providerInfor, setProviderInfor] = useState({
    providerCode: "",
    providerPhone: "",
    providerAddress: "",
  });

  const [isRefresh, setIsRefresh] = useState(false);

  const user = useSelector((state) => state.user);
  const [newImportSlip, setNewImportSlip] = useState({
    importSlipCode: `PNK${Math.floor(Math.random() * 1000000)}`,
    providerId: "",
    userId: user._id,
    status: "PENDING",
    products: [],
    newProducts: [],
    contracts: "",
    type: type,
    reason: "",
    importPrice: "0",
  });

  const [contract, setContract] = useState({
    contractContent: "",
    contractMedia: [],
  });

  const navigate = useNavigate();

  const handleCancelUploadLocal = () => {
    setShowUploadFromLocal(false);
  };

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
    setNewImportSlip({
      ...newImportSlip,
      products: selectedProducts.map((product) => ({
        productId: product._id,
        quantity: 0,
        discount: 0,
      })),
    });
  }, [isRefresh]);

  const handleChangeProvider = (e) => {
    const { name, value } = e.target;
    setNewImportSlip({ ...newImportSlip, [name]: value });

    const provider = listProvider.find((p) => p._id === value);
    if (provider) {
      setProviderInfor({
        providerCode: provider.providerCode || provider.agencyCode,
        providerPhone: provider.providerPhone || provider.agencyPhone,
        providerAddress: provider.providerAddress || provider.agencyAddress,
      });
    }
  };

  const handleChangeField = (e, productId) => {
    const { name, value } = e.target;

    if (name === "quantity") {
      setNewImportSlip((prev) => ({
        ...prev,
        products: prev.products.map((p) => {
          if (p.productId === productId) {
            return { ...p, quantity: parseInt(value) || 0 };
          }
          return p;
        }),
      }));
    }

    if (name === "discount") {
      const discountValue = value.replace("%", "");
      const newDiscount = parseInt(discountValue) || 0;
      setNewImportSlip((prev) => ({
        ...prev,
        products: prev.products.map((p) => {
          if (p.productId === productId) {
            return { ...p, discount: newDiscount };
          }
          return p;
        }),
      }));
    }
  };

  const calculateLineTotal = (product) => {
    const item = newImportSlip.products.find(
      (p) => p.productId === product._id
    );
    if (item) {
      return +product.productPrice * item.quantity * (1 - item.discount / 100);
    } else {
      return 0;
    }
  };

  const calculateTotalPrice = useMemo(() => {
    return newImportSlip.products.reduce((total, product) => {
      const productPrice = selectedProducts.find(
        (p) => p._id === product.productId
      )?.productPrice;
      return (
        total + +productPrice * product.quantity * (1 - product.discount / 100)
      );
    }, 0);
  }, [newImportSlip.products, selectedProducts]);

  useEffect(() => {
    setNewImportSlip((prev) => ({
      ...prev,
      importPrice: `${calculateTotalPrice}`,
    }));
  }, [calculateTotalPrice]);

  const handleFileChange = (e) => {
    const selectedFile = Array.from(e.target.files);
    const newRawFile = [...contract.contractMedia, ...selectedFile];
    setContract({ ...contract, contractMedia: newRawFile });
    setFileNames([...fileNames, ...selectedFile.map((file) => file.name)]);
  };

  const handleChangeFileNameContract = (e) => {
    const updateFileNames = e.target.value.split(", ").map((name) => name);
    const removeFiles = fileNames.filter(
      (name) => !updateFileNames.includes(name)
    );

    const updateContractMedia = contract.contractMedia.filter(
      (file) => !removeFiles.includes(file.name)
    );
    setContract({ ...contract, contractMedia: updateContractMedia });
  };

  const handleSubmit = async () => {
    try {
      const newContract = await createdContract(contract);
      const data = {
        ...newImportSlip,
        contracts: newContract.newContract._id,
      };
      if (!data.newProducts || data.newProducts.length === 0) {
        delete data.newProducts;
      }

      await createdImportSlip(data);
      toast.success("Tạo phiếu nhập kho thành công");
      navigate(`/listImportSlip/${type}`);
    } catch (error) {
      console.log(error);
      toast.error("Tạo phiếu nhập kho thất bại");
    }
  };

  const handleCancelCreateImportSlip = () => {
    navigate(`/listImportSlip/${type}`);
  };
  return (
    <>
      <Layout>
        <div className="main-container">
          <div className="content-container-createdImportSlip">
            <div className="right-content">
              <div className="navigation-path">
                <span onClick={() => navigate(`/listImportSlip/${type}`)}>
                  Xuất - nhập với{" "}
                  {(type === "Provider" && "NCC") ||
                    (type === "Agency" && "Nội bộ")}
                </span>
                &gt; Tạo mới phiếu nhập kho
              </div>

              <div className="action-buttons">
                <button className="add-button external">
                  + Thêm hàng từ file ngoài
                </button>
                <button
                  className="add-button system"
                  onClick={() => setShowUploadFromLocal(true)}
                >
                  + Thêm hàng từ hệ thống
                </button>
              </div>

              <div className="form-container-createdImport">
                <h2 className="form-title">PHIẾU NHẬP KHO</h2>

                <div className="form-section">
                  <div className="info-section">
                    <h3>Thông tin chung</h3>
                    <div className="form-grid">
                      <div className="form-group-create">
                        <label>Nguồn xuất</label>
                        <select
                          className="nguon-xuat"
                          name="providerId"
                          onChange={handleChangeProvider}
                        >
                          <option value="">-Chọn nguồn xuất-</option>
                          {listProvider.length > 0 &&
                            listProvider.map((provider) => (
                              <option key={provider._id} value={provider._id}>
                                {provider.providerName || provider.agencyName}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Mã phiếu</label>
                        <input
                          name="idSlip"
                          style={{ backgroundColor: "darkgray" }}
                          value={newImportSlip.importSlipCode}
                          readOnly
                        />
                      </div>
                      <div className="form-group short-input">
                        <label>Mã nguồn</label>
                        <input
                          style={{
                            width: "100%",
                            height: "40px",
                            paddingLeft: "10px",
                          }}
                          name="providerCode"
                          value={providerInfor.providerCode}
                          readOnly
                        />
                      </div>
                      <div className="form-group short-input">
                        <label>Số điện thoại</label>
                        <input
                          type="text"
                          value={providerInfor.providerPhone}
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label>Địa chỉ</label>
                        <textarea
                          rows="5"
                          value={providerInfor.providerAddress}
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label>Lý do nhập</label>
                        <textarea
                          rows="5"
                          value={newImportSlip.reason}
                          name="reason"
                          onChange={(e) =>
                            setNewImportSlip({
                              ...newImportSlip,
                              reason: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className="table-section">
                    <table>
                      <thead>
                        <tr>
                          <th>STT</th>
                          <th>Tên hàng hóa</th>
                          <th>Mã hàng</th>
                          <th>Đơn vị tính</th>
                          <th>Đơn giá</th>
                          <th>Số lượng</th>
                          <th>Chiết khấu</th>
                          <th>Thành tiền</th>
                          <th>Xóa</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProducts.length > 0 &&
                          selectedProducts.map((product, index) => (
                            <tr key={product._id}>
                              <td>{index + 1}</td>
                              <td>{product.productName}</td>
                              <td>{product.productCode}</td>
                              <td>{product.productDVT}</td>
                              <td>{formatCurrency(product.productPrice)}</td>
                              <td>
                                <input
                                  type="number"
                                  name="quantity"
                                  onChange={(e) =>
                                    handleChangeField(e, product._id)
                                  }
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    border: "none",
                                  }}
                                  placeholder="nhập số lượng"
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  name="discount"
                                  onChange={(e) =>
                                    handleChangeField(e, product._id)
                                  }
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    border: "none",
                                  }}
                                  placeholder="nhập % chiết khấu"
                                />
                              </td>
                              <td>
                                {formatCurrency(calculateLineTotal(product))}
                              </td>
                              <td>
                                <button className="delete-button">
                                  <img src={recycle} alt="" className="bin" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        <tr className="total-row">
                          <td colSpan="7">Tổng</td>
                          <td>{formatCurrency(calculateTotalPrice)}</td>
                          <td></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="attachment-section">
                    <div className="contract-section">
                      <h3>Hợp đồng</h3>
                      <div className="upload-group">
                        <div className="form-group">
                          <label>Nội dung</label>
                          <input
                            type="text"
                            onChange={(e) =>
                              setContract({
                                ...contract,
                                contractContent: e.target.value,
                              })
                            }
                          />
                        </div>
                        <br />
                        <div className="form-group-upload">
                          <label>Hình ảnh</label>
                          <div className="input-upload">
                            <input
                              className="input-file-name"
                              type="url"
                              value={fileNames.join(", ")}
                              onChange={(e) => handleChangeFileNameContract(e)}
                            />

                            <label style={{ width: "40px", height: "40px" }}>
                              <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                multiple
                                onChange={handleFileChange}
                              />
                              <i className="fa-solid fa-cloud-arrow-up"></i>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="button-section">
                    <button
                      className="cancel-button"
                      onClick={handleCancelCreateImportSlip}
                    >
                      Hủy
                    </button>
                    <button
                      className="save-button"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Lưu
                    </button>
                  </div>
                </div>
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
        </div>
      </Layout>
    </>
  );
};

export default CreatedImportSlip;
