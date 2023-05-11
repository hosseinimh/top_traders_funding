import React from "react";

import { InputTextColumn, FormPage } from "../../../components";
import { PageUtils } from "./PageUtils";

const EditChallenge = () => {
  const pageUtils = new PageUtils();

  return (
    <FormPage pageUtils={pageUtils}>
      <InputTextColumn field="accountNo" textAlign="left" type="number" />
      <InputTextColumn field="password" textAlign="left" />
      <InputTextColumn field="investorPassword" textAlign="left" />
    </FormPage>
  );
};

export default EditChallenge;
