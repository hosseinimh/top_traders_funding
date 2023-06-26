import React from "react";
import { useSelector } from "react-redux";

import {
  BlankPage,
  FormCard,
  InputFileColumn,
  InputTextAreaColumn,
} from "../../../components";
import { LOCALES, STORAGE_PATH, TICKET_STATUSES } from "../../../../constants";
import { PageUtils } from "./PageUtils";
import { useLocale } from "../../../../hooks";
import utils from "../../../../utils/Utils";

const TicketThreads = () => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const pageState = useSelector((state) => state.pageReducer);
  const { ticketThreadsPage: strings, general } = useLocale();
  const pageUtils = new PageUtils();
  const userDirection = general.locale === LOCALES.FA ? "right" : "left";
  const adminDirection = general.locale === LOCALES.FA ? "left" : "right";

  const onChangeFile = (e) => {
    const file = e?.target?.files[0];
    if (file) {
      pageUtils.onSetFile(file);
    }
  };

  const onRemoveFile = () => {
    pageUtils.onSetFile(null);
  };

  return (
    <BlankPage pageUtils={pageUtils}>
      <div className="section fix-mr15">
        <div className="btns d-flex" style={{ margin: "1rem" }}>
          {pageState?.props?.item?.status === TICKET_STATUSES.OPEN && (
            <button
              className="btn btn-primary mx-rdir-10"
              type="button"
              title={strings.closeTicket}
              disabled={layoutState?.loading}
            >
              {strings.closeTicket}
            </button>
          )}
          <button
            className="btn btn-border mx-rdir-10"
            type="button"
            title={general.back}
            onClick={pageUtils.onCancel}
            disabled={layoutState?.loading}
          >
            {general.back}
          </button>
        </div>
        {pageState?.props?.item && (
          <div className="d-flex-wrap flex-center m-15">
            <div
              className={`dot-icon-inline ${
                pageState.props.item.status === TICKET_STATUSES.OPEN
                  ? "bg-success"
                  : "bg-dark-warning"
              }`}
            ></div>
            <div>{pageState.props.item.statusText}</div>
          </div>
        )}
        {pageState?.props?.threads?.map((item) => {
          const { date, time } = utils.getTimezoneDate(
            item.createdAt,
            general.locale
          );
          return (
            <div
              key={item.id}
              className="block pd-20 pd-d-10"
              style={{
                backgroundColor:
                  item.adminCreated === 0
                    ? getComputedStyle(
                        document.documentElement
                      ).getPropertyValue("--body")
                    : getComputedStyle(
                        document.documentElement
                      ).getPropertyValue("--light-body"),
              }}
            >
              <div>
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
                <div
                  className="mb-20"
                  style={{
                    fontSize: "0.8rem",
                    textAlign:
                      item?.adminCreated === 0 ? userDirection : adminDirection,
                  }}
                >
                  <div
                    className="d-flex-wrap"
                    style={{
                      gap: "1rem",
                      flexDirection: item.adminCreated ? "row-reverse" : "row",
                    }}
                  >
                    <span>{date}</span>
                    <span>{time}</span>
                  </div>
                </div>
                <p
                  className="text"
                  style={{
                    whiteSpace: "pre-line",
                    textAlign:
                      item?.adminCreated === 0 ? userDirection : adminDirection,
                  }}
                >
                  {item?.content}
                </p>
              </div>
              {item?.file && (
                <div
                  className="d-flex-wrap mt-20"
                  style={{
                    flexDirection: item.adminCreated ? "row-reverse" : "row",
                  }}
                >
                  <a
                    href={`${STORAGE_PATH}/ticket_threads/${item.file}`}
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    <i className="icon-gallery4 mx-5" />
                    <span className="primary">{general.file}</span>
                  </a>
                </div>
              )}
            </div>
          );
        })}
        {pageState?.props?.item?.status === TICKET_STATUSES.OPEN && (
          <FormCard pageUtils={pageUtils}>
            <div className="block-title mb-30">
              <h3>{strings.sendTicket}</h3>
            </div>
            <InputTextAreaColumn field="content" showLabel />
            <InputFileColumn
              field="file"
              onChangeFile={(e) => onChangeFile(e)}
              file={pageState?.props?.file}
              showFile={true}
              maxSize={2 * 1024 * 1024}
              onRemoveFile={onRemoveFile}
              accept="image/jpeg,image/png,image/gif"
            />
          </FormCard>
        )}
      </div>
    </BlankPage>
  );
};

export default TicketThreads;
