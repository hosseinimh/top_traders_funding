import React from "react";

import { InputTextColumn, FormPage } from "../../../components";
import { PageUtils } from "./PageUtils";

const AddChallengeServer = () => {
  const pageUtils = new PageUtils();

  return (
    <FormPage pageUtils={pageUtils}>
      <InputTextColumn field="name" textAlign="left" columnClassName="col-12" />
      <InputTextColumn field="title" columnClassName="col-12" />
    </FormPage>
  );
};

export default AddChallengeServer;
