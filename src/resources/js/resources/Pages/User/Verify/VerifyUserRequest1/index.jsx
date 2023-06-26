import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  BlankPage,
  InputDatePickerColumn,
  InputRow,
  InputSelectColumn,
  InputTextColumn,
} from "../../../../components";
import { PageUtils } from "./PageUtils";
import { useLocale } from "../../../../../hooks";
import Header from "../components/Header";
import { BASE_PATH, LOCALES } from "../../../../../constants";

const VerifyUserRequest1 = () => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const userState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const { verifyUserRequestPage: strings, genderTypes, general } = useLocale();
  const pageUtils = new PageUtils();
  const types = [
    { id: 1, value: genderTypes.male },
    { id: 2, value: genderTypes.female },
  ];
  const isPersian = general.locale === LOCALES.FA ? true : false;

  useEffect(() => {
    if (!userState?.user) {
      return;
    }
    if (userState?.user?.verifyRequest1At) {
      if (userState?.user?.emailVerifiedAt) {
        if (userState?.user?.verifyRequest3At || userState?.user?.verifiedAt) {
          navigate(BASE_PATH);
          return;
        }
        navigate(`${BASE_PATH}/users/verify_request3`);
        return;
      }
      navigate(`${BASE_PATH}/users/verify_request2`);
      return;
    }
  }, [userState?.user]);

  return (
    <BlankPage pageUtils={pageUtils}>
      <div className="section fix-mr15">
        <Header />
        <div className="block pd-30">
          <div className="block-title pd-d-20">
            <h3>{strings.title1}</h3>
          </div>
          <InputRow>
            <InputTextColumn field="name" fullRow={false} icon={"icon-user"} />
            <InputTextColumn
              field="family"
              fullRow={false}
              icon={"icon-user"}
            />
            <InputTextColumn
              field="fatherName"
              fullRow={false}
              icon={"icon-personalcard4"}
            />
          </InputRow>
          <InputRow>
            <InputTextColumn
              field="nationalNo"
              type="number"
              textAlign="left"
              fullRow={false}
              icon={"icon-personalcard4"}
            />
            <InputTextColumn
              field="identityNo"
              type="number"
              textAlign="left"
              fullRow={false}
              icon={"icon-personalcard4"}
            />
            <InputDatePickerColumn field="birthDate" fullRow={false} />
            <InputSelectColumn field="gender" items={types} fullRow={false} />
          </InputRow>
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
            {userState?.user?.verifyRequest1At && (
              <button
                className="btn btn-primary"
                type="button"
                title={strings.next}
                onClick={() => navigate(`${BASE_PATH}/users/verify_request2`)}
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

export default VerifyUserRequest1;
