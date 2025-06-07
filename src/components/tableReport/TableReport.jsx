/* eslint-disable */
import React from "react";

import "./TableReport.css";
const TableReport = ({ list}) => {
  
  return (
    <>
      <div className="rtbody">
        <div className="rtTable">
          <table className="rtInside">
            <tbody>
              <tr>
                <th>STT</th>
                <th>Tên sản phẩm</th>
                <th>Mã sản phẩm</th>
                <th>Số lượng nhập</th>
                <th>Số lượng xuất</th>
                <th>Số lượng tồn</th>
              </tr>
              {list.length > 0 &&
                list.map((item, index) => (
                  <tr key={item.productId}>
                    <td className="rtnum">{index + 1}</td>
                    <td>{item.productName}</td>
                    <td>{item.productCode}</td>
                    <td className="rtnum">{item.importQuantity}</td>
                    <td className="rtnum">{item.exportQuantity}</td>
                    <td className="rtnum">{item.inventoryQuantity}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TableReport;
