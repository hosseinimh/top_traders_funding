import React from "react";
import { useSelector } from "react-redux";

import {
  BlankPage,
  ColumnRow,
  FormCard,
  InputFileColumn,
  InputTextAreaColumn,
} from "../../../components";
import { STORAGE_PATH, TICKET_STATUSES } from "../../../../constants";
import { BsPaperclip } from "react-icons/bs";
import { PageUtils } from "./PageUtils";
import { useLocale } from "../../../../hooks";

const TicketThreads = () => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const pageState = useSelector((state) => state.pageReducer);
  const { ticketThreadsPage: strings, general } = useLocale();
  const pageUtils = new PageUtils();
  const userDirection = general.locale === "english" ? "left" : "right";
  const adminDirection = general.locale === "english" ? "right" : "left";

  const onChangeFile = (e) => {
    const file = e?.target?.files[0];

    if (file) {
      pageUtils.onSetFile(file);
    }
  };

  return (
    <BlankPage pageUtils={pageUtils}>
      <div className="row mb-2">
        <div className="col-12 mb-4">
          {pageState?.props?.item?.status === TICKET_STATUSES.OPEN && (
            <button
              className="btn btn-warning mxdir-2 px-4"
              type="button"
              title={strings.closeTicket}
              disabled={layoutState?.loading}
            >
              {strings.closeTicket}
            </button>
          )}
          <button
            className="btn btn-secondary px-4"
            type="button"
            title={general.back}
            onClick={pageUtils.onCancel}
            disabled={layoutState?.loading}
          >
            {general.back}
          </button>
        </div>
      </div>
      <p>
        <span className="badge bg-success text-white">
          {pageState?.props?.item?.statusText}
        </span>
      </p>
      <div className="card mb-4">
        {pageState?.props?.threads?.map((item) => (
          <div
            key={item.id}
            className="card-body"
            style={{
              border: "1px solid rgba(0, 0, 21, 0.125)",
              backgroundColor: item.adminCreated === 0 ? "" : "#e5eaef",
            }}
          >
            <div className="row">
              <div className="col-12">
                <p
                  style={{
                    marginBottom: "0",
                    fontSize: "0.8rem",
                    textAlign:
                      item?.adminCreated === 0 ? userDirection : adminDirection,
                  }}
                >
                  {`${item?.creatorName} ${item?.creatorFamily} - ${
                    item?.adminCreated ? general.administrator : general.user
                  }`}
                </p>
                <p
                  className="mb-4"
                  style={{
                    fontSize: "0.8rem",
                    textAlign:
                      item?.adminCreated === 0 ? userDirection : adminDirection,
                  }}
                >
                  {item?.faCreatedAt}
                </p>
                <p
                  style={{
                    whiteSpace: "pre-line",
                    textAlign: item?.adminCreated === 0 ? "right" : "left",
                  }}
                >
                  {item?.content}
                </p>
              </div>
              {item?.file && (
                <div className="col-12 mt-4 mb-2">
                  <a
                    href={`${STORAGE_PATH}/ticket_threads/${item.file}`}
                    target={"_blank"}
                  >
                    <BsPaperclip />
                    <span>{general.file}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {pageState?.props?.item?.status === TICKET_STATUSES.OPEN && (
        <FormCard pageUtils={pageUtils}>
          <h5 className="mb-4">{strings.sendTicket}</h5>
          <ColumnRow columns={3}>
            <InputTextAreaColumn
              field="content"
              columnClassName="col-12 col-md-8 pb-2"
            />
          </ColumnRow>
          <InputFileColumn field="file" onChangeFile={(e) => onChangeFile(e)} />
        </FormCard>
      )}
    </BlankPage>
  );
};

export default TicketThreads;
