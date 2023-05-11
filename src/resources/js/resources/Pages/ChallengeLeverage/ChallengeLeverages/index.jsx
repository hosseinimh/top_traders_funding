import React from "react";
import { useSelector } from "react-redux";

import { ListPage, TableItems } from "../../../components";
import utils from "../../../../utils/Utils";
import { PageUtils } from "./PageUtils";
import { useLocale } from "../../../../hooks";

const ChallengeLeverages = () => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const pageState = useSelector((state) => state.pageReducer);
  const columnsCount = 2;
  const { challengeLeveragesPage: strings, general } = useLocale();
  const isPersian = general.locale === "فارسی" ? true : false;
  const pageUtils = new PageUtils();

  const renderHeader = () => (
    <tr>
      <th scope="col" style={{ width: "50px" }}>
        #
      </th>
      <th scope="col">{strings.value}</th>
    </tr>
  );

  const renderItems = () => {
    const children = pageState?.props?.items?.map((item, index) => (
      <React.Fragment key={item.id}>
        <tr>
          <td scope="row">
            {isPersian ? utils.en2faDigits(index + 1) : index + 1}
          </td>
          <td>
            {isPersian
              ? utils.en2faDigits(utils.addCommas(item.value))
              : utils.addCommas(item.value)}
          </td>
        </tr>
        <tr>
          <td colSpan={columnsCount}>
            <button
              type="button"
              className="btn btn-warning mb-2 px-4 mxdir-2"
              onClick={() => pageUtils.onEdit(item)}
              title={general.edit}
              disabled={layoutState?.loading}
            >
              {general.edit}
            </button>
          </td>
        </tr>
      </React.Fragment>
    ));

    return <TableItems columnsCount={columnsCount} children={children} />;
  };

  return (
    <ListPage
      pageUtils={pageUtils}
      table={{ renderHeader, renderItems }}
    ></ListPage>
  );
};

export default ChallengeLeverages;