import React from "react";

import {
  InputTextColumn,
  FormPage,
  InputCheckboxColumn,
} from "../../../components";
import { PageUtils } from "./PageUtils";

const AddChallengeServer = () => {
  const pageUtils = new PageUtils();

  return (
    <FormPage pageUtils={pageUtils}>
      <InputTextColumn field="name" textAlign="left" columnClassName="col-12" />
      <InputTextColumn field="title" columnClassName="col-12" />
      <div className="col-12 pb-4">
        <InputCheckboxColumn field="free" checked={true} />
      </div>
      <div className="col-12 pb-4">
        <InputCheckboxColumn field="real" checked={true} />
      </div>
    </FormPage>
  );
};

export default AddChallengeServer;
