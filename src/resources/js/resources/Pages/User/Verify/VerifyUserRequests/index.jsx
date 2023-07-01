import React from "react";
import { useSelector } from "react-redux";

import {
  InputRadioColumn,
  InputRadioContainer,
  InputSelectColumn,
  InputTextColumn,
  ListPage,
  Modal,
  TableFooter,
  TableItems,
} from "../../../../components";
import { PageUtils } from "./PageUtils";
import { useLocale } from "../../../../../hooks";
import {
  STORAGE_PATH,
  USER_VERIFICATION_REJECT_REASON,
} from "../../../../../constants";
import utils from "../../../../../utils/Utils";

const VerifyUserRequests = () => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const pageState = useSelector((state) => state.pageReducer);
  const {
    verifyUserRequestsPage: strings,
    userVerificationRejectTypes,
    general,
  } = useLocale();
  const pageUtils = new PageUtils();
  const columnsCount = 4;
  const verificationTypes = [
    {
      id: USER_VERIFICATION_REJECT_REASON.IMAGE_NOT_VALID,
      value: userVerificationRejectTypes.imageNotValid,
    },
    {
      id: USER_VERIFICATION_REJECT_REASON.IMAGE_NOT_CLEAR,
      value: userVerificationRejectTypes.imageNotClear,
    },
    {
      id: USER_VERIFICATION_REJECT_REASON.IMAGE_NOT_MATCH,
      value: userVerificationRejectTypes.imageNotMatch,
    },
  ];

  const onVerificationChanged = (e, field) => {
    if (e.target.checked) {
      if (field === "verified") {
        pageUtils.onVerifiedChanged(true);
      } else {
        pageUtils.onVerifiedChanged(false);
      }
    }
  };

  const renderModal = () => (
    <Modal
      id="verifyRequestModal"
      title={`${pageState?.props?.item?.name} ${pageState?.props?.item?.family} - [ ${pageState?.props?.item?.username} ]`}
      footer={
        <>
          <InputRadioContainer>
            <InputRadioColumn
              field="verified"
              name="verification"
              checked={true}
              onChange={(e, field) => onVerificationChanged(e, field)}
            />
            <InputRadioColumn
              field="rejected"
              name="verification"
              onChange={(e, field) => onVerificationChanged(e, field)}
            />
          </InputRadioContainer>
          {!pageState?.props?.verified && (
            <>
              <InputSelectColumn
                field="rejectReason"
                showLabel
                items={verificationTypes}
                selectedValue={USER_VERIFICATION_REJECT_REASON.IMAGE_NOT_VALID}
                onChange={(_, value) => pageUtils.onRejectReasonChanged(value)}
              />
              <div style={{ marginBottom: "5rem" }}></div>
            </>
          )}
          <div className="btns d-flex m-td-10 m-lr-20">
            {pageState?.props?.verified && (
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
            )}
            {!pageState?.props?.verified && (
              <button
                className="btn btn-dark-warning"
                type="button"
                title={strings.reject}
                onClick={() =>
                  pageUtils.onRejectRequest(pageState?.props?.item?.id)
                }
                disabled={layoutState?.loading}
              >
                {strings.reject}
              </button>
            )}
          </div>
        </>
      }
    >
      <InputTextColumn
        field="name"
        readonly={true}
        showLabel
        icon="icon-user"
        value={pageState?.props?.item?.name}
        inputStyle={{ opacity: "1" }}
      />
      <InputTextColumn
        field="family"
        readonly={true}
        showLabel
        icon="icon-user"
        value={pageState?.props?.item?.family}
        inputStyle={{ opacity: "1" }}
      />
      <InputTextColumn
        field="fatherName"
        readonly={true}
        showLabel
        icon="icon-personalcard4"
        value={pageState?.props?.item?.fatherName}
        inputStyle={{ opacity: "1" }}
      />
      <InputTextColumn
        field="nationalNo"
        readonly={true}
        showLabel
        textAlign="left"
        icon="icon-personalcard4"
        value={pageState?.props?.item?.nationalNo}
        inputStyle={{ opacity: "1" }}
      />
      <InputTextColumn
        field="birthDate"
        readonly={true}
        showLabel
        textAlign="left"
        direction={layoutState?.direction}
        icon="icon-calendar-1"
        value={
          pageState?.props?.item?.birthDate
            ? utils.toLocaleDateString(
                pageState.props.item.birthDate,
                layoutState?.locale
              )
            : ""
        }
        inputStyle={{ opacity: "1" }}
      />
      <InputTextColumn
        field="gender"
        readonly={true}
        showLabel
        icon="icon-user"
        value={pageState?.props?.item?.genderText}
        inputStyle={{ opacity: "1" }}
      />
      <InputTextColumn
        field="mobile"
        readonly={true}
        showLabel
        textAlign="left"
        icon="icon-mobile"
        value={pageState?.props?.item?.mobile}
        inputStyle={{ opacity: "1" }}
      />
      <InputTextColumn
        field="tel"
        readonly={true}
        showLabel
        textAlign="left"
        icon="icon-call-calling"
        value={pageState?.props?.item?.tel}
        inputStyle={{ opacity: "1" }}
      />
      <InputTextColumn
        field="email"
        readonly={true}
        showLabel
        textAlign="left"
        icon="icon-sms4"
        value={pageState?.props?.item?.email}
        inputStyle={{ opacity: "1" }}
      />
      <InputTextColumn
        field="address"
        readonly={true}
        showLabel
        icon="icon-location4"
        value={pageState?.props?.item?.address}
        inputStyle={{ opacity: "1" }}
      />
      <div className="d-flex d-flex-column">
        <div className="input-info">{strings.selfieFile}</div>
        {pageState?.props?.item?.selfieFile && (
          <div className="input-img input-bg input-border mb-30">
            <a
              href={`${STORAGE_PATH}/users/selfies/${pageState?.props?.item?.selfieFile}`}
              target="_blank"
              rel="noReferrer"
            >
              <img
                className="m-15"
                src={`${STORAGE_PATH}/users/selfies/${pageState?.props?.item?.selfieFile}`}
              />
            </a>
          </div>
        )}
        {!pageState?.props?.item?.selfieFile && (
          <InputTextColumn
            field="selfieFileModal"
            readonly={true}
            strings={strings}
            icon="icon-gallery4"
            value={strings.notUploaded}
            inputStyle={{ opacity: "1" }}
          />
        )}
      </div>
      <div className="d-flex d-flex-column">
        <div className="input-info">{strings.identityFile}</div>
        {pageState?.props?.item?.identityFile && (
          <div className="input-img input-bg input-border mb-30">
            <a
              href={`${STORAGE_PATH}/users/identities/${pageState?.props?.item?.identityFile}`}
              target="_blank"
              rel="noReferrer"
            >
              <img
                className="m-15"
                src={`${STORAGE_PATH}/users/identities/${pageState?.props?.item?.identityFile}`}
              />
            </a>
          </div>
        )}
        {!pageState?.props?.item?.identityFile && (
          <InputTextColumn
            field="identityFileModal"
            readonly={true}
            strings={strings}
            icon="icon-gallery4"
            value={strings.notUploaded}
            inputStyle={{ opacity: "1" }}
          />
        )}
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
