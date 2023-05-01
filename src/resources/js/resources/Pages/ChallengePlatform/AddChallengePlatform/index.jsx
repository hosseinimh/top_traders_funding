import React from "react";

import { InputTextColumn, FormPage } from "../../../components";
import { PageUtils } from "./PageUtils";

const AddChallengePlatform = () => {
  const pageUtils = new PageUtils();

  return (
    <FormPage pageUtils={pageUtils}>
      <InputTextColumn
        field="value"
        columnClassName="col-12"
        textAlign="left"
      />
    </FormPage>
  );
};

export default AddChallengePlatform;
