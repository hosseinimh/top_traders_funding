import React from "react";

import { ForgotPageLayout, InputTextColumn } from "../../../components";
import { PageUtils } from "./PageUtils";

const ForgotPassword = () => {
  const pageUtils = new PageUtils();

  return (
    <ForgotPageLayout pageUtils={pageUtils}>
      <InputTextColumn
        field="email"
        showLabel={false}
        textAlign="left"
        columnClassName="col-12"
      />
    </ForgotPageLayout>
  );
};

export default ForgotPassword;
