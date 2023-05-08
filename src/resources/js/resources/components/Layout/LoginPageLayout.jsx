import React from "react";
import { useSelector } from "react-redux";

import { AlertState } from "../../components";
import BasePageLayout from "./BasePageLayout";
import { Link } from "react-router-dom";
import { BASE_PATH } from "../../../constants";
import { useLocale } from "../../../hooks";

const LoginPageLayout = ({ children, pageUtils }) => {
  const { footer } = useLocale();
  const layoutState = useSelector((state) => state.layoutReducer);

  return (
    <BasePageLayout authPage={false} pageUtils={pageUtils}>
      <div
        className="app-container"
        style={{ minHeight: "calc(100vh - 60px)" }}
      >
        <div
          className="bg-plum-plate bg-animation"
          style={{ minHeight: "calc(100vh - 60px)" }}
        >
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "calc(100vh - 60px)" }}
          >
            <div className="mx-auto app-login-box col-md-8">
              <div className="modal-dialog w-100 mx-auto">
                <div className="modal-content">
                  <div className="modal-body">
                    <div className="h5 modal-title text-center">
                      <h4 className="mt-2">
                        <div>{pageUtils.strings.welcome}</div>
                        <span className="small">
                          {pageUtils.strings.description}
                        </span>
                      </h4>
                    </div>
                    <AlertState />
                    <div className="row">{children}</div>
                  </div>
                  <div className="modal-footer justify-content-between">
                    <div
                      className="mx-3 d-flex flex-column"
                      style={{ gap: "0.5rem" }}
                    >
                      <Link to={`${BASE_PATH}/users/forgot`}>
                        {pageUtils.strings.forgot}
                      </Link>
                      <Link to={`${BASE_PATH}/users/signup`}>
                        {pageUtils.strings.signup}
                      </Link>
                    </div>
                    <div className="mx-3">
                      <button
                        className="btn btn-primary btn-lg"
                        onClick={pageUtils.useForm.handleSubmit(
                          pageUtils.onSubmit
                        )}
                        type="button"
                        title={pageUtils.strings.login}
                        disabled={layoutState?.loading}
                      >
                        {(!layoutState?.width || layoutState?.width > 395) &&
                          pageUtils.strings.login}
                        {layoutState?.width < 395 && pageUtils.strings.loginSM}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center text-white opacity-8 mt-3 mb-4">
                {footer.copyright}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BasePageLayout>
  );
};

export default LoginPageLayout;
