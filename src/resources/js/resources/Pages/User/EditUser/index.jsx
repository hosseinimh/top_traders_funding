import React from "react";
import { useSelector } from "react-redux";

import {
    InputRadioColumn,
    InputTextColumn,
    FormPage,
    InputCheckboxColumn,
} from "../../../components";
import { editUserPage as strings } from "../../../../constants/strings";
import { PageUtils } from "./PageUtils";
import { USER_ROLES } from "../../../../constants";

const EditUser = () => {
    const pageUtils = new PageUtils();
    const userState = useSelector((state) => state.userReducer);

    return (
        <FormPage pageUtils={pageUtils}>
            <InputTextColumn field="name" />
            <InputTextColumn field="family" />
            {userState?.user?.role === USER_ROLES.ADMINISTRATOR && (
                <>
                    <InputTextColumn
                        field="email"
                        inputStyle={{ textAlign: "left", direction: "ltr" }}
                    />
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
