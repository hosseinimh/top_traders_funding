import React from "react";

import { InputTextColumn, FormPage } from "../../../components";
import { PageUtils } from "./PageUtils";

const AddChallengeBalance = () => {
  const pageUtils = new PageUtils();

  return (
    <FormPage pageUtils={pageUtils}>
      <InputTextColumn
        field="value"
        textAlign="left"
        columnClassName="col-12"
        type="number"
      />
    </FormPage>
  );
};

export default AddChallengeBalance;
