import React from "react";
import { useSelector } from "react-redux";

import Modal from "./Modal";
import InputTextColumn from "../Input/InputTextColumn";
import { useLocale } from "../../../hooks";
import utils from "../../../utils/Utils";
import { STORAGE_PATH, USER_ROLES } from "../../../constants";

function ProfileModal() {
  const layoutState = useSelector((state) => state.layoutReducer);
  const userState = useSelector((state) => state.userReducer);
  const { profileModal: strings } = useLocale();

  return (
    <Modal
      id="profileModal"
      title={`${userState?.user?.name} ${userState?.user?.family} - [ ${userState?.user?.username} ]`}
    >
      <InputTextColumn
        field="nameModal"
        readonly={true}
        strings={strings}
        showLabel
        icon="icon-user"
        value={userState?.user?.name}
        inputStyle={{ opacity: "1" }}
      />
      <InputTextColumn
        field="familyModal"
        readonly={true}
        strings={strings}
        showLabel
        icon="icon-user"
        value={userState?.user?.family}
        inputStyle={{ opacity: "1" }}
      />
      {userState?.user?.role === USER_ROLES.USER && (
        <>
          <InputTextColumn
            field="fatherNameModal"
            readonly={true}
            strings={strings}
            showLabel
            icon="icon-personalcard4"
            value={userState?.user?.fatherName}
            inputStyle={{ opacity: "1" }}
          />
          <InputTextColumn
            field="nationalNoModal"
            readonly={true}
            strings={strings}
            showLabel
            textAlign="left"
            icon="icon-personalcard4"
            value={userState?.user?.nationalNo}
            inputStyle={{ opacity: "1" }}
          />
          <InputTextColumn
            field="birthDateModal"
            readonly={true}
            strings={strings}
            showLabel
            textAlign="left"
            direction={layoutState?.direction}
            icon="icon-calendar-1"
            value={
              userState?.user?.birthDate
                ? utils.toLocaleDateString(
                    userState.user.birthDate,
                    layoutState?.locale
                  )
                : ""
            }
            inputStyle={{ opacity: "1" }}
          />
          <InputTextColumn
            field="genderModal"
            readonly={true}
            strings={strings}
            showLabel
            icon="icon-user"
            value={userState?.user?.genderText}
            inputStyle={{ opacity: "1" }}
          />
          <InputTextColumn
            field="mobileModal"
            readonly={true}
            strings={strings}
            showLabel
            textAlign="left"
            icon="icon-mobile"
            value={userState?.user?.mobile}
            inputStyle={{ opacity: "1" }}
          />
          <InputTextColumn
            field="telModal"
            readonly={true}
            strings={strings}
            showLabel
            textAlign="left"
            icon="icon-call-calling"
            value={userState?.user?.tel}
            inputStyle={{ opacity: "1" }}
          />
        </>
      )}
      <InputTextColumn
        field="emailModal"
        readonly={true}
        strings={strings}
        showLabel
        textAlign="left"
        icon="icon-sms4"
        value={userState?.user?.email}
        inputStyle={{ opacity: "1" }}
      />
      {userState?.user?.role === USER_ROLES.USER && (
        <>
          <InputTextColumn
            field="addressModal"
            readonly={true}
            strings={strings}
            showLabel
            icon="icon-location4"
            value={userState?.user?.address}
            inputStyle={{ opacity: "1" }}
          />
          <div className="d-flex d-flex-column">
            <div className="input-info">{strings.selfieFileModal}</div>
            {userState?.user?.selfieFile && (
              <div className="input-img input-bg input-border mb-30">
                <a
                  href={`${STORAGE_PATH}/users/selfies/${userState?.user?.selfieFile}`}
                  target="_blank"
                  rel="noReferrer"
                >
                  <img
                    className="m-15"
                    src={`${STORAGE_PATH}/users/selfies/${userState?.user?.selfieFile}`}
                  />
                </a>
              </div>
            )}
            {!userState?.user?.selfieFile && (
              <InputTextColumn
                field="selfieFileModal"
                readonly={true}
                strings={strings}
                icon="icon-gallery4"
                value={strings.notUploaded}
                inputStyle={{ opacity: "1" }}
              />
            )}
          </div>
          <div className="d-flex d-flex-column">
            <div className="input-info">{strings.identityFileModal}</div>
            {userState?.user?.identityFile && (
              <div className="input-img input-bg input-border mb-30">
                <a
                  href={`${STORAGE_PATH}/users/identities/${userState?.user?.identityFile}`}
                  target="_blank"
                  rel="noReferrer"
                >
                  <img
                    className="m-15"
                    src={`${STORAGE_PATH}/users/identities/${userState?.user?.identityFile}`}
                  />
                </a>
              </div>
            )}
            {!userState?.user?.identityFile && (
              <InputTextColumn
                field="identityFileModal"
                readonly={true}
                strings={strings}
                icon="icon-gallery4"
                value={strings.notUploaded}
                inputStyle={{ opacity: "1" }}
              />
            )}
          </div>
        </>
      )}
    </Modal>
  );
}

export default ProfileModal;
