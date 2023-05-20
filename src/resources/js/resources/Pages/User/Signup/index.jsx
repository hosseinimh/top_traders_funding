import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  InputRow,
  InputTextColumn,
  NotAuthPageLayout,
} from "../../../components";
import { PageUtils } from "./PageUtils";
import { useLocale } from "../../../../hooks";
import { BASE_PATH } from "../../../../constants";

const Signup = () => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const pageUtils = new PageUtils();
  const { signupPage: strings } = useLocale();

  return (
    <NotAuthPageLayout pageUtils={pageUtils}>
      <InputTextColumn field="username" textAlign="left" />
      <InputRow>
        <InputTextColumn
          field="password"
          type="password"
          textAlign="left"
          fullRow={false}
        />
        <InputTextColumn
          field="confirmPassword"
          type="password"
          textAlign="left"
          fullRow={false}
        />
      </InputRow>
      <InputTextColumn field="email" textAlign="left" />
      <InputRow>
        <InputTextColumn field="name" fullRow={false} />
        <InputTextColumn field="family" fullRow={false} />
      </InputRow>
      <button
        className="btn btn-blue mt-30 px-30"
        onClick={pageUtils.useForm.handleSubmit(pageUtils.onSubmit)}
        type="button"
        title={strings.submit}
        disabled={layoutState?.loading}
      >
        {strings.submit}
      </button>
      <div className="line-gr m-td-30"></div>
      <div className="pd-30">
        {strings.haveAccount}
        <Link className="orange mx-5" to={`${BASE_PATH}/users/login`}>
          {strings.login}
        </Link>
      </div>
    </NotAuthPageLayout>
  );
};

export default Signup;
