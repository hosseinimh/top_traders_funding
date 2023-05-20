import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { AlertState } from "../../components";
import BasePageLayout from "./BasePageLayout";
import { IMAGES_PATH } from "../../../constants";
import style from "./not_auth.css";
import { useLocale } from "../../../hooks";

const NotAuthPageLayout = ({ children, pageUtils }) => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const { notAuthPages: strings } = useLocale();

  useEffect(() => {
    if (!document.head.querySelector("style")) {
      document.head.innerHTML += `<style>${style}</style>`;
    }
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
          <div className="info" style={{ marginBottom: "-10px" }}>
            <div>{strings._title}</div>
            <div>{strings._subTitle}</div>
          </div>
        </div>
        <div className="login-box d-flex-column">
          <div className="login-form">
            <div className="title pd-t-30">
              <h2>{pageUtils.strings._title}</h2>
              <span>{pageUtils.strings._subTitle}</span>
            </div>
            <div className="line-gr mb-20"></div>
            <AlertState />
            {children}
          </div>
        </div>
      </div>
    </BasePageLayout>
  );
};

export default NotAuthPageLayout;
