import React from "react";
import { useSelector } from "react-redux";

import {
  BlankPage,
  InputButtonRadiosColumn,
  TableCard,
  TableItems,
} from "../../../../components";
import { PageUtils } from "./PageUtils";
import { useLocale } from "../../../../../hooks";
import { CHALLENGE_LEVELS } from "../../../../../constants";
import utils from "../../../../../utils/Utils";

const BaseTakeChallenge = ({ level }) => {
  const pageState = useSelector((state) => state.pageReducer);
  const { takeChallenge: strings, general } = useLocale();
  const columnsCount = level === CHALLENGE_LEVELS.FREE ? 2 : 4;
  const isPersian = general.locale === "فارسی" ? true : false;
  const pageUtils = new PageUtils(level);

  const renderHeader = () => (
    <tr>
      <th
        scope="col"
        style={{ width: level === CHALLENGE_LEVELS.FREE ? "50%" : "25%" }}
      ></th>
      {level === CHALLENGE_LEVELS.FREE && (
        <th scope="col" style={{ textAlign: "center" }}>
          {strings.freeAccount}
        </th>
      )}
      {level !== CHALLENGE_LEVELS.FREE && (
        <>
          <th scope="col" style={{ textAlign: "center" }}>
            {strings.level1}
          </th>
          <th scope="col" style={{ textAlign: "center" }}>
            {strings.level2}
          </th>
          <th scope="col" style={{ textAlign: "center" }}>
            {strings.realAccount}
          </th>
        </>
      )}
    </tr>
  );

  const renderItems = () => {
    let children;
    if (!pageState?.props?.rules) {
      children = <></>;
    } else {
      children = [
        <React.Fragment key={1}>
          <tr style={{ textAlign: "center" }}>
            <td scope="row">{strings.duration}</td>
            {level !== CHALLENGE_LEVELS.FREE && (
              <>
                <td>
                  {pageState.props.rules.duration1 === 0
                    ? "-"
                    : isPersian
                    ? utils.en2faDigits(
                        utils.addCommas(pageState.props.rules.duration1)
                      )
                    : utils.addCommas(pageState.props.rules.duration1)}
                </td>
                <td>
                  {pageState.props.rules.duration2 === 0
                    ? "-"
                    : isPersian
                    ? utils.en2faDigits(
                        utils.addCommas(pageState.props.rules.duration2)
                      )
                    : utils.addCommas(pageState.props.rules.duration2)}
                </td>
                <td>
                  {pageState.props.rules.durationReal === 0
                    ? "-"
                    : pageState.props.rules.durationReal === 0
                    ? strings.noLimit
                    : isPersian
                    ? utils.en2faDigits(
                        utils.addCommas(pageState.props.rules.durationReal)
                      )
                    : utils.addCommas(pageState.props.rules.durationReal)}
                </td>
              </>
            )}
            {level === CHALLENGE_LEVELS.FREE && (
              <td>
                {pageState.props.rules.durationFree === 0
                  ? "-"
                  : isPersian
                  ? utils.en2faDigits(
                      utils.addCommas(pageState.props.rules.durationFree)
                    )
                  : utils.addCommas(pageState.props.rules.durationFree)}
              </td>
            )}
          </tr>
          <tr style={{ textAlign: "center" }}>
            <td scope="row">{strings.dailySl}</td>
            {level !== CHALLENGE_LEVELS.FREE && (
              <>
                <td>
                  {pageState.props.rules.dailySl1 === 0
                    ? "-"
                    : isPersian
                    ? utils.en2faDigits(
                        utils.addCommas(pageState.props.rules.dailySl1)
                      )
                    : utils.addCommas(pageState.props.rules.dailySl1)}
                  {pageState.props.rules.dailySl1 !== 0 && (
                    <span className="mxdir-1">%</span>
                  )}
                </td>
                <td>
                  {pageState.props.rules.dailySl2 === 0
                    ? "-"
                    : isPersian
                    ? utils.en2faDigits(
                        utils.addCommas(pageState.props.rules.dailySl2)
                      )
                    : utils.addCommas(pageState.props.rules.dailySl2)}
                  {pageState.props.rules.dailySl2 !== 0 && (
                    <span className="mxdir-1">%</span>
                  )}
                </td>
                <td>
                  {pageState.props.rules.dailySlReal === 0
                    ? "-"
                    : isPersian
                    ? utils.en2faDigits(
                        utils.addCommas(pageState.props.rules.dailySlReal)
                      )
                    : utils.addCommas(pageState.props.rules.dailySlReal)}
                  {pageState.props.rules.dailySlReal !== 0 && (
                    <span className="mxdir-1">%</span>
                  )}
                </td>
              </>
            )}
            {level === CHALLENGE_LEVELS.FREE && (
              <td>
                {pageState.props.rules.dailySlFree === 0
                  ? "-"
                  : isPersian
                  ? utils.en2faDigits(
                      utils.addCommas(pageState.props.rules.dailySlFree)
                    )
                  : utils.addCommas(pageState.props.rules.dailySlFree)}
                {pageState.props.rules.dailySlFree !== 0 && (
                  <span className="mxdir-1">%</span>
                )}
              </td>
            )}
          </tr>
          <tr style={{ textAlign: "center" }}>
            <td scope="row">{strings.totalSl}</td>
            {level !== CHALLENGE_LEVELS.FREE && (
              <>
                <td>
                  {pageState.props.rules.totalSl1 === 0
                    ? "-"
                    : isPersian
                    ? utils.en2faDigits(
                        utils.addCommas(pageState.props.rules.totalSl1)
                      )
                    : utils.addCommas(pageState.props.rules.totalSl1)}
                  {pageState.props.rules.totalSl1 !== 0 && (
                    <span className="mxdir-1">%</span>
                  )}
                </td>
                <td>
                  {pageState.props.rules.totalSl2 === 0
                    ? "-"
                    : isPersian
                    ? utils.en2faDigits(
                        utils.addCommas(pageState.props.rules.totalSl2)
                      )
                    : utils.addCommas(pageState.props.rules.totalSl2)}
                  {pageState.props.rules.totalSl2 !== 0 && (
                    <span className="mxdir-1">%</span>
                  )}
                </td>
                <td>
                  {pageState.props.rules.totalSlReal === 0
                    ? "-"
                    : isPersian
                    ? utils.en2faDigits(
                        utils.addCommas(pageState.props.rules.totalSlReal)
                      )
                    : utils.addCommas(pageState.props.rules.totalSlReal)}
                  {pageState.props.rules.totalSlReal !== 0 && (
                    <span className="mxdir-1">%</span>
                  )}
                </td>
              </>
            )}
            {level === CHALLENGE_LEVELS.FREE && (
              <td>
                {pageState.props.rules.totalSlFree === 0
                  ? "-"
                  : isPersian
                  ? utils.en2faDigits(
                      utils.addCommas(pageState.props.rules.totalSlFree)
                    )
                  : utils.addCommas(pageState.props.rules.totalSlFree)}
                {pageState.props.rules.totalSlFree !== 0 && (
                  <span className="mxdir-1">%</span>
                )}
              </td>
            )}
          </tr>
          <tr style={{ textAlign: "center" }}>
            <td scope="row">{strings.target}</td>
            {level !== CHALLENGE_LEVELS.FREE && (
              <>
                <td>
                  {pageState.props.rules.target1 === 0
                    ? "-"
                    : isPersian
                    ? utils.en2faDigits(
                        utils.addCommas(pageState.props.rules.target1)
                      )
                    : utils.addCommas(pageState.props.rules.target1)}
                  {pageState.props.rules.target1 !== 0 && (
                    <span className="mxdir-1">%</span>
                  )}
                </td>
                <td>
                  {pageState.props.rules.target2 === 0
                    ? "-"
                    : isPersian
                    ? utils.en2faDigits(
                        utils.addCommas(pageState.props.rules.target2)
                      )
                    : utils.addCommas(pageState.props.rules.target2)}
                  {pageState.props.rules.target2 !== 0 && (
                    <span className="mxdir-1">%</span>
                  )}
                </td>
                <td>
                  {pageState.props.rules.targetReal === 0
                    ? "-"
                    : isPersian
                    ? utils.en2faDigits(
                        utils.addCommas(pageState.props.rules.targetReal)
                      )
                    : utils.addCommas(pageState.props.rules.targetReal)}
                  {pageState.props.rules.targetReal !== 0 && (
                    <span className="mxdir-1">%</span>
                  )}
                </td>
              </>
            )}
            {level === CHALLENGE_LEVELS.FREE && (
              <td>
                {pageState.props.rules.targetFree === 0
                  ? "-"
                  : isPersian
                  ? utils.en2faDigits(
                      utils.addCommas(pageState.props.rules.targetFree)
                    )
                  : utils.addCommas(pageState.props.rules.targetFree)}
                {pageState.props.rules.targetFree !== 0 && (
                  <span className="mxdir-1">%</span>
                )}
              </td>
            )}
          </tr>
          <tr style={{ textAlign: "center" }}>
            <td scope="row">{strings.tradeDays}</td>
            {level !== CHALLENGE_LEVELS.FREE && (
              <>
                <td>
                  {pageState.props.rules.tradeDays1 === 0
                    ? "-"
                    : isPersian
                    ? utils.en2faDigits(
                        utils.addCommas(pageState.props.rules.tradeDays1)
                      )
                    : utils.addCommas(pageState.props.rules.tradeDays1)}
                </td>
                <td>
                  {pageState.props.rules.tradeDays2 === 0
                    ? "-"
                    : isPersian
                    ? utils.en2faDigits(
                        utils.addCommas(pageState.props.rules.tradeDays2)
                      )
                    : utils.addCommas(pageState.props.rules.tradeDays2)}
                </td>
                <td>
                  {pageState.props.rules.tradeDaysReal === 0
                    ? "-"
                    : isPersian
                    ? utils.en2faDigits(
                        utils.addCommas(pageState.props.rules.tradeDaysReal)
                      )
                    : utils.addCommas(pageState.props.rules.tradeDaysReal)}
                </td>
              </>
            )}
            {level === CHALLENGE_LEVELS.FREE && (
              <td>
                {pageState.props.rules.tradeDaysFree === 0
                  ? "-"
                  : isPersian
                  ? utils.en2faDigits(
                      utils.addCommas(pageState.props.rules.tradeDaysFree)
                    )
                  : utils.addCommas(pageState.props.rules.tradeDaysFree)}
              </td>
            )}
          </tr>
        </React.Fragment>,
      ];
    }
    return <TableItems columnsCount={columnsCount} children={children} />;
  };

  return (
    <BlankPage pageUtils={pageUtils}>
      <div className="row">
        <div className="col-12">
          <InputButtonRadiosColumn
            name={"balance"}
            strings={strings}
            items={pageState?.props?.balances}
          />
        </div>
        <div className="col-12">
          <InputButtonRadiosColumn
            name={"server"}
            strings={strings}
            separate={true}
            items={pageState?.props?.servers}
          />
        </div>
        <div className="col-12">
          <InputButtonRadiosColumn
            name={"platform"}
            strings={strings}
            separate={true}
            items={pageState?.props?.platforms}
          />
          <InputButtonRadiosColumn
            name={"leverage"}
            strings={strings}
            items={pageState?.props?.leverages}
          />
        </div>
        <div className="col-12 border-top pt-4">
          <TableCard table={{ renderHeader, renderItems }} />
        </div>
        <div className="col-12 border-top pt-4">
          <div
            className="bg-dark text-white text-justify p-3 pt-4"
            style={{ borderRadius: "5px" }}
          >
            <h5 className="text-center mb-4">{strings.rulesTitle}</h5>
            {strings.rulesContent}
          </div>
        </div>
        <div className="col-12 py-4 text-center">
          <button
            type="button"
            className="btn btn-success px-4"
            onClick={pageUtils?.useForm.handleSubmit(pageUtils.onSubmit)}
          >
            {strings.register}
          </button>
        </div>
      </div>
    </BlankPage>
  );
};

export default BaseTakeChallenge;
