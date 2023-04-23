import React from "react";

import {
    InputTextColumn,
    FormPage,
    InputCheckboxColumn,
} from "../../../components";
import { PageUtils } from "./PageUtils";
import { useLocale } from "../../../../hooks";

const EditCampaign = () => {
    const { editCampaignPage: strings } = useLocale();
    const pageUtils = new PageUtils();

    return (
        <FormPage pageUtils={pageUtils}>
            <InputTextColumn field="title" columnClassName="col-12" />
            <div className="col-md-3 col-sm-12 pb-4">
                <label className="form-label">{strings.status}</label>
                <InputCheckboxColumn field="isActive" checked={true} />
            </div>
        </FormPage>
    );
};

export default EditCampaign;
