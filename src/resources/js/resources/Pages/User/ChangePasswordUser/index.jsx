import React from "react";

import { InputTextColumn, FormPage } from "../../../components";
import { PageUtils } from "./PageUtils";

const ChangePasswordUser = () => {
    const pageUtils = new PageUtils();

    return (
        <FormPage pageUtils={pageUtils}>
            <InputTextColumn
                field="newPassword"
                type="password"
                textAlign="left"
            />
            <InputTextColumn
                field="confirmPassword"
                type="password"
                textAlign="left"
            />
        </FormPage>
    );
};

export default ChangePasswordUser;
