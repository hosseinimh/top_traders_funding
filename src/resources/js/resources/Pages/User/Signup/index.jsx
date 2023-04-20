import React from "react";

import { InputTextColumn, SignupPageLayout } from "../../../components";
import { PageUtils } from "./PageUtils";

const Signup = () => {
    const pageUtils = new PageUtils();

    return (
        <SignupPageLayout pageUtils={pageUtils}>
            <InputTextColumn
                field="username"
                inputStyle={{ direction: "ltr" }}
                columnClassName="col-6"
            />
            <InputTextColumn
                field="email"
                inputStyle={{ direction: "ltr" }}
                columnClassName="col-6"
            />
            <InputTextColumn
                field="password"
                type="password"
                inputStyle={{ direction: "ltr" }}
                columnClassName="col-6"
            />
            <InputTextColumn
                field="confirmPassword"
                type="password"
                inputStyle={{ direction: "ltr" }}
                columnClassName="col-6"
            />
            <InputTextColumn field="name" columnClassName="col-6" />
            <InputTextColumn field="family" columnClassName="col-6" />
        </SignupPageLayout>
    );
};

export default Signup;
