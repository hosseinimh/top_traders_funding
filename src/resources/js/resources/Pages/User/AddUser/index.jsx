import React from "react";

import {
    InputRadioColumn,
    InputTextColumn,
    FormPage,
    InputCheckboxColumn,
} from "../../../components";
import { PageUtils } from "./PageUtils";
import { useLanguage } from "../../../../hooks";

const AddUser = () => {
    const { addUserPage: strings } = useLanguage();
    const pageUtils = new PageUtils();

    return (
        <FormPage pageUtils={pageUtils}>
            <InputTextColumn field="username" textAlign="left" />
            <InputTextColumn
                field="password"
                type="password"
                textAlign="left"
            />
            <InputTextColumn
                field="confirmPassword"
                type="password"
                textAlign="left"
            />
            <InputTextColumn field="name" />
            <InputTextColumn field="family" />
            <div className="col-md-3 col-sm-12 pb-4">
                <label className="form-label">{strings.status}</label>
                <InputCheckboxColumn field="isActive" checked={true} />
            </div>
            <div className="col-md-3 col-sm-12 pb-4">
                <label className="form-label">{strings.type}</label>
                <InputRadioColumn
                    field="administrator"
                    name="type"
                    checked={true}
                />
                <InputRadioColumn field="user" name="type" />
            </div>
        </FormPage>
    );
};

export default AddUser;
