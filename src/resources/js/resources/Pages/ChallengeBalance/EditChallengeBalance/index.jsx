import React from "react";

import {
  InputTextColumn,
  FormPage,
  InputCheckboxColumn,
} from "../../../components";
import { PageUtils } from "./PageUtils";

const EditChallengeBalance = () => {
  const pageUtils = new PageUtils();

  return (
    <FormPage pageUtils={pageUtils}>
      <InputTextColumn
        field="value"
        textAlign="left"
        columnClassName="col-12"
        type="number"
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

export default EditChallengeBalance;
