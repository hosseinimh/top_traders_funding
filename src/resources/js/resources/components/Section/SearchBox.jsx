import React from "react";
import { useSelector } from "react-redux";

import { useLocale } from "../../../hooks";

const SearchBox = ({ children, pageUtils, onSubmit, onReset }) => {
  const { general } = useLocale();
  const layoutState = useSelector((state) => state.layoutReducer);

  return (
    <div className="block">
      <div className="field-title">{general.search}</div>
      <div>{children}</div>
      <div className="btns d-flex just-end">
        <button
          className="btn btn-blue mx-10"
          type="button"
          disabled={layoutState?.loading}
          title={general.search}
          onClick={pageUtils.useForm.handleSubmit(onSubmit)}
        >
          {general.search}
        </button>
        <button
          className="btn btn-border mx-10"
          type="button"
          disabled={layoutState?.loading}
          title={general.reset}
          onClick={onReset}
        >
          {general.reset}
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
