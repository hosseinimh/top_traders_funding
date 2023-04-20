import React from "react";

import {
    InputTextColumn,
    FormPage,
    InputTextAreaColumn,
} from "../../../components";
import { PageUtils } from "./PageUtils";

const AddAppRule = () => {
    const pageUtils = new PageUtils();

    return (
        <FormPage pageUtils={pageUtils}>
            <InputTextColumn field="title" columnClassName="col-12" />
            <InputTextAreaColumn field="body" columnClassName="col-12" />
        </FormPage>
    );
};

export default AddAppRule;
