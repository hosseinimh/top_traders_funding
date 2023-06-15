import React from "react";
import { useSelector } from "react-redux";

import {
  InputRadioColumn,
  InputTextColumn,
  FormPage,
  InputCheckboxColumn,
  InputCheckboxContainer,
  InputRadioContainer,
  AlertMessage,
  InputRow,
} from "../../../../components";
import { PageUtils } from "./PageUtils";
import { MESSAGE_TYPES, USER_ROLES } from "../../../../../constants";
import { useLocale } from "../../../../../hooks";

const BaseEditUser = ({ userId }) => {
  const { editUserPage: strings } = useLocale();
  const pageUtils = new PageUtils(userId);
  const userState = useSelector((state) => state.userReducer);

  return (
    <FormPage
      pageUtils={pageUtils}
      submitEnabled={userState?.user?.verifyRequest3At ? false : true}
      renderBefore={
        userState?.user?.verifyRequest3At && (
          <AlertMessage
            message={strings.editNotAllowed}
            messageType={MESSAGE_TYPES.ERROR}
          />
        )
      }
    >
      <InputRow>
        <InputTextColumn
          field="name"
          showLabel={true}
          readonly={userState?.user?.verifyRequest3At ? true : false}
          fullRow={false}
          icon={"icon-personalcard4"}
        />
        <InputTextColumn
          field="family"
          showLabel={true}
          readonly={userState?.user?.verifyRequest3At ? true : false}
          fullRow={false}
          icon={"icon-personalcard4"}
        />
        <InputTextColumn
          field="email"
          showLabel={true}
          textAlign="left"
          readonly={
            userState?.user?.role === USER_ROLES.ADMINISTRATOR ? false : true
          }
          fullRow={false}
          icon={"icon-sms4"}
        />
      </InputRow>
      {userState?.user?.role === USER_ROLES.ADMINISTRATOR && (
        <>
          <InputCheckboxContainer>
            <InputCheckboxColumn field="isActive" checked={true} />
          </InputCheckboxContainer>
          <InputRadioContainer label={strings.type}>
            <InputRadioColumn
              field="administrator"
              name="type"
              checked={true}
            />
            <InputRadioColumn field="user" name="type" />
          </InputRadioContainer>
        </>
      )}
    </FormPage>
  );
};

export default BaseEditUser;
