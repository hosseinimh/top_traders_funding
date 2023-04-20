import React from "react";

import { InputTextColumn, LoginPageLayout } from "../../../components";
import { PageUtils } from "./PageUtils";

const LoginUser = () => {
    const pageUtils = new PageUtils();

    return (
        <LoginPageLayout pageUtils={pageUtils}>
            <InputTextColumn
                field="username"
                showLabel={false}
                inputStyle={{ direction: "ltr" }}
                columnClassName="col-12"
            />
            <InputTextColumn
                field="password"
                type="password"
                showLabel={false}
                inputStyle={{ direction: "ltr" }}
                columnClassName="col-12"
            />
        </LoginPageLayout>
    );
};

export default LoginUser;
