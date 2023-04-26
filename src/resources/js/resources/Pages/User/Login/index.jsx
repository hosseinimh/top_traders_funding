import React from "react";

import { InputTextColumn, LoginPageLayout } from "../../../components";
import { PageUtils } from "./PageUtils";

const Login = ({ role }) => {
    const pageUtils = new PageUtils(role);

    return (
        <LoginPageLayout pageUtils={pageUtils}>
            <InputTextColumn
                field="username"
                showLabel={false}
                textAlign="left"
                columnClassName="col-12"
            />
            <InputTextColumn
                field="password"
                type="password"
                showLabel={false}
                textAlign="left"
                columnClassName="col-12"
            />
        </LoginPageLayout>
    );
};

export default Login;
