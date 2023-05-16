import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { AlertState } from "../../components";
import BasePageLayout from "./BasePageLayout";
import { Link } from "react-router-dom";
import { ASSETS_PATH, BASE_PATH, IMAGES_PATH } from "../../../constants";
import { useLocale } from "../../../hooks";
import style from "./login.css";

const LoginPageLayout = ({ children, pageUtils }) => {
  const { footer } = useLocale();
  const layoutState = useSelector((state) => state.layoutReducer);

  useEffect(() => {
    document.head.innerHTML += `<style>${style}</style>`;
  }, []);

  return (
    <BasePageLayout authPage={false} pageUtils={pageUtils}>
      <div className="login-page d-flex-wrap">
        <div className="login-info d-flex-column">
          <div className="logo">
            <img src={`${IMAGES_PATH}/logo-large.svg`} alt="" />
          </div>

          <div className="img">
            <img src={`${IMAGES_PATH}/screen.png`} alt="" />
          </div>
          <div className="ft">
            <div className="info">
              <div>حساب اینترنتی مطمئن برای نگهداری دارایی شما</div>
              <div>
                با سامانه کیف پول من خرید و فروش و دارایی های دیجیتال خود را به
                آسان مدیریت کنید
              </div>
            </div>
          </div>
        </div>
        <div className="login-box d-flex-column">
          {
            <form
              className="login-form"
              method="post"
              id="LoginForm"
              noValidate="novalidate"
            >
              <div className="title pd-t-30">
                <h2>{pageUtils.strings._title}</h2>
                <span>{pageUtils.strings._subTitle}</span>
              </div>
              <div className="line-gr mb-20"></div>
              <AlertState />
              {children}
              <div className="mb-10">
                رمز عبور خود را فراموش کرده اید؟{" "}
                <a
                  className="orange"
                  target="_blank"
                  href="https://kifpool.me/member_v2/forget-password"
                >
                  بازیابی رمز عبور
                </a>
              </div>
              <button
                className="btn btn-blue"
                onClick={pageUtils.useForm.handleSubmit(pageUtils.onSubmit)}
                type="button"
                title={pageUtils.strings.login}
                disabled={layoutState?.loading}
              >
                {pageUtils.strings.login}
              </button>
              <div className="line-gr m-td-30"></div>
              <div className="pd-30">
                حساب کاربری ندارید؟{" "}
                <a
                  className="orange"
                  href="https://kifpool.me/member_v2/register"
                >
                  ثبت نام کنید
                </a>
              </div>
            </form>
          }
        </div>
      </div>
    </BasePageLayout>
  );
};

export default LoginPageLayout;
