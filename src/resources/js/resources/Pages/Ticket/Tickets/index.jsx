import React from "react";
import { useSelector } from "react-redux";

import { ListPage, TableFooter, TableItems } from "../../../components";
import utils from "../../../../utils/Utils";
import { USER_ROLES } from "../../../../constants";
import { PageUtils } from "./PageUtils";
import { useLocale } from "../../../../hooks";

const Tickets = () => {
    const pageState = useSelector((state) => state.pageReducer);
    const columnsCount = 4;
    const { ticketsPage: strings } = useLocale();
    const pageUtils = new PageUtils();

    const renderHeader = () => (
        <tr>
            <th scope="col" style={{ width: "50px" }}>
                #
            </th>
            <th scope="col" style={{ width: "200px" }}>
                {strings.type}
            </th>
            <th scope="col">{strings.subject}</th>
            <th scope="col" style={{ width: "250px" }}>
                {strings.lastUpdate}
            </th>
        </tr>
    );

    const renderItems = () => {
        const children = pageState?.props?.items?.map((item, index) => (
            <tr key={item.id}>
                <td scope="row">
                    {utils.en2faDigits(
                        (pageState?.props?.pageNumber - 1) * 10 + index + 1
                    )}
                </td>
                <td>
                    <Link
                        to={`${basePath}/tickets/threads/${item.id}`}
                        className="link"
                    >
                        {item.typeText}
                    </Link>
                </td>
                <td>
                    <p
                        style={{
                            maxHeight: "3rem",
                            whiteSpace: "pre-wrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontWeight:
                                (_lsUser?.role === USER_ROLES.ADMINISTRATOR &&
                                    !item.adminSeenTime) ||
                                (_lsUser?.role === USER_ROLES.USER &&
                                    !item.userSeenTime)
                                    ? "bold"
                                    : "",
                        }}
                    >
                        {`${utils.en2faDigits(item.id)}# - ${item.subject}`}
                    </p>
                </td>
                <td>
                    {item.faUpdatedAt || item.faCreatedAt}
                    <p>
                        <span className="badge bg-primary ms-auto">
                            {item.statusText}
                        </span>
                    </p>
                </td>
            </tr>
        ));

        return <TableItems columnsCount={columnsCount} children={children} />;
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
