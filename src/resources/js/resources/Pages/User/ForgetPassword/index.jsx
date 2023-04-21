import React from "react";

import { ForgetPageLayout, InputTextColumn } from "../../../components";
import { PageUtils } from "./PageUtils";

const ForgetPassword = () => {
    const pageUtils = new PageUtils();

    return (
        <ForgetPageLayout pageUtils={pageUtils}>
            <InputTextColumn
                field="email"
                showLabel={false}
                textAlign="left"
                columnClassName="col-12"
            />
        </ForgetPageLayout>
    );
};

export default ForgetPassword;
