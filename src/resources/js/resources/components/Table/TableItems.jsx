import React from "react";
import { useSelector } from "react-redux";

import { IMAGES_PATH } from "../../../constants";
import { useLocale } from "../../../hooks";

const TableItems = ({ children, columnsCount }) => {
    const { general } = useLocale();
    const layoutState = useSelector((state) => state.layoutReducer);

    if (children?.length > 0) {
        return children;
    } else if (layoutState?.loading) {
        return (
            <tr>
                <td colSpan={columnsCount} className="img-loading-wrapper">
                    <img
                        src={`${IMAGES_PATH}/loading.gif`}
                        className="img-loading mx-2"
                    />
                    {general.loading}
                </td>
            </tr>
        );
    }

    return (
        <tr>
            <td colSpan={columnsCount}>{general.noDataFound}</td>
        </tr>
    );
};

export default TableItems;
