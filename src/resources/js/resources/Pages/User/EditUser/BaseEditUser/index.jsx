import React from "react";
import { useSelector } from "react-redux";

import {
  InputRadioColumn,
  InputTextColumn,
  FormPage,
  InputCheckboxColumn,
  InputCheckboxContainer,
} from "../../../../components";
import { PageUtils } from "./PageUtils";
import { USER_ROLES } from "../../../../../constants";
import { useLocale } from "../../../../../hooks";

const BaseEditUser = ({ userId }) => {
  const { editUserPage: strings } = useLocale();
  const pageUtils = new PageUtils(userId);
  const userState = useSelector((state) => state.userReducer);

  return (
    <FormPage pageUtils={pageUtils}>
      <InputTextColumn field="name" showLabel={true} />
      <InputTextColumn field="family" showLabel={true} />
      <InputTextColumn
        field="email"
        showLabel={true}
        textAlign="left"
        readonly={
          userState?.user?.role === USER_ROLES.ADMINISTRATOR ? false : true
        }
      />
      {userState?.user?.role === USER_ROLES.ADMINISTRATOR && (
        <>
          <InputCheckboxContainer>
            <InputCheckboxColumn field="isActive" checked={true} />
          </InputCheckboxContainer>
          <div>
            <label className="form-label">{strings.type}</label>
            <InputRadioColumn field="administrator" name="type" />
            <InputRadioColumn field="user" name="type" />
          </div>
        </>
      )}
    </FormPage>
  );
};

export default BaseEditUser;
