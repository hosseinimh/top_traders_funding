import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BlankPage } from "../../../../components";
import { PageUtils } from "./PageUtils";
import { useLocale } from "../../../../../hooks";
import {
  BASE_PATH,
  NOTIFICATION_SUB_CATEGORIES,
  STORAGE_PATH,
} from "../../../../../constants";
import Header from "../components/Header";
import { fetchAuthAction } from "../../../../../state/user/userActions";

const VerifyUserRequest3 = () => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const userState = useSelector((state) => state.userReducer);
  const pageState = useSelector((state) => state.pageReducer);
  const [selfieFileSelected, setSelfieFileSelected] = useState(null);
  const [identityFileSelected, setIdentityFileSelected] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { verifyUserRequestPage: strings, general } = useLocale();
  const pageUtils = new PageUtils();

  const onChangeSelfieFile = (e) => {
    const file = e?.target?.files[0];
    if (file) {
      if (["image/jpeg", "image/png"].includes(file.type)) {
        const imgPreview = document.querySelector("#img-preview-selfie");
        imgPreview.src = URL.createObjectURL(file);
      }
      setSelfieFileSelected(true);
      pageUtils.useForm.setValue("selfieFile", file);
    }
  };

  const onChangeIdentityFile = (e) => {
    const file = e?.target?.files[0];
    if (file) {
      if (["image/jpeg", "image/png"].includes(file.type)) {
        const imgPreview = document.querySelector("#img-preview-identity");
        imgPreview.src = URL.createObjectURL(file);
      }
      setIdentityFileSelected(true);
      pageUtils.useForm.setValue("identityFile", file);
    }
  };

  const removeSelfieFile = () => {
    document.querySelector(".img-input.selfie").value = "";
    const imgPreview = document.querySelector("#img-preview-selfie");
    imgPreview.src = "";
    setSelfieFileSelected(false);
    pageUtils.useForm.setValue("selfieFile", null);
  };

  const removeIdentityFile = () => {
    document.querySelector(".img-input.identity").value = "";
    const imgPreview = document.querySelector("#img-preview-identity");
    imgPreview.src = "";
    setIdentityFileSelected(false);
    pageUtils.useForm.setValue("identityFile", null);
  };

  useEffect(() => {
    if (selfieFileSelected === null) {
      return;
    }
    const uploadImage = document.querySelector(".upload-img.selfie");
    const imgPreview = document.querySelector(".img-preview.selfie");
    if (selfieFileSelected) {
      uploadImage.style.opacity = "0";
      imgPreview.style.display = "flex";
      setTimeout(() => {
        uploadImage.style.display = "none";
        imgPreview.style.opacity = "1";
      }, 400);
    } else if (selfieFileSelected === false) {
      imgPreview.style.opacity = "0";
      uploadImage.style.display = "flex";
      setTimeout(() => {
        imgPreview.style.display = "none";
        uploadImage.style.opacity = "1";
      }, 400);
    }
  }, [selfieFileSelected]);

  useEffect(() => {
    if (identityFileSelected === null) {
      return;
    }
    const uploadImage = document.querySelector(".upload-img.identity");
    const imgPreview = document.querySelector(".img-preview.identity");
    if (identityFileSelected) {
      uploadImage.style.opacity = "0";
      imgPreview.style.display = "flex";
      setTimeout(() => {
        uploadImage.style.display = "none";
        imgPreview.style.opacity = "1";
      }, 400);
    } else if (identityFileSelected === false) {
      imgPreview.style.opacity = "0";
      uploadImage.style.display = "flex";
      setTimeout(() => {
        imgPreview.style.display = "none";
        uploadImage.style.opacity = "1";
      }, 400);
    }
  }, [identityFileSelected]);

  useEffect(() => {
    if (!userState?.user) {
      return;
    }
    if (!userState?.user?.verifyRequest1At) {
      navigate(`${BASE_PATH}/users/verify_request1`);
      return;
    }
    if (!userState?.user?.emailVerifiedAt) {
      navigate(`${BASE_PATH}/users/verify_request2`);
      return;
    }
    if (userState?.user?.verifyRequest3At || userState?.user?.verifiedAt) {
      navigate(BASE_PATH);
      return;
    }
  }, [userState?.user]);

  useEffect(() => {
    const userVerifiedIndex =
      layoutState?.notifications?.userNotifications?.findIndex(
        (item) =>
          item.subCategory ===
          NOTIFICATION_SUB_CATEGORIES.USER_VERIFICATION_VERIFIED
      );
    if (userVerifiedIndex !== -1) {
      dispatch(fetchAuthAction());
    }
  }, [layoutState?.notifications]);

  return (
    <BlankPage pageUtils={pageUtils}>
      <div className="section fix-mr15">
        <Header />
        <div className="block pd-30">
          <div className="block-title pd-d-20">
            <h3>{strings.title4}</h3>
          </div>
          <div className="d-flex-wrap mb-20">
            <div className="upload-box">
              <div className="upload-img-box">
                {pageState?.props?.item?.selfieFile && (
                  <div className="img-preview d-block" style={{ opacity: "1" }}>
                    <div className="img">
                      <a
                        href={`${STORAGE_PATH}/users/selfies/${pageState.props.item.selfieFile}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          alt={strings.selfieFile}
                          src={`${STORAGE_PATH}/users/selfies/${pageState.props.item.selfieFile}`}
                        />
                      </a>
                    </div>
                  </div>
                )}
                <div className="img-preview selfie">
                  <div className="img">
                    <img id="img-preview-selfie" alt={strings.selfieFile} />
                  </div>
                  <div className="remove-file" onClick={removeSelfieFile}>
                    <i className="icon-trash"></i>
                  </div>
                </div>
                <div className="upload-img selfie">
                  <h3 className="text" style={{ marginBottom: "0.5rem" }}>
                    {strings.selfieFile}
                  </h3>
                  <span>{strings.selfieFileProperties}</span>
                  <input
                    accept="image/jpeg,image/png"
                    type="file"
                    className="img-input selfie"
                    onChange={(e) => onChangeSelfieFile(e)}
                  />
                  <button>{strings.selfieImage}</button>
                </div>
              </div>
            </div>
            <div className="upload-box-info d-flex-wrap align-center just-around">
              <div className="upload-box-text">
                <h3>{strings.selfieFileTips}</h3>
                <p className="text-warning" style={{ textAlign: "justify" }}>
                  {strings.selfieFileDescription1}
                </p>
                <p style={{ textAlign: "justify" }}>
                  {strings.selfieFileDescription2}
                </p>
              </div>
              <div className="upload-box-img">
                <img
                  src="https://kifpool.me/panel_v2/images/verify2.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="block-border"></div>
          <div className="block-title pd-d-20">
            <h3>{strings.title5}</h3>
          </div>
          <div className="d-flex-wrap">
            <div className="upload-box">
              <div className="upload-img-box">
                {pageState?.props?.item?.identityFile && (
                  <div className="img-preview d-block" style={{ opacity: "1" }}>
                    <div className="img">
                      <a
                        href={`${STORAGE_PATH}/users/identities/${pageState.props.item.identityFile}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <img
                          alt={strings.identityFile}
                          src={`${STORAGE_PATH}/users/identities/${pageState.props.item.identityFile}`}
                        />
                      </a>
                    </div>
                  </div>
                )}
                <div className="img-preview identity">
                  <div className="img">
                    <img id="img-preview-identity" alt={strings.identityFile} />
                  </div>
                  <div className="remove-file" onClick={removeIdentityFile}>
                    <i className="icon-trash"></i>
                  </div>
                </div>
                <div className="upload-img identity">
                  <h3 className="text" style={{ marginBottom: "0.5rem" }}>
                    {strings.identityFile}
                  </h3>
                  <span>{strings.identityFileProperties}</span>
                  <input
                    accept="image/jpeg,image/png"
                    type="file"
                    className="img-input identity"
                    onChange={(e) => onChangeIdentityFile(e)}
                  />
                  <button>{strings.identityImage}</button>
                </div>
              </div>
            </div>
            <div className="upload-box-info d-flex-wrap align-center just-around">
              <div className="upload-box-text">
                <h3>{strings.identityFileTips}</h3>
                <p className="text-warning" style={{ textAlign: "justify" }}>
                  {strings.identityFileDescription1}
                </p>
                <p style={{ textAlign: "justify" }}>
                  {strings.identityFileDescription2}
                </p>
              </div>
              <div className="upload-box-img">
                <img
                  src="https://kifpool.me/panel_v2/images/verify2.png"
                  alt=""
                />
              </div>
            </div>
          </div>
          {!userState?.user?.verifyRequest3At && (
            <>
              <div className="block-border"></div>
              <div className="btns d-flex mt-30">
                <button
                  className="btn btn-success"
                  type="button"
                  title={general.submit}
                  onClick={pageUtils?.useForm.handleSubmit(pageUtils.onSubmit)}
                  disabled={layoutState?.loading}
                >
                  {general.submit}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </BlankPage>
  );
};

export default VerifyUserRequest3;
