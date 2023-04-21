import React from "react";

import { InputTextColumn, SignupPageLayout } from "../../../components";
import { PageUtils } from "./PageUtils";

const Signup = () => {
    const pageUtils = new PageUtils();

    return (
        <SignupPageLayout pageUtils={pageUtils}>
            <InputTextColumn
                field="username"
                textAlign="left"
                columnClassName="col-6"
            />
            <InputTextColumn
                field="email"
                textAlign="left"
                columnClassName="col-6"
            />
            <InputTextColumn
                field="password"
                type="password"
                textAlign="left"
                columnClassName="col-6"
            />
            <InputTextColumn
                field="confirmPassword"
                type="password"
                textAlign="left"
                columnClassName="col-6"
            />
            <InputTextColumn field="name" columnClassName="col-6" />
            <InputTextColumn field="family" columnClassName="col-6" />
        </SignupPageLayout>
    );
};

export default Signup;
