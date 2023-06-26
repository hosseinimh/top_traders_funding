import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BlankPage, InputRow, InputTextColumn } from "../../../../components";
import { PageUtils } from "./PageUtils";
import { useLocale } from "../../../../../hooks";
import Header from "../components/Header";
import { BASE_PATH, LOCALES } from "../../../../../constants";

const VerifyUserRequest2 = () => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const userState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const { verifyUserRequestPage: strings, general } = useLocale();
  const pageUtils = new PageUtils();
  const isPersian = general.locale === LOCALES.FA ? true : false;

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
            />
            <InputTextColumn
              field="tel"
              type="number"
              textAlign="left"
              fullRow={false}
              icon={"icon-call-calling"}
            />
            <InputTextColumn
              field="email"
              textAlign="left"
              fullRow={false}
              icon={"icon-sms4"}
              readonly={userState?.user?.emailVerifiedAt ? true : false}
            />
          </InputRow>
          <InputTextColumn
            field="address"
            fullRow={false}
            icon={"icon-location4"}
          />
          <div className="block-border"></div>
          <div className="btns d-flex mt-30">
            {!userState?.user?.verifyRequest3At && (
              <button
                className="btn btn-success"
                type="button"
                title={general.submit}
                onClick={pageUtils?.useForm.handleSubmit(pageUtils.onSubmit)}
                disabled={layoutState?.loading}
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
                    isPersian ? "icon-arrow-left" : "icon-arrow-right-1"
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
