import React from "react";
import { useSelector } from "react-redux";

import {
  InputTextColumn,
  ListPage,
  Modal,
  TableFooter,
  TableItems,
} from "../../../../components";
import { PageUtils } from "./PageUtils";
import { useLocale } from "../../../../../hooks";

const VerifyUserRequests = () => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const pageState = useSelector((state) => state.pageReducer);
  const columnsCount = 4;
  const { usersPage: strings, general } = useLocale();
  const pageUtils = new PageUtils();

  const renderModal = () => (
    <Modal id="verifyRequestModal" title={strings.accountDetails}>
      <InputTextColumn
        field="accountNo"
        readonly={true}
        showLabel
        icon="icon-size4 icon-clickable"
        value={pageState?.props?.item?.accountNo}
      />
      <InputTextColumn
        field="server"
        readonly={true}
        showLabel
        icon="icon-size4 icon-clickable"
        value={pageState?.props?.item?.server}
      />
    </Modal>
  );

  const renderHeader = () => (
    <tr>
      <th style={{ width: "150px" }}>{strings.username}</th>
      <th style={{ width: "150px" }}>{strings.nameFamily}</th>
      <th style={{ width: "150px" }}>{strings.email}</th>
      <th>{general.actions}</th>
    </tr>
  );

  const renderItems = () => {
    const children = pageState?.props?.items?.map((item) => (
      <tr key={item.id}>
        <td>{item.username}</td>
        <td>{`${item.name} ${item.family}`}</td>
        <td>{item.email}</td>
        <td>
          <button
            type="button"
            className="btn btn-primary mx-rdir-10"
            disabled={layoutState?.loading}
            onClick={(e) =>
              pageUtils?.onShowModal(e, "verifyRequestModal", item)
            }
            title={strings.accountDetails}
          >
            {strings.accountDetails}
          </button>
        </td>
      </tr>
    ));

    return <TableItems columnsCount={columnsCount}>{children}</TableItems>;
  };

  const renderFooter = () => (
    <TableFooter columnsCount={columnsCount} pageUtils={pageUtils} />
  );

  return (
    <ListPage
      pageUtils={pageUtils}
      table={{ renderHeader, renderItems, renderFooter }}
      hasAdd={false}
    >
      {pageState?.props?.item && renderModal()}
    </ListPage>
  );
};

export default VerifyUserRequests;
