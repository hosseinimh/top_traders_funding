import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

import { BlankPage, Span } from "../../../components";
import utils from "../../../../utils/Utils";
import { PageUtils } from "./PageUtils";
import { useLocale } from "../../../../hooks";

var chart;

const AnalyzeChallenge = () => {
  const [profits, setProfits] = useState([10000, 9985]);
  const [equity, setEquity] = useState(9985);
  const { analyzeChallengePage: strings, general } = useLocale();
  const pageUtils = new PageUtils();

  useEffect(() => {
    const interval = setInterval(() => {
      const sign = Math.floor(Math.random() * 3) % 3 === 0 ? -1 : 1;
      const p = Math.floor(Math.random() * 5);
      setEquity((equity) => equity + sign * p);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (!profits || profits.length === 0) {
      return;
    }

    if (chart) {
      chart.destroy();
    }

    chart = new Chart(document.getElementById("account-chart"), {
      type: "line",
      data: {
        labels: Array.from({ length: profits.length }, (_, i) => i + 1),
        datasets: [
          {
            data: profits,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }, [profits]);

  const renderAccountInfoItem = (item, value) => (
    <div>
      <span className="ml-1">{item}:</span>
      <Span className="font-weight-bolder">{value}</Span>
    </div>
  );

  const renderAccountDetailsRow = (item1, value1, item2, value2) => (
    <div className="d-flex justify-content-between">
      <div className="d-flex justify-content-between w-50 border-light border-end ml-2">
        <span className="text-secondary">{item1}:</span>
        <Span>{value1}</Span>
      </div>
      <div className="d-flex justify-content-between w-50">
        <span className="text-secondary">{item2}:</span>
        <Span>-</Span>
      </div>
    </div>
  );

  return (
    <BlankPage pageUtils={pageUtils}>
      <div className="row mb-4">
        <div className="col col-12">
          <div className="card mb-2">
            <div className="card-body" style={{ paddingBottom: "1.25rem" }}>
              <div className="d-flex justify-content-between">
                {renderAccountInfoItem(
                  strings.accountNo,
                  utils.en2faDigits(2367896)
                )}
                {renderAccountInfoItem(
                  strings.platform,
                  utils.en2faDigits("RoboForex".toUpperCase())
                )}
                {renderAccountInfoItem(strings.equity, `${equity}$`)}
              </div>
            </div>
          </div>
        </div>
        <div className="col col-12">
          <div className="card my-2">
            <div className="card-body" style={{ paddingBottom: "1.25rem" }}>
              <div
                style={{
                  display: "inline-block",
                  position: "relative",
                  height: "400px",
                }}
              >
                <canvas id="account-chart" width="800" height="400"></canvas>
              </div>
            </div>
          </div>
        </div>
        <div className="col col-12">
          <div className="card my-2">
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
        </div>
      </div>
    </BlankPage>
  );
};

export default AnalyzeChallenge;
