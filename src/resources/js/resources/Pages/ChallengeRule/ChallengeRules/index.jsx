import React from "react";
import { useSelector } from "react-redux";

import { ColumnRow, ListPage, TableItems } from "../../../components";
import utils from "../../../../utils/Utils";
import { PageUtils } from "./PageUtils";
import { useLocale } from "../../../../hooks";

const ChallengeRules = () => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const pageState = useSelector((state) => state.pageReducer);
  const columnsCount = 5;
  const { challengeRulesPage: strings, general } = useLocale();
  const isPersian = general.locale === "فارسی" ? true : false;
  const pageUtils = new PageUtils();

  const renderHeader = () => (
    <tr>
      <th scope="col" style={{ width: "25%" }}></th>
      <th scope="col" style={{ textAlign: "center" }}>
        {strings.level1}
      </th>
      <th scope="col" style={{ textAlign: "center" }}>
        {strings.level2}
      </th>
      <th scope="col" style={{ textAlign: "center" }}>
        {strings.realAccount}
      </th>
      <th scope="col" style={{ textAlign: "center" }}>
        {strings.freeAccount}
      </th>
    </tr>
  );

  const renderItems = () => {
    let children;
    if (!pageState?.props?.item) {
      children = <></>;
    } else {
      children = [
        <React.Fragment key={1}>
          <tr style={{ textAlign: "center" }}>
            <td scope="row">{strings.duration}</td>
            <td>
              {pageState.props.item.duration1 === 0
                ? "-"
                : isPersian
                ? utils.en2faDigits(
                    utils.addCommas(pageState.props.item.duration1)
                  )
                : utils.addCommas(pageState.props.item.duration1)}
            </td>
            <td>
              {pageState.props.item.duration2 === 0
                ? "-"
                : isPersian
                ? utils.en2faDigits(
                    utils.addCommas(pageState.props.item.duration2)
                  )
                : utils.addCommas(pageState.props.item.duration2)}
            </td>
            <td>
              {pageState.props.item.durationReal === 0
                ? "-"
                : pageState.props.item.durationReal === 0
                ? strings.noLimit
                : isPersian
                ? utils.en2faDigits(
                    utils.addCommas(pageState.props.item.durationReal)
                  )
                : utils.addCommas(pageState.props.item.durationReal)}
            </td>
            <td>
              {pageState.props.item.durationFree === 0
                ? "-"
                : isPersian
                ? utils.en2faDigits(
                    utils.addCommas(pageState.props.item.durationFree)
                  )
                : utils.addCommas(pageState.props.item.durationFree)}
            </td>
          </tr>
          <tr style={{ textAlign: "center" }}>
            <td scope="row">{strings.dailySl}</td>
            <td>
              {pageState.props.item.dailySl1 === 0
                ? "-"
                : isPersian
                ? utils.en2faDigits(
                    utils.addCommas(pageState.props.item.dailySl1)
                  )
                : utils.addCommas(pageState.props.item.dailySl1)}
              {pageState.props.item.dailySl1 !== 0 && (
                <span className="mxdir-1">%</span>
              )}
            </td>
            <td>
              {pageState.props.item.dailySl2 === 0
                ? "-"
                : isPersian
                ? utils.en2faDigits(
                    utils.addCommas(pageState.props.item.dailySl2)
                  )
                : utils.addCommas(pageState.props.item.dailySl2)}
              {pageState.props.item.dailySl2 !== 0 && (
                <span className="mxdir-1">%</span>
              )}
            </td>
            <td>
              {pageState.props.item.dailySlReal === 0
                ? "-"
                : isPersian
                ? utils.en2faDigits(
                    utils.addCommas(pageState.props.item.dailySlReal)
                  )
                : utils.addCommas(pageState.props.item.dailySlReal)}
              {pageState.props.item.dailySlReal !== 0 && (
                <span className="mxdir-1">%</span>
              )}
            </td>
            <td>
              {pageState.props.item.dailySlFree === 0
                ? "-"
                : isPersian
                ? utils.en2faDigits(
                    utils.addCommas(pageState.props.item.dailySlFree)
                  )
                : utils.addCommas(pageState.props.item.dailySlFree)}
              {pageState.props.item.dailySlFree !== 0 && (
                <span className="mxdir-1">%</span>
              )}
            </td>
          </tr>
          <tr style={{ textAlign: "center" }}>
            <td scope="row">{strings.totalSl}</td>
            <td>
              {pageState.props.item.totalSl1 === 0
                ? "-"
                : isPersian
                ? utils.en2faDigits(
                    utils.addCommas(pageState.props.item.totalSl1)
                  )
                : utils.addCommas(pageState.props.item.totalSl1)}
              {pageState.props.item.totalSl1 !== 0 && (
                <span className="mxdir-1">%</span>
              )}
            </td>
            <td>
              {pageState.props.item.totalSl2 === 0
                ? "-"
                : isPersian
                ? utils.en2faDigits(
                    utils.addCommas(pageState.props.item.totalSl2)
                  )
                : utils.addCommas(pageState.props.item.totalSl2)}
              {pageState.props.item.totalSl2 !== 0 && (
                <span className="mxdir-1">%</span>
              )}
            </td>
            <td>
              {pageState.props.item.totalSlReal === 0
                ? "-"
                : isPersian
                ? utils.en2faDigits(
                    utils.addCommas(pageState.props.item.totalSlReal)
                  )
                : utils.addCommas(pageState.props.item.totalSlReal)}
              {pageState.props.item.totalSlReal !== 0 && (
                <span className="mxdir-1">%</span>
              )}
            </td>
            <td>
              {pageState.props.item.totalSlFree === 0
                ? "-"
                : isPersian
                ? utils.en2faDigits(
                    utils.addCommas(pageState.props.item.totalSlFree)
                  )
                : utils.addCommas(pageState.props.item.totalSlFree)}
              {pageState.props.item.totalSlFree !== 0 && (
                <span className="mxdir-1">%</span>
              )}
            </td>
          </tr>
          <tr style={{ textAlign: "center" }}>
            <td scope="row">{strings.target}</td>
            <td>
              {pageState.props.item.target1 === 0
                ? "-"
                : isPersian
                ? utils.en2faDigits(
                    utils.addCommas(pageState.props.item.target1)
                  )
                : utils.addCommas(pageState.props.item.target1)}
              {pageState.props.item.target1 !== 0 && (
                <span className="mxdir-1">%</span>
              )}
            </td>
            <td>
              {pageState.props.item.target2 === 0
                ? "-"
                : isPersian
                ? utils.en2faDigits(
                    utils.addCommas(pageState.props.item.target2)
                  )
                : utils.addCommas(pageState.props.item.target2)}
              {pageState.props.item.target2 !== 0 && (
                <span className="mxdir-1">%</span>
              )}
            </td>
            <td>
              {pageState.props.item.targetReal === 0
                ? "-"
                : isPersian
                ? utils.en2faDigits(
                    utils.addCommas(pageState.props.item.targetReal)
                  )
                : utils.addCommas(pageState.props.item.targetReal)}
              {pageState.props.item.targetReal !== 0 && (
                <span className="mxdir-1">%</span>
              )}
            </td>
            <td>
              {pageState.props.item.targetFree === 0
                ? "-"
                : isPersian
                ? utils.en2faDigits(
                    utils.addCommas(pageState.props.item.targetFree)
                  )
                : utils.addCommas(pageState.props.item.targetFree)}
              {pageState.props.item.targetFree !== 0 && (
                <span className="mxdir-1">%</span>
              )}
            </td>
          </tr>
          <tr style={{ textAlign: "center" }}>
            <td scope="row">{strings.tradeDays}</td>
            <td>
              {pageState.props.item.tradeDays1 === 0
                ? "-"
                : isPersian
                ? utils.en2faDigits(
                    utils.addCommas(pageState.props.item.tradeDays1)
                  )
                : utils.addCommas(pageState.props.item.tradeDays1)}
            </td>
            <td>
              {pageState.props.item.tradeDays2 === 0
                ? "-"
                : isPersian
                ? utils.en2faDigits(
                    utils.addCommas(pageState.props.item.tradeDays2)
                  )
                : utils.addCommas(pageState.props.item.tradeDays2)}
            </td>
            <td>
              {pageState.props.item.tradeDaysReal === 0
                ? "-"
                : isPersian
                ? utils.en2faDigits(
                    utils.addCommas(pageState.props.item.tradeDaysReal)
                  )
                : utils.addCommas(pageState.props.item.tradeDaysReal)}
            </td>
            <td>
              {pageState.props.item.tradeDaysFree === 0
                ? "-"
                : isPersian
                ? utils.en2faDigits(
                    utils.addCommas(pageState.props.item.tradeDaysFree)
                  )
                : utils.addCommas(pageState.props.item.tradeDaysFree)}
            </td>
          </tr>
        </React.Fragment>,
      ];
    }
    return <TableItems columnsCount={columnsCount} children={children} />;
  };

  return (
    <ListPage
      pageUtils={pageUtils}
      hasAdd={false}
      table={{ renderHeader, renderItems }}
    >
      <div className="row mb-2">
        <div className="col-sm-12">
          <button
            className="btn btn-warning px-4"
            type="button"
            title={strings.edit}
            onClick={() => pageUtils.onEdit({ item: null })}
            disabled={layoutState?.loading}
          >
            {strings.edit}
          </button>
        </div>
      </div>
    </ListPage>
  );
};

export default ChallengeRules;
