/* eslint-disable */
import React, { useEffect, useState } from "react";
import "./Home.css";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  exportWithSource,
  importExportRatio,
  importWithSource,
} from "@/api/generalStatisticsApi/generalStatistics";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";

const Home = () => {
  const [dataOverView, setDataOverView] = useState({});
  const [dataExport, setDataExport] = useState({});
  const [dataImport, setDataImport] = useState({});

  const [time1, setTime1] = useState({
    timeStart1: "",
    timeEnd1: "",
  });

  const [time2, setTime2] = useState({
    timeStart2: "",
    timeEnd2: "",
  });

  const [time3, setTime3] = useState({
    timeStart3: "",
    timeEnd3: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    const getData1 = async () => {
      const data1 = await importExportRatio(time1.timeStart1, time1.timeEnd1);
      setDataOverView(data1);
    };

    getData1();
  }, [time1]);

  useEffect(() => {
    const getData2 = async () => {
      const data2 = await exportWithSource(time2.timeStart2, time2.timeEnd2);
      setDataExport(data2);
    };

    getData2();
  }, [time2]);

  useEffect(() => {
    const getData3 = async () => {
      const data3 = await importWithSource(time3.timeStart3, time3.timeEnd3);
      setDataImport(data3);
    };

    getData3();
  }, [time3]);

  const handleChangeTime1 = (e) => {
    const { name, value } = e.target;
    setTime1({
      ...time1,
      [name]: value,
    });
  };

  const handleChangeTime2 = (e) => {
    const { name, value } = e.target;
    setTime2({
      ...time2,
      [name]: value,
    });
  };

  const handleChangeTime3 = (e) => {
    const { name, value } = e.target;
    setTime3({
      ...time3,
      [name]: value,
    });
  };

  ChartJS.register(ArcElement, Tooltip, Legend);
  const overviewData = {
    datasets: [
      {
        data: [dataOverView?.exportQuantity, dataOverView?.importQuantity],
        backgroundColor: ["#FFBB01", "#30A032"],
        hoverBackgroundColor: ["#FFCE56", "#36A2EB"],
      },
    ],
  };

  const exportData = {
    datasets: [
      {
        data: [
          dataExport?.exportWithProvider,
          dataExport?.exportWithAgency,
          dataExport?.returnWithAgency,
        ],
        backgroundColor: ["#FFBB01", "#FFD45F", "#FFEAB0"],
        hoverBackgroundColor: ["#FFCE56", "#FF7043", "#FF6384"],
      },
    ],
  };

  const importData = {
    datasets: [
      {
        data: [dataImport?.importWithProvider, dataImport?.importWithAgency],
        backgroundColor: ["#30A032", "#95f5a8"],
        hoverBackgroundColor: ["#4BC0C0", "#36A2EB"],
      },
    ],
  };

  return (
    <>
      <Layout>
        <div className="container_home" style={{ padding: "10px 20px " }}>
          <div className="sub_home">
            <div className="tongquan_home">
              <div className="dong1_tq">
                <p>
                  <b>TỔNG QUAN</b>
                </p>
              </div>
              <div className="dong2_tq">
                <p>Tỉ lệ xuất nhập kho</p>
                <div className="date_time_home">
                  <label htmlFor="">Từ ngày</label>
                  <input
                    className="date_home"
                    type="date"
                    name="timeStart1"
                    id=""
                    value={time1.timeStart1}
                    onChange={(e) => handleChangeTime1(e)}
                  />
                  <label htmlFor="">Đến ngày</label>
                  <input
                    className="date_home"
                    type="date"
                    name="timeEnd1"
                    id=""
                    value={time1.timeEnd1}
                    onChange={(e) => handleChangeTime1(e)}
                  />
                </div>
              </div>
              <div className="dong3_tq">
                <Doughnut data={overviewData} className="chart-size" />
                <div className="sub2_home">
                  <div className="col_2_home">
                    <div className="o_home"></div>
                    <p>Xuất kho</p>
                  </div>
                  <div className="col_2_home">
                    <div className="o1_home"></div>
                    <p>Nhập kho</p>
                  </div>
                </div>
                <div>
                  <div className="col3_home">
                    <div className="icon_home">
                      <i className="fa-regular fa-calendar-check"></i>
                    </div>
                    <p className="home-text">
                      Tổng số phiếu <br /> <span>{dataOverView.countSlip}</span>
                    </p>
                  </div>
                  <div className="col3_home">
                    <div className="icon_home">
                      <i className="fa-solid fa-boxes-stacked"></i>
                    </div>
                    <p className="home-text">
                      Tổng lượng tồn kho <br />
                      <span>
                        {dataOverView.importQuantity -
                          dataOverView.exportQuantity}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="tongquan_home">
              <div className="dong1_tq">
                <p>
                  <b>XUẤT KHO</b>
                </p>
              </div>
              <div className="dong2_tq">
                <p>Tỉ lệ xuất kho theo nguồn nhập</p>
                <div className="date_time_home">
                  <label htmlFor="">Từ ngày</label>
                  <input
                    className="date_home"
                    type="date"
                    name="timeStart2"
                    id=""
                    value={time2.timeStart2}
                    onChange={(e) => handleChangeTime2(e)}
                  />
                  <label htmlFor="">Đến ngày</label>
                  <input
                    className="date_home"
                    type="date"
                    name="timeEnd2"
                    id=""
                    value={time2.timeEnd2}
                    onChange={(e) => handleChangeTime2(e)}
                  />
                </div>
              </div>
              <div className="dong3_tq">
                <Doughnut data={exportData} className="chart-size" />
                <div className="sub2_home">
                  <div className="col_2_home">
                    <div className="o3_home"></div>
                    <p>
                      Xuất kho <br /> <span>cho NCC</span>
                    </p>
                  </div>
                  <div className="col_2_home">
                    <div className="o4_home"></div>
                    <p>
                      Xuất kho <br /> <span>cho ĐLC1</span>
                    </p>
                  </div>
                  <div className="col_2_home">
                    <div className="o5_home"></div>
                    <p>Hoàn hàng</p>
                  </div>
                </div>
                <div>
                  <div className="col3_home">
                    <div className="icon_home">
                      <i className="fa-regular fa-calendar-check"></i>
                    </div>
                    <p className="home-text">
                      Số phiếu xuất kho <br />{" "}
                      <span>{dataExport.countSlip}</span>
                    </p>
                  </div>
                  <div className="col3_home">
                    <div className="icon_home">
                      <i className="fa-solid fa-box-archive"></i>
                    </div>
                    <p className="home-text">
                      Tổng lượng xuất kho
                      <br />
                      <span>
                        {dataExport.exportWithProvider +
                          dataExport.exportWithAgency}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="tongquan_home">
              <div className="dong1_tq">
                <p>
                  <b>NHẬP KHO</b>
                </p>
              </div>
              <div className="dong2_tq">
                <p>Tỉ lệ nhập kho theo nguồn xuất</p>
                <div className="date_time_home">
                  <label htmlFor="">Từ ngày</label>
                  <input
                    className="date_home"
                    type="date"
                    name="timeStart3"
                    id=""
                    value={time3.timeStart3}
                    onChange={(e) => handleChangeTime3(e)}
                  />
                  <label htmlFor="">Đến ngày</label>
                  <input
                    className="date_home"
                    type="date"
                    name="timeEnd3"
                    id=""
                    value={time3.timeEnd3}
                    onChange={(e) => handleChangeTime3(e)}
                  />
                </div>{" "}
              </div>
              <div className="dong3_tq">
                <Doughnut data={importData} className="chart-size" />
                <div className="sub2_home">
                  <div className="col_2_home">
                    <div className="o6_home"></div>
                    <p>
                      Nhập kho <br /> <span>từ NCC</span>
                    </p>
                  </div>
                  <div className="col_2_home">
                    <div className="o7_home"></div>
                    <p>
                      Nhập kho <br /> <span>từ ĐLC1</span>
                    </p>
                  </div>
                </div>
                <div>
                  <div className="col3_home">
                    <div className="icon_home">
                      <i className="fa-regular fa-calendar-check"></i>
                    </div>
                    <p className="home-text">
                      Số phiếu nhập kho <br />{" "}
                      <span>{dataImport.countSlip}</span>
                    </p>
                  </div>
                  <div className="col3_home">
                    <div className="icon_home">
                      <i className="fa-solid fa-box-archive"></i>
                    </div>
                    <p className="home-text">
                      Tổng lượng nhập kho <br />{" "}
                      <span>
                        {dataImport.importWithProvider +
                          dataImport.importWithAgency}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
