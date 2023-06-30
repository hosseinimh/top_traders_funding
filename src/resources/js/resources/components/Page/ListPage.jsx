import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { PageLayout, Table } from "../";
import { useLocale } from "../../../hooks";

const ListPage = ({
  pageUtils,
  children,
  table,
  hasAdd = true,
  backUrl = null,
  renderTopList = null,
}) => {
  const navigate = useNavigate();
  const { general } = useLocale();
  const layoutState = useSelector((state) => state.layoutReducer);

  return (
    <PageLayout pageUtils={pageUtils}>
      <div className="section fix-mr15">
        {renderTopList && (
          <div style={{ margin: "1rem 0" }}>{renderTopList()}</div>
        )}
        {(hasAdd || backUrl) && (
          <div style={{ margin: "1rem" }}>
            {hasAdd && (
              <button
                className="btn btn-primary mx-rdir-10"
                type="button"
                title={pageUtils.strings.add}
                onClick={pageUtils.onAdd}
                disabled={layoutState?.loading}
              >
                {pageUtils.strings.add}
              </button>
            )}
            {backUrl && (
              <button
                className="btn btn-border mx-rdir-10"
                type="button"
                title={general.back}
                onClick={() => navigate(backUrl)}
                disabled={layoutState?.loading}
              >
                {general.back}
              </button>
            )}
          </div>
        )}
        {children}
        <div className="block">
          <Table
            renderHeader={table.renderHeader}
            renderItems={table.renderItems}
            renderFooter={table?.renderFooter}
          />
        </div>
      </div>
    </PageLayout>
  );
};

export default ListPage;
