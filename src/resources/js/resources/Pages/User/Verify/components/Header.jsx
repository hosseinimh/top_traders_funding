import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";

import { useLocale } from "../../../../../hooks";
import { BASE_PATH } from "../../../../../constants";

const Header = () => {
  const pageState = useSelector((state) => state.pageReducer);
  const userState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const { verifyUserRequestPage: strings } = useLocale();
  const [levels, setLevels] = useState([0, 360]);
  const [levelsChartOptions, setLevelsChartOptions] = useState(null);
  const [levelsSeries, setLevelsSeries] = useState(null);

  useEffect(() => {
    const finished =
      useState?.user?.verifiedAt || userState?.user?.verifyRequest3At
        ? 360
        : userState?.user?.emailVerifiedAt
        ? 240
        : userState?.user?.verifyRequest1At
        ? 120
        : 0;
    setLevels([finished, 360 - finished]);
  }, [userState?.user]);

  useEffect(() => {
    setLevelsChart();
  }, [levels]);

  const setLevelsChart = () => {
    setLevelsChartOptions({
      plotOptions: {
        pie: {
          startAngle: 0,
          donut: {
            size: "70%",
            dataLabels: {
              enabled: false,
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        width: 20,
        type: "solid",
        lineCap: "round",
        colors: [
          getComputedStyle(document.documentElement).getPropertyValue(
            "--success"
          ),
          getComputedStyle(document.documentElement).getPropertyValue(
            "--dark-warning"
          ),
        ],
      },
      stroke: {
        show: false,
      },
      grid: {
        padding: {
          left: -20,
          right: -20,
        },
      },
      legend: {
        show: false,
      },
    });
    setLevelsSeries(levels);
  };

  const renderLevelsChart = () => {
    if (levelsChartOptions && levelsSeries) {
      return (
        <div className="chart">
          <Chart
            type="donut"
            options={levelsChartOptions}
            series={levelsSeries}
            width={110}
            height={110}
          />
        </div>
      );
    }
    return <></>;
  };

  const navigateTo = (page) => {
    switch (page) {
      case 1:
        navigate(`${BASE_PATH}/users/verify_request1`);
        return;
      case 2:
        if (userState?.user?.verifyRequest1At) {
          navigate(`${BASE_PATH}/users/verify_request2`);
        }
        return;
      case 3:
        if (userState?.user?.emailVerifiedAt) {
          navigate(`${BASE_PATH}/users/verify_request3`);
        }
        return;
    }
  };

  return (
    <div className="block pd-20">
      <div className="main-wallet d-flex-wrap align-center just-around">
        <div id="walletChart" style={{ minWidth: "9rem" }}>
          {renderLevelsChart()}
        </div>
        <div className="info">
          <div className="hd">
            <span>{strings._title}</span>
            <h3
              className={`${
                userState?.user?.verifiedAt || userState?.user?.verifyRequest3At
                  ? "success"
                  : "dark-warning"
              }`}
            >
              {userState?.user?.verifiedAt
                ? strings.verified
                : userState?.user?.verifyRequest3At
                ? strings.verifing
                : strings.notVerified}
            </h3>
          </div>
          <div className="chart-legends d-flex-wrap">
            <div className="item">
              <div className="chart-value">
                <span className="bg-success"></span>
                {strings.finishedPercentage}
              </div>
            </div>

            <div className="item">
              <div className="chart-value">
                <span className="bg-dark-warning"></span>
                {strings.remainedPercentage}
              </div>
            </div>
          </div>
        </div>
        <div className="steps step-steps">
          <div
            className={`item step-num ${
              pageState?.page === "VerifyUserRequest1" ? "active" : ""
            }`}
            onClick={() => navigateTo(1)}
          >
            <div className="icon">
              <i className="icon-frame5"></i>
            </div>
            <span>{strings.title1}</span>
          </div>
          <div
            className={`item step-num ${
              pageState?.page === "VerifyUserRequest2" ? "active" : ""
            }`}
            onClick={() => navigateTo(2)}
          >
            <div className="icon">
              <i className="icon-tag-user5"></i>
            </div>
            <span>{strings.title2}</span>
          </div>
          <div
            className={`item step-num ${
              pageState?.page === "VerifyUserRequest3" ? "active" : ""
            }`}
            onClick={() => navigateTo(3)}
          >
            <div className="icon">
              <i className="icon-gallery4"></i>
            </div>
            <span>{strings.title3}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
