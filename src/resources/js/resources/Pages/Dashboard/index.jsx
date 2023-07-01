import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts";

import { BlankPage } from "../../components";
import { PageUtils } from "./PageUtils";
import { BASE_PATH, IMAGES_PATH, USER_ROLES } from "../../../constants";
import { useLocale } from "../../../hooks";
import { setShownModalAction } from "../../../state/layout/layoutActions";

const Dashboard = () => {
  const userState = useSelector((state) => state.userReducer);
  const { dashboardPage: strings, general } = useLocale();
  const pageUtils = new PageUtils();
  const [wallet, setWallet] = useState([0, 100]);
  const [walletChartOptions, setWalletChartOptions] = useState(null);
  const [walletSeries, setWalletSeries] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setWallet([0, 100]);
  }, []);

  useEffect(() => {
    setWalletChart();
  }, [wallet]);

  const setWalletChart = () => {
    setWalletChartOptions({
      plotOptions: {
        pie: {
          startAngle: 0,
          donut: {
            size: "70%",
            labels: {
              show: false,
            },
          },
          dataLabels: {
            offset: 300,
            minAngleToShowLabel: 30,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      labels: [strings.wallet, strings.wallet],
      fill: {
        width: 20,
        type: "solid",
        lineCap: "round",
        colors: [
          getComputedStyle(document.documentElement).getPropertyValue(
            "--success"
          ),
          getComputedStyle(document.documentElement).getPropertyValue(
            "--light-body"
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
      tooltip: {
        enabled: true,
        y: {
          formatter: () => `0`,
        },
      },
    });
    setWalletSeries(wallet);
  };

  const onVerificationClick = (e) => {
    if (
      userState?.user?.role === USER_ROLES.ADMINISTRATOR ||
      userState?.user?.verifyRequest3At
    ) {
      showProfileModal(e);
    } else {
      navigate(`${BASE_PATH}/users/verify_request1`);
    }
  };

  const showProfileModal = (e) => {
    e.stopPropagation();
    dispatch(setShownModalAction("profileModal"));
  };

  const renderwalletChart = () => {
    if (walletChartOptions && walletSeries) {
      return (
        <div className="chart">
          <Chart
            type="donut"
            options={walletChartOptions}
            series={walletSeries}
            width={150}
            height={150}
          />
        </div>
      );
    }
    return <></>;
  };

  const renderUserInfo = () => {
    return (
      <>
        <div className="block pd-20 basis400 d-flex align-center">
          <div className="main-wallet d-flex-wrap align-center just-around grow-1">
            <div className="info">
              <div className="hd">
                <h3>{strings.wallet}</h3>
                <span>0 {general.currency} </span>
              </div>
            </div>
            {renderwalletChart()}
          </div>
        </div>
        <div className="block pd-20 d-flex-wrap just-around align-center basis400 bg-primary main-verification">
          <div className="img">
            <img src={`${IMAGES_PATH}/user-verify.png`} alt="" />
          </div>
          <div className="info">
            <span>
              {userState?.user?.verifiedAt
                ? strings.verifiedInfo
                : userState?.user?.verifyRequest3At
                ? strings.verifingInfo
                : strings.notVerifiedInfo}
            </span>
            <div className="d-flex just-end">
              <button
                className={`btn ${
                  userState?.user?.verifiedAt ||
                  userState?.user?.verifyRequest3At
                    ? "btn-primary-light"
                    : "btn-success"
                }`}
                onClick={(e) => onVerificationClick(e)}
              >
                {userState?.user?.verifiedAt ||
                userState?.user?.verifyRequest3At
                  ? strings.verified
                  : strings.verify}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <BlankPage pageUtils={pageUtils}>
      <div className="section d-flex-wrap fix-mr15">
        {userState?.user?.role === USER_ROLES.USER && renderUserInfo()}
      </div>
    </BlankPage>
  );
};

export default Dashboard;
