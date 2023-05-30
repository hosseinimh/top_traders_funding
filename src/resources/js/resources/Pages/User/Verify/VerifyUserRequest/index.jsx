import React from "react";
import { useSelector } from "react-redux";

import {
  BlankPage,
  InputDatePickerColumn,
  InputRow,
  InputSelectColumn,
  InputTextColumn,
} from "../../../../components";
import { PageUtils } from "./PageUtils";
import { useLocale } from "../../../../../hooks";

const VerifyUserRequest = () => {
  const pageState = useSelector((state) => state.pageReducer);
  const { verifyUserPage: strings, genderTypes } = useLocale();
  const pageUtils = new PageUtils();
  const types = [
    { id: 1, value: genderTypes.male },
    { id: 2, value: genderTypes.female },
  ];

  return (
    <BlankPage pageUtils={pageUtils}>
      <div className="section fix-mr15">
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
              field="nationalCode"
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
              icon={"icon-sms"}
            />
          </InputRow>
          <InputTextColumn
            field="address"
            fullRow={false}
            icon={"icon-location4"}
          />
          <div className="block-border"></div>
          <div className="block-title pd-d-20">
            <h3>{strings.title3}</h3>
          </div>
          <div className="d-flex-wrap">
            <div className="upload-box">
              <div className="upload-img-box">
                <div className="img-preview">
                  <div>
                    <img alt={strings.file} />
                  </div>
                  <div>
                    <i className="icon-trash"></i>
                  </div>
                </div>
                <div className="upload-img">
                  <h3 className="white" style={{ marginBottom: "0.5rem" }}>
                    {strings.file}
                  </h3>
                  <span>{strings.fileProperties}</span>
                  <input accept="image/*" type="file" className="img-input" />
                  <button>{strings.image}</button>
                </div>
              </div>
            </div>
            <div className="upload-box-info d-flex-wrap align-center just-around">
              <div className="upload-box-text">
                <h3>{strings.fileTips}</h3>
                <p className="text-warning" style={{ textAlign: "justify" }}>
                  {strings.fileDescription1}
                </p>
                <p className="text-warning" style={{ textAlign: "justify" }}>
                  {strings.fileDescription2}
                </p>
                <p style={{ textAlign: "justify" }}>
                  {strings.fileDescription3}
                </p>
              </div>
              <div>
                <img
                  src="https://kifpool.me/panel_v2/images/verify2.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BlankPage>
  );
};

export default VerifyUserRequest;
