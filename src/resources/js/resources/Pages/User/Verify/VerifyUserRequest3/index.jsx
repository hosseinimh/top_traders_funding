import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BlankPage } from "../../../../components";
import { PageUtils } from "./PageUtils";
import { useLocale } from "../../../../../hooks";
import { BASE_PATH, STORAGE_PATH } from "../../../../../constants";
import Header from "../components/Header";

const VerifyUserRequest3 = () => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const userState = useSelector((state) => state.userReducer);
  const pageState = useSelector((state) => state.pageReducer);
  const [selfieFileSelected, setSelfieFileSelected] = useState(null);
  const [identityFileSelected, setIdentityFileSelected] = useState(null);
  const navigate = useNavigate();
  const { verifyUserRequestPage: strings, general, validation } = useLocale();
  const pageUtils = new PageUtils();

  const onChangeSelfieFile = (e) => {
    const file = e?.target?.files[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        document.querySelector(".img-input.selfie").value = "";
        toast.error(validation.fileMaxSizeMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: layoutState?.theme?.name,
        });
        return;
      }
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        document.querySelector(".img-input.selfie").value = "";
        toast.error(validation.fileTypeMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: layoutState?.theme?.name,
        });
        return;
      }
      const imgPreview = document.querySelector("#img-preview-selfie");
      imgPreview.src = URL.createObjectURL(file);
      setSelfieFileSelected(true);
      pageUtils.onSetSelfieFile(file);
    }
  };

  const onChangeIdentityFile = (e) => {
    const file = e?.target?.files[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        document.querySelector(".img-input.identity").value = "";
        toast.error(validation.fileMaxSizeMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: layoutState?.theme?.name,
        });
        return;
      }
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        document.querySelector(".img-input.identity").value = "";
        toast.error(validation.fileTypeMessage, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          progress: undefined,
          theme: layoutState?.theme?.name,
        });
        return;
      }
      const imgPreview = document.querySelector("#img-preview-identity");
      imgPreview.src = URL.createObjectURL(file);
      setIdentityFileSelected(true);
      pageUtils.onSetIdentityFile(file);
    }
  };

  const removeSelfieFile = () => {
    document.querySelector(".img-input.selfie").value = "";
    const imgPreview = document.querySelector("#img-preview-selfie");
    imgPreview.src = "";
    setSelfieFileSelected(false);
    pageUtils.onSetSelfieFile(null);
  };

  const removeIdentityFile = () => {
    document.querySelector(".img-input.identity").value = "";
    const imgPreview = document.querySelector("#img-preview-identity");
    imgPreview.src = "";
    setIdentityFileSelected(false);
    pageUtils.onSetIdentityFile(null);
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
                    accept="image/jpeg,image/png,image/gif"
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
                    accept="image/jpeg,image/png,image/gif"
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={layoutState?.direction === "rtl" ? true : false}
        pauseOnHover
        transition={Zoom}
        theme={layoutState?.theme?.name}
      />
    </BlankPage>
  );
};

export default VerifyUserRequest3;
