import React, { useEffect, useState } from "react";

import {
  InputRadioColumn,
  InputTextColumn,
  FormPage,
  InputCheckboxColumn,
  InputCheckboxContainer,
  InputRadioContainer,
  InputRow,
} from "../../../components";
import { PageUtils } from "./PageUtils";
import { useLocale } from "../../../../hooks";

const AddUser = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const { addUserPage: strings } = useLocale();
  const pageUtils = new PageUtils();

  useEffect(() => {
    const element = document.querySelector("#password");
    if (!element) {
      return;
    }
    if (showPass) {
      element.setAttribute("type", "text");
    } else {
      element.setAttribute("type", "password");
    }
  }, [showPass]);

  useEffect(() => {
    const element = document.querySelector("#confirmPassword");
    if (!element) {
      return;
    }
    if (showConfirmPass) {
      element.setAttribute("type", "text");
    } else {
      element.setAttribute("type", "password");
    }
  }, [showConfirmPass]);

  return (
    <FormPage pageUtils={pageUtils}>
      <InputRow>
        <InputTextColumn
          field="username"
          textAlign="left"
          inputClassName="autofill"
          fullRow={false}
          icon={"icon-frame-14"}
        />
        <InputTextColumn
          field="password"
          type="password"
          textAlign="left"
          inputClassName="autofill"
          fullRow={false}
          icon={`icon-eye3 icon-clickable${showPass ? " show" : ""}`}
          iconClick={() => setShowPass(!showPass)}
        />
        <InputTextColumn
          field="confirmPassword"
          type="password"
          textAlign="left"
          inputClassName="autofill"
          fullRow={false}
          icon={`icon-eye3 icon-clickable${showConfirmPass ? " show" : ""}`}
          iconClick={() => setShowConfirmPass(!showConfirmPass)}
        />
        <InputTextColumn
          field="email"
          textAlign="left"
          inputClassName="autofill"
          fullRow={false}
          icon={"icon-sms4"}
        />
      </InputRow>
      <InputRow>
        <InputTextColumn
          field="name"
          inputClassName="autofill"
          fullRow={false}
          icon={"icon-personalcard4"}
        />
        <InputTextColumn
          field="family"
          inputClassName="autofill"
          fullRow={false}
          icon={"icon-personalcard4"}
        />
      </InputRow>
      <InputCheckboxContainer>
        <InputCheckboxColumn field="isActive" checked={true} />
      </InputCheckboxContainer>
      <InputRadioContainer label={strings.type}>
        <InputRadioColumn field="administrator" name="type" checked={true} />
        <InputRadioColumn field="user" name="type" />
      </InputRadioContainer>
    </FormPage>
  );
};

export default AddUser;
