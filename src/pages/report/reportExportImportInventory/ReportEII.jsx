/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "./ReportEII.css";
import { reportExportImportInventory } from "@/api/reportApi/Report";
import TableReport from "@/components/tableReport/TableReport";
import Layout from "@/components/layout/Layout";

const ReportEII = () => {
  const chartRef = useRef(null);
  let stackedBarChart = useRef(null);

  const [labels, setLabels] = useState([]);
  const [dataExports, setDataExports] = useState([]);
  const [dataInventorys, setDataInventorys] = useState([]);
  const [time, setTime] = useState({
    timeStart: "",
    timeEnd: "",
  });

  const [list, setList] = useState([]);
  const [type, setType] = useState("chart");

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await reportExportImportInventory(time.timeStart, time.timeEnd);
        const filterData = res.filter(
          (item) =>
            item.exportQuantity >= 0 &&
            item.inventoryQuantity >= 0 &&
            item.importQuantity >= 0
        );
        setList(filterData);
        const labels = filterData.map((item) => item.productName);
        const dataExports = filterData.map((item) => item.exportQuantity);
        const dataInventorys = filterData.map((item) => item.inventoryQuantity);
        setLabels(labels);
        setDataExports(dataExports);
        setDataInventorys(dataInventorys);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [time.timeEnd, time.timeStart]);

  const createChart = () => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (stackedBarChart.current) {
      stackedBarChart.current.destroy();
    }

    const maxDataValue = Math.max(...dataExports, ...dataInventorys);
    const suggestedMax =
      maxDataValue < 100 ? maxDataValue + 100 : maxDataValue * 1.2;
    stackedBarChart.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Xuất kho",
            data: dataExports,
            backgroundColor: "#30a03",
            borderColor: "#30a032",
            borderWidth: 1,
            // barThickness: 50,
          },
          {
            label: "Tồn kho",
            data: dataInventorys,
            backgroundColor: "#fdbe10",
            borderColor: "#fed871",
            borderWidth: 1,
            // barThickness: 50,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
            labels: {
              color: "black",
              font: {
                size: 11,
              },
            },
          },
          tooltip: {
            enabled: true,
            tooltip: {
              enabled: true,
              bodyFont: {
                size: 11,
              },
              titleFont: {
                size: 11,
              },
            },
          },
        },
        scales: {
          x: {
            stacked: true,
            ticks: {
              color: "black",
              font: {
                size: 11,
              },
            },
          },
          y: {
            stacked: true,
            beginAtZero: true,
            suggestedMax: suggestedMax,
            ticks: {
              stepSize: 20,
              color: "black",
              font: {
                size: 14,
              },
            },
          },
        },
      },
    });
  };

  useEffect(() => {
    if (labels.length && dataExports.length && dataInventorys.length) {
      createChart();
    }

    return () => {
      if (stackedBarChart.current) {
        stackedBarChart.current.destroy();
        stackedBarChart.current = null;
      }
    };
  }, [type, labels, dataExports, dataInventorys]);

  const handleChangeTime = (e) => {
    const { name, value } = e.target;
    setTime({
      ...time,
      [name]: value,
    });

    console.log(time);
  };

  const handleChangeType = (e) => {
    setType(e.target.value);
  };

  return (
    <div>
      <Layout>
        <div className="rcbody">
          <div className="rcframe">
            <div className="rctitle">BIỂU ĐỒ BÁO CÁO XUẤT NHẬP TỒN</div>
            <div className="rcSearch">
              <div className="rcInput">
                <div className="rcbox1">
                  <div className="rcbox2">
                    <span className="rcfrom">Từ ngày</span>
                  </div>
                  <div className="rcbox3">
                    <input
                      type="date"
                      className="rcdate"
                      name="timeStart"
                      value={time.timeStart}
                      onChange={(e) => handleChangeTime(e)}
                    />
                  </div>
                  <div className="rcbox2">
                    <span className="rcto">Đến ngày</span>
                  </div>
                  <div className="rcbox3">
                    <input
                      type="date"
                      className="rcdate"
                      name="timeEnd"
                      value={time.timeEnd}
                      onChange={(e) => handleChangeTime(e)}
                    />
                  </div>
                </div>
              </div>
              <div className="rcbbox">
                <select
                  name="rcoption"
                  id="rcoption"
                  onChange={(e) => handleChangeType(e)}
                >
                  <option>
                    {type === "chart" ? "Xem biểu đồ" : "Xem bảng"}
                  </option>
                  <option value="chart">Xem biểu đồ</option>
                  <option value="table">Xem bảng</option>
                </select>
              </div>
            </div>
            <div className="rcChart">
              {type === "chart" ? (
                <canvas ref={chartRef}></canvas>
              ) : (
                <TableReport list={list} />
              )}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default ReportEII;
