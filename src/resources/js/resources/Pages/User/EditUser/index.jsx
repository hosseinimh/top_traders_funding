import React from "react";
import { useSelector } from "react-redux";

import {
    InputRadioColumn,
    InputTextColumn,
    FormPage,
    InputCheckboxColumn,
} from "../../../components";
import { PageUtils } from "./PageUtils";
import { USER_ROLES } from "../../../../constants";
import { useLanguage } from "../../../../hooks";

const EditUser = () => {
    const { editUserPage: strings } = useLanguage();
    const pageUtils = new PageUtils();
    const userState = useSelector((state) => state.userReducer);

    return (
        <FormPage pageUtils={pageUtils}>
            <InputTextColumn field="name" />
            <InputTextColumn field="family" />
            {userState?.user?.role === USER_ROLES.ADMINISTRATOR && (
                <>
                    <InputTextColumn field="email" textAlign="left" />
                    <div className="col-md-3 col-sm-12 pb-4"></div>
                    <div className="col-md-3 col-sm-12 pb-4">
                        <label className="form-label">{strings.status}</label>
                        <InputCheckboxColumn field="isActive" checked={true} />
                    </div>
                    <div className="col-md-3 col-sm-12 pb-4">
                        <label className="form-label">{strings.type}</label>
                        <InputRadioColumn field="administrator" name="type" />
                        <InputRadioColumn field="user" name="type" />
                    </div>
                </>
            )}
        </FormPage>
    );
};

export default EditUser;
