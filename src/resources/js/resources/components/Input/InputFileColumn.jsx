import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const InputFileColumn = ({
  field,
  accept = ".jpg, .jpeg, .png, .pdf, .doc, .docx",
  onChangeFile,
  useForm,
  columnClassName = "col-md-3 col-12 pb-2",
  strings,
}) => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const pageState = useSelector((state) => state.pageReducer);
  const messageState = useSelector((state) => state.messageReducer);
  const [label, setLabel] = useState(
    strings && field in strings ? strings[field] : ""
  );
  const [form, setForm] = useState(useForm);

  useEffect(() => {
    if (!strings) {
      setLabel(
        pageState?.pageUtils?.strings && field in pageState.pageUtils.strings
          ? pageState?.pageUtils?.strings[field]
          : ""
      );
    }

    if (!useForm) {
      setForm(pageState?.pageUtils?.useForm);
    }
  }, [pageState]);

  return (
    <div className={columnClassName}>
      <label className="form-label" htmlFor={field}>
        {label}
      </label>
      <input
        {...form?.register(`${field}`)}
        className={
          messageState?.messageField === field
            ? "form-control-file is-invalid"
            : "form-control-file"
        }
        id={field}
        disabled={layoutState?.loading}
        type="file"
        accept={accept}
        onChange={(e) => onChangeFile(e)}
      />
      {messageState?.messageField === field && (
        <div className="invalid-feedback">{messageState?.message}</div>
      )}
    </div>
  );
};

export default InputFileColumn;
