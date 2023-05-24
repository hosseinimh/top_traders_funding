import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import {
  InputTextColumn,
  ListPage,
  Modal,
  TableFooter,
  TableItems,
} from "../../../components";
import utils from "../../../../utils/Utils";
import { PageUtils } from "./PageUtils";
import { useLocale } from "../../../../hooks";
import { CHALLENGE_STATUSES } from "../../../../constants";

const Challenges = () => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const pageState = useSelector((state) => state.pageReducer);
  const columnsCount = 7;
  const { challengesAdminPage: strings, general } = useLocale();
  const pageUtils = new PageUtils();

  useEffect(() => {
    if (!layoutState?.shownModal) {
      pageUtils?.onCloseModal();
    }
  }, [layoutState?.shownModal]);

  const renderModal = () => (
    <Modal
      id="accountModal"
      title={strings.account}
      show={pageState?.props?.showModal}
    >
      <InputTextColumn
        field="accountNo"
        readonly={true}
        showLabel
        icon="icon-size4 icon-clickable"
        iconClick={() => pageUtils?.onCopy("accountNo")}
        value={pageState?.props?.item?.accountNo}
      />
      <InputTextColumn
        field="server"
        readonly={true}
        showLabel
        icon="icon-size4"
        iconClick={() => pageUtils?.onCopy("server")}
        value={pageState?.props?.item?.server}
      />
      <InputTextColumn
        field="token"
        readonly={true}
        showLabel
        icon="icon-size4"
        iconClick={() => pageUtils?.onCopy("token")}
        value={pageState?.props?.item?.token}
      />
    </Modal>
  );

  const renderHeader = () => (
    <tr>
      <th scope="col" style={{ width: "50px" }}>
        #
      </th>
      <th scope="col" style={{ width: "150px" }}>
        {strings.user}
      </th>
      <th scope="col" style={{ width: "150px" }}>
        {strings.accountNo}
      </th>
      <th scope="col" style={{ width: "150px" }}>
        {strings.status}
      </th>
      <th scope="col">{strings.equity}</th>
      <th scope="col" style={{ width: "150px" }}>
        {strings.server}
      </th>
      <th scope="col" style={{ width: "150px" }}>
        {strings.level}
      </th>
    </tr>
  );

  const renderItems = () => {
    const children = pageState?.props?.items?.map((item, index) => (
      <React.Fragment key={item.id}>
        <tr>
          <td>
            {utils.en2faDigits(
              (pageState?.props?.pageNumber - 1) * 10 + index + 1
            )}
          </td>
          <td>{item.username}</td>
          <td>{item.accountNo === 0 ? "-" : item.accountNo}</td>
          <td>{item.statusText}</td>
          <td>
            {item.status === CHALLENGE_STATUSES.WAITING_VERIFICATION
              ? "-"
              : item.equity}
          </td>
          <td>{item.server}</td>
          <td>{item.levelText}</td>
        </tr>
        <tr>
          <td colSpan={columnsCount}>
            {item.status === CHALLENGE_STATUSES.WAITING_VERIFICATION && (
              <>
                <button
                  type="button"
                  className="btn btn-blue mxdir-5"
                  onClick={() => pageUtils.onEdit(item)}
                  title={general.edit}
                  disabled={layoutState?.loading}
                >
                  {general.edit}
                </button>
                <button
                  type="button"
                  className="btn btn-green mxdir-5"
                  disabled={layoutState?.loading}
                  onClick={() => pageUtils.onVerified(item)}
                  title={strings.verify}
                >
                  {strings.verify}
                </button>
              </>
            )}
            {item.status === CHALLENGE_STATUSES.WAITING_TRADE && (
              <>
                <button
                  type="button"
                  className="btn btn-blue mxdir-5"
                  disabled={layoutState?.loading}
                  onClick={() =>
                    pageUtils?.onShowAccountModal("accountModal", item)
                  }
                  title={strings.account}
                >
                  {strings.account}
                </button>
              </>
            )}
          </td>
        </tr>
      </React.Fragment>
    ));

    return <TableItems columnsCount={columnsCount} children={children} />;
  };

  const renderFooter = () => (
    <TableFooter columnsCount={columnsCount} pageUtils={pageUtils} />
  );

  return (
    <>
      <ListPage
        pageUtils={pageUtils}
        table={{ renderHeader, renderItems, renderFooter }}
        hasAdd={false}
      >
        {pageState?.props?.showModal && renderModal()}
      </ListPage>
    </>
  );
};

export default Challenges;
