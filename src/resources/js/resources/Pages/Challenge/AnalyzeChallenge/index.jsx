import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

import { BlankPage, Span } from "../../../components";
import utils from "../../../../utils/Utils";
import { PageUtils } from "./PageUtils";
import { useLocale } from "../../../../hooks";
import { CHALLENGE_LEVELS } from "../../../../constants";

const AnalyzeChallenge = () => {
  const [item, setItem] = useState(null);
  const [account, setAccount] = useState(null);
  const [profits, setProfits] = useState([]);
  const [todayProfit, setTodayProfit] = useState(0);
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
      // connectMetaApi();
    }
  }, [item]);

  useEffect(() => {
    if (account) {
      getProfits();
      setTimeout(() => {
        fetchAccount();
      }, 10000);
    }
  }, [account]);

  useEffect(() => {
    if (profits?.length > 0) {
      setMainChart();
      setTotalLossChart();
    }
  }, [profits]);

  useEffect(() => {
    setDailyLossChart();
  }, [todayProfit]);

  const getProfits = () => {
    const { deals } = account;
    const dealItems = deals.filter(
      (deal) =>
        deal.type === "DEAL_TYPE_BALANCE" ||
        deal?.entryType === "DEAL_ENTRY_OUT"
    );
    const today = new Date();
    let totalProfit = 0;
    let todayTotalProfit = 0;
    const profitItems = [];
    dealItems?.forEach((dealItem) => {
      totalProfit += dealItem.profit.toFixed(2);
      profitItems.push(totalProfit);
      const date = new Date(dealItem.brokerTime);
      if (
        dealItem?.entryType === "DEAL_ENTRY_OUT" &&
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
      ) {
        todayTotalProfit += dealItem.profit.toFixed(2);
      }
    });
    setProfits(profitItems);
    setTodayProfit(todayTotalProfit);
  };

  const connectMetaApi = async () => {
    await metaApi.connect(item.metaApiToken, item.metaApiAccountId);
    const result = await metaApi.sync();
    setAccount(result);
  };

  const fetchAccount = async () => {
    // const result = await metaApi.sync();
    // setAccount(result);
  };

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
    let data = [];
    let index = 1;
    profits.forEach((profit) => {
      data.push([index++, profit]);
    });
    setMainSeries([
      {
        name: "P&L",
        data: data,
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
    setDailyLossSeries([todayProfit]);
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
    let loss = 0;
    profits.forEach((profit) => {
      if (profit < 0) {
        loss += profit;
      }
    });
    setTotalLossSeries([loss]);
  };

  const renderAccountInfoItem = (item, value) => (
    <div className="my-1" style={{ textAlign: "center", flex: "1" }}>
      <span className="mxdir-1">{item}:</span>
      <Span className="font-weight-bolder">{value}</Span>
    </div>
  );

  const renderAccountInfo = () => (
    <div className="section fix-mr15">
      <div className="block pd-20">
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
      <div className="section fix-mr15">
        <div className="block">
          <div>
            <div className="section-hd d-flex-wrap">
              <div className="section-items d-flex scrollhide align-center just-between grow-1">
                <div className="item pd-10">
                  <span className="orange" id="sell-price-chart">
                    0 ~
                  </span>
                  <div className="title">
                    <i className="icon-arrow-down"></i> قیمت فروش
                  </div>
                </div>
                <div className="item pd-10">
                  <span className="orange" id="sell-price-chart">
                    0 ~
                  </span>
                  <div className="title">
                    <i className="icon-arrow-down"></i> قیمت فروش
                  </div>
                </div>
                <div className="item pd-10">
                  <span className="orange" id="sell-price-chart">
                    0 ~
                  </span>
                  <div className="title">
                    <i className="icon-arrow-down"></i> قیمت فروش
                  </div>
                </div>
                <div className="item pd-10">
                  <span className="orange" id="sell-price-chart">
                    0 ~
                  </span>
                  <div className="title">
                    <i className="icon-arrow-down"></i> قیمت فروش
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex-wrap align-center">
              <div className="chart-box"></div>
              <div className="main-user-status grow-1 pd-20">
                <div className="title">وضعیت حساب کاربری شما</div>
                <div className="status-active orange">
                  <i className="icon-award"></i>
                  احراز هویت انجام نشده است
                </div>
                <div className="main-user-status-list fix-mr10">
                  <div className="item">
                    <span>مجموع واریزی های تومانی</span>
                    <strong>0</strong>
                  </div>
                  <div className="item">
                    <span>مجموع برداشت های تومانی</span>
                    <strong>0</strong>
                  </div>
                  <div className="item">
                    <span>مجموع سفارشات تکمیل شده</span>
                    <strong>0</strong>
                  </div>
                  <div className="item">
                    <span>مجموع واریز و برداشت ارزی</span>
                    <strong>0</strong>
                  </div>
                  <div className="item">
                    <span>کارمزد معاملات کوین ها</span>
                    <strong>1</strong>
                  </div>
                  <div className="item">
                    <span>کارمزد معاملات توکن ها</span>
                    <strong>3</strong>
                  </div>
                </div>
                <div className="d-flex just-end">
                  <a
                    href="https://kifpool.me/member_v2/verify/cards"
                    className="orange upgrade"
                  >
                    ثبت کارت بانکی جدید{" "}
                    <i className="icon-arrow-square-left"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BlankPage>
  );
};

export default AnalyzeChallenge;
