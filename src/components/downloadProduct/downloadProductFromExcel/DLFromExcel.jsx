/* eslint-disable */
import React from 'react'

import "./DLFromExcel.css";
const DLFromExcel = () => {
  return (
    
    <div className="Excelkien">
        <div className="filengoai">THÊM DANH SÁCH HÀNG HÓA FILE NGOÀI</div>
        <div className="upload-kien">
          <i className="fas fa-cloud"></i>
          <p>Kéo thả file vào đây</p>
          <p>hoặc</p>
          <button className="upload-buttonkien">Chọn File</button>
          <input type="file" id="file-input" style={{display:'none'}}/>
        </div>
        <button className="cancel-buttonkien">Hủy</button>
    </div>
  )
}

export default DLFromExcel;