import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ListPage, TableFooter, TableItems } from "../../../../components";
import utils from "../../../../../utils/Utils";
import {
  BASE_PATH,
  TICKET_STATUSES,
  USER_ROLES,
} from "../../../../../constants";
import { PageUtils } from "./PageUtils";
import { useLocale } from "../../../../../hooks";

const Tickets = ({ userId }) => {
  const pageState = useSelector((state) => state.pageReducer);
  const userState = useSelector((state) => state.userReducer);
  const columnsCount = 3;
  const { ticketsPage: strings, general } = useLocale();
  const pageUtils = new PageUtils(userId);

  const renderHeader = () => (
    <tr>
      <th style={{ width: "200px" }}>{strings.type}</th>
      <th>{strings.subject}</th>
      <th style={{ width: "250px" }}>{strings.lastUpdate}</th>
    </tr>
  );

  const renderItems = () => {
    const children = pageState?.props?.items?.map((item) => {
      let dateObj;
      if (item.updatedAt) {
        dateObj = utils.getTimezoneDate(item.updatedAt, general.locale);
      } else {
        dateObj = utils.getTimezoneDate(item.createdAt, general.locale);
      }
      const { date, time } = dateObj;
      return (
        <tr key={item.id}>
          <td>
            <Link
              to={`${BASE_PATH}/tickets/threads/${item.id}`}
              className="dark-warning"
            >
              {item.typeText}
            </Link>
            <div className="dot">
              <span
                className={`${
                  item.status === TICKET_STATUSES.OPEN
                    ? "bg-success"
                    : "bg-dark-warning"
                }`}
              ></span>
              <span>{item.statusText}</span>
            </div>
          </td>
          <td>
            <p>
              {((userState?.user?.role === USER_ROLES.ADMINISTRATOR &&
                !item.adminSeenAt) ||
                (userState?.user?.role === USER_ROLES.USER &&
                  !item.userSeenAt)) && (
                <span className="badge bg-success rounded mx-rdir-10 text pd-td-5 pd-lr-10">
                  {strings.new}
                </span>
              )}
              <span
                style={{
                  maxHeight: "3rem",
                  whiteSpace: "pre-wrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontWeight:
                    (userState?.user?.role === USER_ROLES.ADMINISTRATOR &&
                      !item.adminSeenAt) ||
                    (userState?.user?.role === USER_ROLES.USER &&
                      !item.userSeenAt)
                      ? "bold"
                      : "",
                }}
              >
                {`${item.id}# - ${item.subject}`}
              </span>
            </p>
          </td>
          <td className="d-flex-wrap just-around">
            <div>{date}</div>
            <div>{time}</div>
          </td>
        </tr>
      );
    });

    return <TableItems columnsCount={columnsCount}>{children}</TableItems>;
  };

  const renderFooter = () => (
    <TableFooter columnsCount={columnsCount} pageUtils={pageUtils} />
  );

  return (
    <ListPage
      pageUtils={pageUtils}
      table={{ renderHeader, renderItems, renderFooter }}
    ></ListPage>
  );
};

export default Tickets;
