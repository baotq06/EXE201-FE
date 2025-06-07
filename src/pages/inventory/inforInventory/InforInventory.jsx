/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getRecordInventoryById } from "@/api/recordInventoryApi/recordInventory";
import { formatDate } from "@/utils/function/slipFuntion";

import "./InforInventory.css";
import Layout from "@/components/layout/Layout";
const InfoInventory = () => {
  const [recordInventory, setRecordInventory] = useState({});

  const navigate = useNavigate();
  const { recordInventoryId } = useParams();

  useEffect(() => {
    const getRecordInventory = async () => {
      const res = await getRecordInventoryById(recordInventoryId);
      setRecordInventory(res.recordInventory);
    };

    getRecordInventory();
  }, []);

  const handleCountDifference = () => {
    let count = 0;
    if (recordInventory.products?.length > 0) {
      recordInventory.products?.forEach((item) => {
        count += +item.difference;
      });
    }
    return count;
  };
  return (
    <>
      <Layout>
        <div className="container_infinven">
          <div className="lef_infim">
            <div className="top_sub_infim">
              <p className="h1_top_sub_infim">
                <span onClick={() => navigate("/listInventory")}>
                  Danh sách biên bản kiểm kê hàng hóa
                </span>
                <span>
                  <i
                    className="fa-solid fa-chevron-right"
                    style={{ color: "black" }}
                  ></i>
                </span>
                Xem biên bản kiểm kê hàng hóa
              </p>
            </div>
            <div className="sub_infinven">
              <div className="f1_infim">
                <p className="cen_inf">
                  BẢNG KIỂM KÊ HÀNG HÓA
                  <span className="icon_x_inf">
                    <i className="fa-solid fa-x"></i>
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
                    <p>Mã biên bản</p>
                    <div className="inp1_inf">
                      {recordInventory.recordInventoryCode}
                    </div>
                  </div>
                  <div></div>
                  <div className="flecx_inf">
                    <p>Kiểm kê tại kho</p>
                    <div className="inp1_inf">
                      {recordInventory.agencyId?.agencyName}
                    </div>
                  </div>
                  <div className="flecx_inf">
                    <p>Ngày kiểm</p>
                    <div className="inp1_inf">
                      {formatDate(recordInventory.recordInventoryDate)}
                    </div>
                  </div>
                </div>
                <div className="sub2_inven">
                  <p>Mục đích</p>
                  <div className="inp2_infven">{recordInventory.purpose}</div>
                </div>
              </div>
              <div className="box2_infim">
                <table className="List_infim">
                  <tbody>
                    <tr className="tr_infim">
                      <th className="centerinfim" rowSpan={2}>
                        STT
                      </th>
                      <th className="centerinfim" rowSpan={2}>
                        Tên hàng hoá
                      </th>
                      <th className="centerinfim" rowSpan={2}>
                        Mã hàng
                      </th>
                      <th className="centerinfim" rowSpan={2}>
                        Đơn vị <div>tính</div>
                      </th>
                      <th className="centerinfim" rowSpan={2}>
                        Đơn giá
                      </th>
                      <th className="centerinfim" colSpan={3}>
                        Số Lượng
                      </th>
                      <th className="centerinfim" rowSpan={2}>
                        Xử lý
                      </th>
                    </tr>
                    <tr className="tr_infim">
                      <th className="centerinfim">
                        Theo hệ <div>thống</div>
                      </th>
                      <th className="centerinfim">
                        Theo <div>kiểm kê</div>
                      </th>
                      <th className="centerinfim">
                        Chênh <div>Lệch</div>
                      </th>
                    </tr>

                    {recordInventory.products?.length > 0 &&
                      recordInventory.products?.map((item, index) => (
                        <tr key={item.productId?._id}>
                          <td>{index + 1}</td>
                          <td>{item.productId?.productName}</td>
                          <td>{item.productId?.productCode}</td>
                          <td>{item.productId?.productDVT}</td>
                          <td>{item.productId?.productPrice}</td>
                          <td>{item.numberOfSystem}</td>
                          <td>{item.numberOfReality}</td>
                          <td>{item.difference}</td>
                          <td>{item.solution ? item.solution : ""}</td>
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
              <div className="out_inf">{recordInventory.userId?.fullName}</div>
              <div className="out_inf">
                {formatDate(recordInventory.createdAt)}
              </div>
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
                {recordInventory.status === "CONFIRMED" &&
                  recordInventory.userEditStatus?.fullName}
              </div>
              <div className="out_inf">
                {recordInventory.status === "CONFIRMED" &&
                  formatDate(recordInventory.updatedAt)}
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
                {recordInventory.status === "REJECTED" &&
                  recordInventory.userEditStatus?.fullName}
              </div>
              <div className="out_inf">
                {recordInventory.status === "REJECTED" &&
                  formatDate(recordInventory.updatedAt)}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default InfoInventory;
