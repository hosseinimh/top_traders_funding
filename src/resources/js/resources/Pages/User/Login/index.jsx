import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { InputTextColumn, NotAuthPageLayout } from "../../../components";
import { PageUtils } from "./PageUtils";
import { useLocale } from "../../../../hooks";
import { BASE_PATH } from "../../../../constants";

const Login = () => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const [showPass, setShowPass] = useState(false);
  const pageUtils = new PageUtils();
  const { loginUserPage: strings } = useLocale();

  useEffect(() => {
    const element = document.querySelector("#password");
    if (!element) {
      return;
    }
    if (showPass) {
      element.setAttribute("type", "text");
    } else {
      element.setAttribute("type", "password");
    }
  }, [showPass]);

  return (
    <NotAuthPageLayout pageUtils={pageUtils}>
      <InputTextColumn
        field="username"
        showLabel={false}
        textAlign="left"
        icon={"icon-mobile"}
      />
      <InputTextColumn
        field="password"
        type="password"
        showLabel={false}
        textAlign="left"
        icon={`icon-eye3 icon-clickable${showPass ? " show" : ""}`}
        iconClick={() => setShowPass(!showPass)}
      />
      <div className="mb-10">
        {strings.forgot}
        <Link to={`${BASE_PATH}/users/forgot`} className="orange mx-5">
          {strings.recoverPassword}
        </Link>
      </div>
      <button
        className="btn btn-blue"
        onClick={pageUtils.useForm.handleSubmit(pageUtils.onSubmit)}
        type="button"
        title={strings.submit}
        disabled={layoutState?.loading}
      >
        {strings.submit}
      </button>
      <div className="line-gr m-td-30"></div>
      <div className="pd-30">
        {strings.notSignedup}
        <Link className="orange mx-5" to={`${BASE_PATH}/users/signup`}>
          {strings.signup}
        </Link>
      </div>
    </NotAuthPageLayout>
  );
};

export default Login;
