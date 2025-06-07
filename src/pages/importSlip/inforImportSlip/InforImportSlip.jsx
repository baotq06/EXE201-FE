/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./InforImportSlip.css";
import { getImportSlipById } from "@/api/importSlipApi/importSlip";
import { formatCurrency, formatDate } from "@/utils/function/slipFuntion";
import Layout from "@/components/layout/Layout";
const InforImportSlip = () => {
  const [importSlip, setImportSlip] = useState({});
  const [type, setType] = useState("");

  const { importSlipId } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    const getImportSlip = async () => {
      const res = await getImportSlipById(importSlipId);
      if (res.importSlip.agencyId?._id) {
        setType("Agency");
      } else {
        if (res.importSlip.providerId?._id) {
          setType("Provider");
        }
      }
      console.log(res.importSlip);
      setImportSlip(res.importSlip);
    };

    getImportSlip();
  }, [importSlipId]);

  const calculateLineTotal = (product) => {
    return (
      product.productId?.productPrice *
      product.quantity *
      (1 - product.discount / 100)
    );
  };

  return (
    <>
      <Layout>
        <div className="container_infim">
          <div className="lef_infim">
            <div className="top_sub_infim">
              <p className="h1_top_sub_infim">
                <span onClick={() => navigate(`/listImportSlip/${type}`)}>
                  Xuất - nhập với{" "}
                  {(type === "Provider" && "NCC") ||
                    (type === "Agency" && "Nội bộ")}
                </span>
                <span>
                  <i
                    className="fa-solid fa-chevron-right"
                    style={{ color: "black" }}
                  ></i>
                </span>
                Xem phiếu nhập kho
              </p>
            </div>
            <div className="sub_infim">
              <div className="f1_infim">
                <p className="cen_inf">
                  PHIẾU NHẬP KHO
                  <span className="icon_x_inf">
                    <i
                      className="fa-solid fa-x"
                      onClick={() => navigate(`/listImportSlip/${type}`)}
                    ></i>
                  </span>
                </p>
              </div>
              <div className="box1_infim">
                <p
                  className="inf_inf"
                  style={{ fontSize: "20px", fontWeight: "700" }}
                >
                  Thông tin chung
                </p>
                <div className="sub_box1_infim">
                  <div className="flecx_inf">
                    <p>Nguồn xuất</p>
                    <div className="inp1_inf1">
                      {(type === "Provider" &&
                        importSlip.providerId?.providerName) ||
                        (type === "Agency" && importSlip.agencyId?.agencyName)}
                    </div>
                  </div>
                  <div className="flecx_inf">
                    <p>Mã phiếu</p>
                    <div className="inp1_inf1">{importSlip.importSlipCode}</div>
                  </div>
                  <div className="flecx_inf">
                    <p>Mã nguồn</p>
                    <div className="inp1_inf1">
                      {(type === "Provider" &&
                        importSlip.providerId?.providerCode) ||
                        (type === "Agency" && importSlip.agencyId?.agencyCode)}
                    </div>
                  </div>
                  {/* <div className='flecx_inf'>
                  <p>Nhập tại kho</p>
                  <div className='inp1_inf'></div>
                </div> */}
                  <div className="flecx_inf">
                    <p>Số điện thoại</p>
                    <div className="inp1_inf1">
                      {(type === "Provider" &&
                        importSlip.providerId?.providerPhone) ||
                        (type === "Agency" && importSlip.agencyId?.agencyPhone)}
                    </div>
                  </div>
                  {/* <div className='flecx_inf'>
                  <p>Mã kho</p>
                  <div className='inp1_inf'></div>
                </div> */}
                  <div className="flecx_inf">
                    <p>Địa chỉ</p>
                    <div className="inp2_inf">
                      {(type === "Provider" &&
                        importSlip.providerId?.providerAddress) ||
                        (type === "Agency" &&
                          importSlip.agencyId?.agencyAddress)}
                    </div>
                  </div>
                  <div className="flecx_inf">
                    <p>Lí do</p>
                    <div className="inp2_inf">{importSlip.reason}</div>
                  </div>
                </div>
              </div>
              <div className="box2_infim">
                <table className="List_infim">
                  <tbody>
                    <tr className="tr_infim">
                      <th className="centerinfim">STT</th>
                      <th className="centerinfim">Tên hàng hoá</th>
                      <th className="centerinfim">Mã hàng</th>
                      <th className="centerinfim">
                        Đơn vị <div>tính</div>
                      </th>
                      <th className="centerinfim">Đơn giá</th>
                      <th className="centerinfim">
                        Số<div>Lượng</div>
                      </th>
                      <th className="centerinfim">Chiết khấu</th>
                      <th className="centerinfim">Thành tiền</th>
                    </tr>
                    {importSlip.products?.length > 0 &&
                      importSlip.products.map((product, index) => (
                        <tr className="tr_infim" key={product._id}>
                          <td>{index + 1}</td>
                          <td>{product.productId?.productName}</td>
                          <td>{product.productId?.productCode}</td>
                          <td>{product.productId?.productDVT}</td>
                          <td>
                            {formatCurrency(
                              product.productId?.productPrice || 0
                            )}
                          </td>
                          <td>{product.quantity}</td>
                          <td>{product.discount} %</td>
                          <td>{formatCurrency(calculateLineTotal(product))}</td>
                        </tr>
                      ))}
                    <tr className="tr_infim">
                      <th className="sum_inf_1" colSpan={7}>
                        Tổng
                      </th>
                      <th className="sum_inf_2">
                        {formatCurrency(importSlip.importPrice)}
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="box3_infim">
                <p>
                  <i className="fa-solid fa-file-contract"></i>{" "}
                  <span>Hợp đồng</span>
                </p>
                <div className="img_contract">
                  {importSlip.contracts?.contractMedia.length > 0 &&
                    importSlip.contracts?.contractMedia.map(
                      (contractMedia, index) => (
                        <img
                          className="img_contract"
                          src={contractMedia}
                          alt=""
                          key={index}
                        />
                      )
                    )}
                </div>
              </div>
            </div>
          </div>
          <div className="rig_infim">
            <div>
              <p>Tình trạng</p>
            </div>
            <div className="status_infim">
              <div className="flex2_inf">
                <p>Tạo bởi</p>
                <button className="b1_infim">
                  Xóa{" "}
                  <span>
                    <i className="fa-solid fa-key"></i>
                  </span>
                </button>
              </div>
              <div className="out_inf">{importSlip.userId?.fullName}</div>
              <div className="out_inf">{formatDate(importSlip.createdAt)}</div>
            </div>
            <div className="status_infim">
              <div className="flex2_inf">
                <p>Duyệt bởi</p>
                <button className="b2_infim">
                  Duyệt{" "}
                  <span>
                    <i className="fa-solid fa-key"></i>
                  </span>
                </button>
              </div>
              <div className="out_inf">
                {importSlip.status === "CONFIRMED" &&
                  importSlip.userEditStatus?.fullName}
              </div>
              <div className="out_inf">
                {importSlip.status === "CONFIRMED" &&
                  formatDate(importSlip.updatedAt)}
              </div>
            </div>
            <div className="status_infim">
              <div className="flex2_inf">
                <p>Từ chối bởi</p>
                <button className="b3_infim">
                  Từ chối{" "}
                  <span>
                    <i className="fa-solid fa-key"></i>
                  </span>
                </button>
              </div>
              <div className="out_inf">
                {importSlip.status === "REJECTED" &&
                  importSlip.userEditStatus?.fullName}
              </div>
              <div className="out_inf">
                {importSlip.status === "REJECTED" &&
                  formatDate(importSlip.updatedAt)}
              </div>
            </div>
            <div className="status_infim">
              <div className="flex2_inf">
                <p>Đã nhập bởi</p>
                <button className="b4_infim">Đã nhập</button>
              </div>
              <div className="out_inf">
                {importSlip.status === "DONE" &&
                  importSlip.userEditStatus?.fullName}
              </div>
              <div className="out_inf">
                {importSlip.status === "DONE" &&
                  formatDate(importSlip.updatedAt)}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default InforImportSlip;
