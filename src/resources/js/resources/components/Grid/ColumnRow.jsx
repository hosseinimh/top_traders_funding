import React from "react";

const ColumnRow = ({ columns = 4, children }) => {
    return (
        <div className="col-12 pb-3">
            <div className={`row row-cols-${columns}`}>{children}</div>
        </div>
    );
};

export default ColumnRow;
