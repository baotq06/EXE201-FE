/* eslint-disable */
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

import "./ReportImport.css";
import { reportExportImportInventory } from "@/api/reportApi/Report";
import TableReport from "@/components/tableReport/TableReport";
import Layout from "@/components/layout/Layout";

const ReportImport = () => {
  const [list, setList] = useState([]);
  const [labels, setLabels] = useState([]);
  const [datas, setDatas] = useState([]);
  const [time, setTime] = useState({
    timeStart: "",
    timeEnd: "",
  });
  const [type, setType] = useState("chart");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await reportExportImportInventory(
          time.timeStart,
          time.timeEnd
        );
        const filterData = res.filter(
          (item) =>
            item.exportQuantity >= 0 &&
            item.inventoryQuantity >= 0 &&
            item.importQuantity >= 0
        );
        setList(filterData);
        const labels = filterData.map((item) => item.productName);
        const datas = filterData.map((item) => item.importQuantity);
        setLabels(labels);
        setDatas(datas);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [time.timeEnd, time.timeStart]);

  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Số lượng hàng hoá",
        data: datas,
        backgroundColor: "#30a03",
        borderColor: "#30a032",
        borderWidth: 1,
        // barThickness: 50,
        // maxBarThickness: 50,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          // color: "black",
          font: {
            size: 11,
          },
          maxRotation: 45,
        },
        categoryPercentage: 1,
        barPercentage: 1,
      },
      y: {
        ticks: {
          color: "black",
          font: {
            size: 14,
          },
        },
      },
    },
    datasets: {
      barThickness: 100,
      maxBarThickness: 100,
    },
  };

  const handleChangeTime = (e) => {
    const { name, value } = e.target;
    setTime({
      ...time,
      [name]: value,
    });
  };

  const handleChangeType = (e) => {
    setType(e.target.value);
  };

  return (
    <>
      <Layout>
        <div className="reportImport-container">
          <div className="RI-frame">
            <h2 className="reportImport-h2">BIỂU ĐỒ BÁO CÁO NHẬP KHO</h2>
            <div className="date-ImportReport">
              <span className="date-ImportReport1">Từ ngày</span>
              <input
                type="date"
                className="date-ImportReport3"
                name="timeStart"
                value={time.timeStart}
                onChange={(e) => handleChangeTime(e)}
              />
              <span
                className="date-ImportReport2"
                name="timeEnd"
                value={time.timeEnd}
                onChange={(e) => handleChangeTime(e)}
              >
                Đến ngày
              </span>
              <input type="date" className="date-ImportReport3" />
              <span className="reportImport-type">Loại báo cáo</span>
              <select
                name=""
                id=""
                className="reportImport-select"
                onChange={handleChangeType}
              >
                <option>{type === "chart" ? "Biểu đồ" : "Bảng"}</option>
                <option value="chart">Biểu đồ</option>
                <option value="table">Bảng</option>
              </select>
            </div>
            {type === "chart" ? (
              <div className="RI-caption">
                <div className="RI-caption-text"></div>
                <p>Số lượng hàng hoá</p>
              </div>
            ) : (
              <div></div>
            )}
            <div className="IR-barchart">
              {type === "chart" ? (
                <Bar data={data} options={options} />
              ) : (
                <TableReport list={list} />
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ReportImport;
