import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const InputTextAreaColumn = ({
    field,
    useForm,
    columnClassName = "col-md-3 col-12 pb-4",
    strings,
}) => {
    const layoutState = useSelector((state) => state.layoutReducer);
    const pageState = useSelector((state) => state.pageReducer);
    const messageState = useSelector((state) => state.messageReducer);
    const [label, setLabel] = useState(
        strings && field in strings ? strings[field] : ""
    );
    const [placeholder, setPlaceholder] = useState(
        strings && `${field}Placeholder` in strings
            ? strings[`${field}Placeholder`]
            : ""
    );
    const [form, setForm] = useState(useForm);

    useEffect(() => {
        if (!strings) {
            setLabel(
                pageState?.pageUtils?.strings &&
                    field in pageState.pageUtils.strings
                    ? pageState?.pageUtils?.strings[field]
                    : ""
            );
            setPlaceholder(
                pageState?.pageUtils?.strings &&
                    `${field}Placeholder` in pageState.pageUtils.strings
                    ? pageState.pageUtils.strings[`${field}Placeholder`]
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
            <textarea
                {...form?.register(field)}
                className={
                    messageState?.messageField === field
                        ? "form-control is-invalid"
                        : "form-control"
                }
                id={field}
                placeholder={placeholder}
                disabled={layoutState?.loading}
            />
            {messageState?.messageField === field && (
                <div className="invalid-feedback">{messageState?.message}</div>
            )}
        </div>
    );
};

export default InputTextAreaColumn;
