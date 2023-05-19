import React from "react";

import { AlertState } from "../../components";
import BasePageLayout from "./BasePageLayout";

const FormPageLayout = ({ children, pageUtils, modals }) => {
  return (
    <BasePageLayout pageUtils={pageUtils} modals={modals}>
      <AlertState />
      <div className="section d-flex-wrap fix-mr15">{children}</div>
    </BasePageLayout>
  );
};

export default FormPageLayout;
