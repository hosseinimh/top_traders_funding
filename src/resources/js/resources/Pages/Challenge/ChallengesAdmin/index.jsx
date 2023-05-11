import React from "react";
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
  const columnsCount = 6;
  const { challengesAdminPage: strings, general } = useLocale();
  const pageUtils = new PageUtils();

  const renderVerifyModal = () => (
    <Modal id="verifyModal">
      <div className="modal-header">
        <h5 className="modal-title">{strings.verifyModalHeader}</h5>
        <button
          type="button"
          className="close"
          data-coreui-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        <p className="mb-0">{strings.verifyModalBody}</p>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-success mxdir-2"
          disabled={layoutState?.loading}
          title={strings.verify}
          onClick={() => pageUtils.onVerified()}
        >
          {strings.verify}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          disabled={layoutState?.loading}
          data-coreui-dismiss="modal"
          title={general.cancel}
        >
          {general.cancel}
        </button>
      </div>
    </Modal>
  );

  const renderHeader = () => (
    <tr>
      <th scope="col" style={{ width: "50px" }}>
        #
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
          <td scope="row">
            {utils.en2faDigits(
              (pageState?.props?.pageNumber - 1) * 10 + index + 1
            )}
          </td>
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
                  className="btn btn-warning mb-2 px-4 mxdir-2"
                  onClick={() => pageUtils.onEdit(item)}
                  title={general.edit}
                  disabled={layoutState?.loading}
                >
                  {general.edit}
                </button>
                <button
                  type="button"
                  className="btn mb-2 btn-success"
                  disabled={layoutState?.loading}
                  onClick={() => pageUtils.onVerify(item)}
                  title={strings.verify}
                >
                  {strings.verify}
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
      ></ListPage>
      {renderVerifyModal()}
    </>
  );
};

export default Challenges;
