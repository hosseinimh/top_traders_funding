import React from "react";

import {
  InputTextColumn,
  FormPage,
  InputCheckboxColumn,
} from "../../../components";
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
      <div className="col-12 pb-4">
        <InputCheckboxColumn field="free" checked={true} />
      </div>
      <div className="col-12 pb-4">
        <InputCheckboxColumn field="real" checked={true} />
      </div>
    </FormPage>
  );
};

export default AddChallengePlatform;
