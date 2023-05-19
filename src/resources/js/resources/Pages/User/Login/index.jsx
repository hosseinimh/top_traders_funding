import React from "react";

import { InputTextColumn, LoginPageLayout } from "../../../components";
import { PageUtils } from "./PageUtils";

const Login = () => {
  const pageUtils = new PageUtils();

  return (
    <LoginPageLayout pageUtils={pageUtils}>
      <InputTextColumn field="username" showLabel={false} textAlign="left" />
      <InputTextColumn
        field="password"
        type="password"
        showLabel={false}
        textAlign="left"
      />
    </LoginPageLayout>
  );
};

export default Login;
