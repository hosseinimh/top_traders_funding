import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BlankPage, InputRow, InputTextColumn } from "../../../../components";
import { PageUtils } from "./PageUtils";
import { useLocale } from "../../../../../hooks";
import Header from "../components/Header";
import {
  BASE_PATH,
  NOTIFICATION_SUB_CATEGORIES,
} from "../../../../../constants";
import { fetchAuthAction } from "../../../../../state/user/userActions";

const VerifyUserRequest2 = () => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const userState = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { verifyUserRequestPage: strings, general } = useLocale();
  const [disabled, setDisabled] = useState(false);
  const pageUtils = new PageUtils();

  useEffect(() => {
    if (!userState?.user) {
      return;
    }
    if (!userState?.user?.verifyRequest1At) {
      navigate(`${BASE_PATH}/users/verify_request1`);
      return;
    }
    if (userState?.user?.emailVerifiedAt) {
      if (userState?.user?.verifyRequest3At || userState?.user?.verifiedAt) {
        navigate(BASE_PATH);
        return;
      }
      navigate(`${BASE_PATH}/users/verify_request3`);
      return;
    }
  }, [userState?.user]);

  useEffect(() => {
    const emailVerifiedIndex =
      layoutState?.notifications?.userNotifications?.findIndex(
        (item) =>
          item.subCategory === NOTIFICATION_SUB_CATEGORIES.USER_EMAIL_VERIFIED
      );
    const userVerifiedIndex =
      layoutState?.notifications?.userNotifications?.findIndex(
        (item) =>
          item.subCategory ===
          NOTIFICATION_SUB_CATEGORIES.USER_VERIFICATION_VERIFIED
      );
    if (emailVerifiedIndex !== -1 || userVerifiedIndex !== -1) {
      dispatch(fetchAuthAction());
    }
  }, [layoutState?.notifications]);

  useEffect(() => {
    if (
      pageUtils?.pageState?.props?.sentEmail ||
      pageUtils?.pageState?.props?.token
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [pageUtils?.pageState?.props]);

  return (
    <BlankPage pageUtils={pageUtils}>
      <div className="section fix-mr15">
        <Header />
        <div className="block pd-30">
          <div className="block-title pd-d-20">
            <h3>{strings.title2}</h3>
          </div>
          <InputRow>
            <InputTextColumn
              field="mobile"
              type="number"
              textAlign="left"
              fullRow={false}
              icon={"icon-mobile"}
              readonly={disabled}
            />
            <InputTextColumn
              field="tel"
              type="number"
              textAlign="left"
              fullRow={false}
              icon={"icon-call-calling"}
              readonly={disabled}
            />
            <InputTextColumn
              field="email"
              textAlign="left"
              fullRow={false}
              icon={"icon-sms4"}
              readonly={
                userState?.user?.emailVerifiedAt || disabled ? true : false
              }
            />
          </InputRow>
          <InputTextColumn
            field="address"
            fullRow={false}
            icon={"icon-location4"}
            readonly={disabled}
          />
          <div className="block-border"></div>
          <div className="btns d-flex mt-30">
            {!userState?.user?.verifyRequest3At && (
              <button
                className="btn btn-success"
                type="button"
                title={general.submit}
                onClick={pageUtils?.useForm.handleSubmit(pageUtils.onSubmit)}
                disabled={layoutState?.loading || disabled}
              >
                {general.submit}
              </button>
            )}
            {userState?.user?.emailVerifiedAt && (
              <button
                className="btn btn-primary"
                type="button"
                title={strings.next}
                onClick={() => navigate(`${BASE_PATH}/users/verify_request3`)}
                disabled={layoutState?.loading}
              >
                {strings.next}
                <i
                  className={`${
                    layoutState?.direction === "rtl"
                      ? "icon-arrow-left"
                      : "icon-arrow-right-1"
                  } mx-5`}
                ></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </BlankPage>
  );
};

export default VerifyUserRequest2;
