import React from "react";
import { useSelector } from "react-redux";

import { ListPage, TableItems } from "../../../components";
import utils from "../../../../utils/Utils";
import { PageUtils } from "./PageUtils";
import { useLocale } from "../../../../hooks";

const Servers = () => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const pageState = useSelector((state) => state.pageReducer);
  const columnsCount = 3;
  const { addServerPage: strings, general } = useLocale();
  const pageUtils = new PageUtils();

  const renderHeader = () => (
    <tr>
      <th scope="col" style={{ width: "50px" }}>
        #
      </th>
      <th scope="col">{strings.name}</th>
      <th scope="col">{strings.title}</th>
    </tr>
  );

  const renderItems = () => {
    const children = pageState?.props?.items?.map((item, index) => (
      <React.Fragment key={item.id}>
        <tr>
          <td scope="row">{utils.en2faDigits(index + 1)}</td>
          <td>{item.name}</td>
          <td>{item.title}</td>
        </tr>
        <tr>
          <td colSpan={columnsCount}>
            <button
              type="button"
              className="btn btn-warning mb-2 px-4 ml-2"
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

export default Servers;
