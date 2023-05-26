import React from "react";
import { useSelector } from "react-redux";

import { ListPage, TableItems } from "../../../components";
import utils from "../../../../utils/Utils";
import { PageUtils } from "./PageUtils";
import { useLocale } from "../../../../hooks";

const Campaigns = () => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const pageState = useSelector((state) => state.pageReducer);
  const columnsCount = 4;
  const { campaignsPage: strings, general } = useLocale();
  const pageUtils = new PageUtils();

  const renderHeader = () => (
    <tr>
      <th scope="col" style={{ width: "50px" }}>
        #
      </th>
      <th scope="col">{strings.title}</th>
      <th scope="col" style={{ width: "100px" }}>
        {strings.status}
      </th>
      <th scope="col" style={{ width: "150px" }}>
        {general.actions}
      </th>
    </tr>
  );

  const renderItems = () => {
    const children = pageState?.props?.items?.map((item, index) => (
      <tr key={item.id}>
        <td>{utils.en2faDigits(index + 1)}</td>
        <td>{item.title}</td>
        <td>{item.isActive === 1 ? strings.active : strings.notActive}</td>
        <td colSpan={columnsCount}>
          <button
            type="button"
            className="btn btn-primary mxdir-5"
            onClick={() => pageUtils.onEdit(item)}
            title={general.edit}
            disabled={layoutState?.loading}
          >
            {general.edit}
          </button>
        </td>
      </tr>
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

export default Campaigns;
