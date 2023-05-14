import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import { BlankPage, Span } from "../../../components";
import utils from "../../../../utils/Utils";
import { PageUtils } from "./PageUtils";
import { useLocale } from "../../../../hooks";
import { CHALLENGE_LEVELS } from "../../../../constants";

const AnalyzeChallenge = () => {
  const [item, setItem] = useState(null);
  const [mainChartOptions, setMainChartOptions] = useState(null);
  const [dailyLossChartOptions, setDailyLossChartOptions] = useState(null);
  const [totalLossChartOptions, setTotalLossChartOptions] = useState(null);
  const [mainSeries, setMainSeries] = useState(null);
  const [dailyLossSeries, setDailyLossSeries] = useState(null);
  const [totalLossSeries, setTotalLossSeries] = useState(null);
  const { analyzeChallengePage: strings, general } = useLocale();
  const pageUtils = new PageUtils();
  const isPersian = general.locale === "فارسی" ? true : false;

  useEffect(() => {
    if (pageUtils?.pageState?.props?.item) {
      setItem(pageUtils?.pageState?.props?.item);
    }
  }, [pageUtils?.pageState?.props?.item]);

  useEffect(() => {
    if (item) {
      setMainChart();
      setDailyLossChart();
      setTotalLossChart();
    }
  }, [item]);

  const setMainChart = () => {
    setMainChartOptions({
      colors: ["#298957"],
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "numeric",
        labels: {
          formatter: function (value) {
            return value.toFixed(0);
          },
        },
      },
      yaxis: {
        min: 0,
        max: Math.max(item.balance * 1.2, item.equity * 1.2),
      },
      tooltip: {
        x: {
          formatter: function (val) {
            return val.toFixed(0);
          },
        },
        y: {
          formatter: function (val) {
            return val.toFixed(0);
          },
        },
      },
    });
    setMainSeries([
      {
        name: "P&L",
        data: [
          [1, 340],
          [3, 430],
          [5, 310],
          [10, 630],
          [13, 330],
          [15, 430],
          [18, 330],
          [20, 920],
        ],
      },
    ]);
  };

  const setDailyLossChart = () => {
    setDailyLossChartOptions({
      colors: ["#298957"],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "70%",
          },
          track: {
            background: "#9c9b9b",
            startAngle: 0,
            endAngle: 360,
          },
          dataLabels: {
            showOn: "always",
            name: {
              offsetY: 0,
              show: true,
              color: "#298957",
              fontSize: "0.9rem",
              fontFamily: "vazir",
            },
            value: {
              show: false,
            },
          },
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: [strings.stable],
    });
    setDailyLossSeries([70]);
  };

  const setTotalLossChart = () => {
    setTotalLossChartOptions({
      colors: ["#298957"],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "70%",
          },
          track: {
            background: "#9c9b9b",
            startAngle: 0,
            endAngle: 360,
          },
          dataLabels: {
            showOn: "always",
            name: {
              offsetY: 0,
              show: true,
              color: "#298957",
              fontSize: "0.9rem",
              fontFamily: "vazir",
            },
            value: {
              show: false,
            },
          },
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: [strings.stable],
    });
    setTotalLossSeries([35]);
  };

  const renderAccountInfoItem = (item, value) => (
    <div className="my-1" style={{ textAlign: "center", flex: "1" }}>
      <span className="mxdir-1">{item}:</span>
      <Span className="font-weight-bolder">{value}</Span>
    </div>
  );

  const renderAccountInfo = () => (
    <div className="card-body" style={{ marginBottom: "1.25rem" }}>
      <div className="d-flex justify-content-between flex-wrap">
        {renderAccountInfoItem(
          strings.accountNo,
          isPersian ? utils.en2faDigits(item?.accountNo) : item?.accountNo
        )}
        {renderAccountInfoItem(
          strings.platform,
          isPersian
            ? utils.en2faDigits((item?.platform ?? "").toUpperCase())
            : (item?.platform ?? "").toUpperCase()
        )}
        {renderAccountInfoItem(strings.status, item?.statusText)}
        {renderAccountInfoItem(
          strings.accountType,
          isPersian
            ? utils.en2faDigits(`$${utils.addCommas(item?.balance)}`)
            : `${utils.addCommas(item?.balance)}$`
        )}
      </div>
    </div>
  );

  const renderRules = () => (
    <div className="card my-2 bg-light" style={{ boxShadow: "none" }}>
      <div className="card-body py-2 px-1">
        <div className="d-flex justify-content-between px-1">
          {(() => {
            const challengeRule = pageUtils?.pageState?.props?.challengeRule;
            if (item && challengeRule) {
              let title = "";
              let body = "";
              switch (item.level) {
                case CHALLENGE_LEVELS.LEVEL1:
                  title = strings.tradeDaysTitle.replace(
                    ":field",
                    challengeRule.tradeDays1
                  );
                  body = strings.tradeDaysBody.replace(
                    ":field",
                    challengeRule.tradeDays1
                  );
                  break;
                case CHALLENGE_LEVELS.LEVEL2:
                  title = strings.tradeDaysTitle.replace(
                    ":field",
                    challengeRule.tradeDays2
                  );
                  body = strings.tradeDaysBody.replace(
                    ":field",
                    challengeRule.tradeDays2
                  );
                  break;
                case CHALLENGE_LEVELS.REAL:
                  title = strings.tradeDaysTitle.replace(
                    ":field",
                    challengeRule.tradeDaysReal
                  );
                  body = strings.tradeDaysBody.replace(
                    ":field",
                    challengeRule.tradeDaysReal
                  );
                  break;
                case CHALLENGE_LEVELS.FREE:
                  title = strings.tradeDaysTitle.replace(
                    ":field",
                    challengeRule.tradeDaysFree
                  );
                  body = strings.tradeDaysBody.replace(
                    ":field",
                    challengeRule.tradeDaysFree
                  );
                  break;
                default:
                  return <></>;
              }
              return (
                <div>
                  <h6>{title}</h6>
                  <span style={{ fontSize: "0.75rem" }}>{body}</span>
                </div>
              );
            }
            return <></>;
          })()}
          <i
            className="metismenu-icon pe-7s-date"
            style={{ fontSize: "3rem" }}
          ></i>
        </div>
      </div>
    </div>
  );

  const renderAccountDetailsRow = (item1, value1, item2, value2) => (
    <div className="d-flex justify-content-between">
      <div className="d-flex justify-content-between w-50 border-light border-end mxdir-3">
        <span className="text-secondary">{item1}:</span>
        <Span>{value1}</Span>
      </div>
      <div className="d-flex justify-content-between w-50">
        <span className="text-secondary">{item2}:</span>
        <Span>-</Span>
      </div>
    </div>
  );

  const renderAccountDetails = () => (
    <div className="card my-2" style={{ minHeight: "21.8rem" }}>
      <div className="card-title mt-4 mx-4">
        <h5>{strings.accountDetails}</h5>
      </div>
      <div className="card-body">
        {renderAccountDetailsRow(
          strings.accountDetailsItem1,
          utils.en2faDigits(1),
          strings.accountDetailsItem2,
          "-"
        )}
        {renderAccountDetailsRow(
          strings.accountDetailsItem3,
          "-",
          strings.accountDetailsItem4,
          "-"
        )}
        {renderAccountDetailsRow(
          strings.accountDetailsItem5,
          "-",
          strings.accountDetailsItem6,
          "-"
        )}
        {renderAccountDetailsRow(
          strings.accountDetailsItem7,
          "-",
          strings.accountDetailsItem8,
          "-"
        )}
        {renderAccountDetailsRow(
          strings.accountDetailsItem9,
          "-",
          strings.accountDetailsItem10,
          "-"
        )}
        {renderAccountDetailsRow(
          strings.accountDetailsItem11,
          "-",
          strings.accountDetailsItem12,
          "-"
        )}
        {renderAccountDetailsRow(
          strings.accountDetailsItem13,
          "-",
          strings.accountDetailsItem14,
          "-"
        )}
      </div>
    </div>
  );

  const renderParameters = () => (
    <div className="card my-2" style={{ minHeight: "21.8rem" }}>
      <div className="card-title mt-4 mx-4">
        <h5>{strings.parameteresTitle}</h5>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-between mxdir-1">
          <span className="text-secondary">{strings.profitFactor}</span>
          <Span>-</Span>
        </div>
        <div className="d-flex justify-content-between mxdir-1">
          <span className="text-secondary">{strings.sharpeRatio}</span>
          <Span>-</Span>
        </div>
        <div className="d-flex justify-content-between mxdir-1">
          <span className="text-secondary">{strings.sortinoRatio}</span>
          <Span>-</Span>
        </div>
        <div className="d-flex justify-content-between mxdir-1">
          <span className="text-secondary">{strings.zScore}</span>
          <Span>-</Span>
        </div>
        <div className="d-flex justify-content-between mxdir-1">
          <span className="text-secondary">{strings.expectedProfit}</span>
          <Span>-</Span>
        </div>
        <div className="d-flex justify-content-between mxdir-1">
          <span className="text-secondary">{strings.expectedPipProfit}</span>
          <Span>-</Span>
        </div>
      </div>
    </div>
  );

  return (
    <BlankPage pageUtils={pageUtils}>
      <div className="row mb-4">
        <div className="col col-12">
          <div className="card mb-2">{renderAccountInfo()}</div>
        </div>
        <div className="col col-md-7 col-12 pxdir-0">
          <div className="card my-2">
            <div className="card-body" style={{ paddingBottom: "1.25rem" }}>
              <h5 className="pb-2">{strings.chart}</h5>
              <div
                style={{
                  minHeight: "450px",
                  direction: "ltr",
                }}
              >
                {mainChartOptions && mainSeries && (
                  <Chart
                    options={mainChartOptions}
                    series={mainSeries}
                    width="100%"
                    height={450}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col col-md-5 col-12">
          <div className="card my-2 bg-sunny-morning">
            <div className="card-body py-4 text-center">
              <h5>{strings.balanceStartDay}</h5>
              <h6>{`${utils.addCommas(1000)}$`}</h6>
            </div>
          </div>
          <div className="card my-2">
            <div className="card-body py-4">
              <h5 className="pb-2">{item?.levelText}</h5>
              <div className="d-flex align-items-center">
                <div className="pxdir-4">
                  <h6>{strings.totalProfit}</h6>
                  <div className="text-center" style={{ direction: "ltr" }}>
                    <span>{isPersian ? utils.en2faDigits(0) : 0}</span>
                    <span> / </span>
                    <span>{isPersian ? utils.en2faDigits(800) : 800} </span>
                  </div>
                </div>
                <div style={{ flex: "1" }}>
                  <div className="progress" style={{ direction: "ltr" }}>
                    <div
                      className="progress-bar progress-bar-striped bg-success"
                      role="progressbar"
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                      style={{ width: "25%" }}
                    ></div>
                  </div>
                </div>
              </div>
              {renderRules()}
              <div className="d-flex">
                <div
                  className="card my-2 bg-light mxdir-1"
                  style={{ boxShadow: "none", flex: "1" }}
                >
                  <div className="card-body py-2 px-1">
                    <h6 className="text-center">{strings.maxDailyLoss}</h6>
                    {dailyLossChartOptions && dailyLossSeries && (
                      <Chart
                        options={dailyLossChartOptions}
                        series={dailyLossSeries}
                        width="100%"
                        height={155}
                        type="radialBar"
                      />
                    )}
                    <div className="text-center" style={{ direction: "ltr" }}>
                      <span>{isPersian ? utils.en2faDigits(0) : 0}</span>
                      <span> / </span>
                      <span>{isPersian ? utils.en2faDigits(800) : 800} </span>
                    </div>
                  </div>
                </div>
                <div
                  className={`card my-2 bg-light ${
                    isPersian ? "mr-1" : "ml-1"
                  }`}
                  style={{ boxShadow: "none", flex: "1" }}
                >
                  <div className="card-body py-2 px-1">
                    <h6 className="text-center">{strings.maxTotalLoss}</h6>
                    {totalLossChartOptions && totalLossSeries && (
                      <Chart
                        options={totalLossChartOptions}
                        series={totalLossSeries}
                        width="100%"
                        height={155}
                        type="radialBar"
                      />
                    )}
                    <div className="text-center" style={{ direction: "ltr" }}>
                      <span>{isPersian ? utils.en2faDigits(0) : 0}</span>
                      <span> / </span>
                      <span>{isPersian ? utils.en2faDigits(800) : 800} </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col col-md-7 col-12 pxdir-0">
          {renderAccountDetails()}
        </div>
        <div className="col col-md-5 col-12">{renderParameters()}</div>
      </div>
    </BlankPage>
  );
};

export default AnalyzeChallenge;
