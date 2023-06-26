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
import { STORAGE_PATH } from "../../../../../constants";

const VerifyUserRequests = () => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const pageState = useSelector((state) => state.pageReducer);
  const columnsCount = 4;
  const { verifyUserRequestsPage: strings, general } = useLocale();
  const pageUtils = new PageUtils();

  const renderModal = () => (
    <Modal
      id="verifyRequestModal"
      title={`${pageState?.props?.item?.name} ${pageState?.props?.item?.family} - [ ${pageState?.props?.item?.username} ]`}
      footer={
        <div className="btns d-flex m-td-10 m-lr-20">
          <button
            className="btn btn-success"
            type="button"
            title={strings.verify}
            onClick={() =>
              pageUtils.onVerifyRequest(pageState?.props?.item?.id)
            }
            disabled={layoutState?.loading}
          >
            {strings.verify}
          </button>
        </div>
      }
    >
      <InputTextColumn
        field="name"
        readonly={true}
        showLabel
        icon="icon-user"
        value={pageState?.props?.item?.name}
      />
      <InputTextColumn
        field="family"
        readonly={true}
        showLabel
        icon="icon-user"
        value={pageState?.props?.item?.family}
      />
      <InputTextColumn
        field="fatherName"
        readonly={true}
        showLabel
        icon="icon-personalcard4"
        value={pageState?.props?.item?.fatherName}
      />
      <InputTextColumn
        field="nationalNo"
        readonly={true}
        showLabel
        textAlign="left"
        icon="icon-personalcard4"
        value={pageState?.props?.item?.nationalNo}
      />
      <InputTextColumn
        field="birthDate"
        readonly={true}
        showLabel
        textAlign="left"
        icon="icon-calendar-1"
        value={pageState?.props?.item?.birthDate}
      />
      <InputTextColumn
        field="gender"
        readonly={true}
        showLabel
        icon="icon-user"
        value={pageState?.props?.item?.genderText}
      />
      <InputTextColumn
        field="mobile"
        readonly={true}
        showLabel
        textAlign="left"
        icon="icon-mobile"
        value={pageState?.props?.item?.mobile}
      />
      <InputTextColumn
        field="tel"
        readonly={true}
        showLabel
        textAlign="left"
        icon="icon-call-calling"
        value={pageState?.props?.item?.tel}
      />
      <InputTextColumn
        field="email"
        readonly={true}
        showLabel
        textAlign="left"
        icon="icon-sms4"
        value={pageState?.props?.item?.email}
      />
      <InputTextColumn
        field="address"
        readonly={true}
        showLabel
        icon="icon-location4"
        value={pageState?.props?.item?.address}
      />
      <div className="d-flex d-flex-column">
        <div className="input-info">{strings.selfieFile}</div>
        <div className="input-img input-bg input-border mb-30">
          <a
            href={`${STORAGE_PATH}/users/selfies/${pageState?.props?.item?.selfieFile}`}
            target="_blank"
            rel="noReferrer"
          >
            <img
              src={`${STORAGE_PATH}/users/selfies/${pageState?.props?.item?.selfieFile}`}
            />
          </a>
        </div>
      </div>
      <div className="d-flex d-flex-column">
        <div className="input-info">{strings.identityFile}</div>
        <div className="input-img input-bg input-border mb-30">
          <a
            href={`${STORAGE_PATH}/users/identities/${pageState?.props?.item?.identityFile}`}
            target="_blank"
            rel="noReferrer"
          >
            <img
              src={`${STORAGE_PATH}/users/identities/${pageState?.props?.item?.identityFile}`}
            />
          </a>
        </div>
      </div>
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
            title={strings.viewUser}
          >
            {strings.viewUser}
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
