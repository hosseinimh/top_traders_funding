import React from "react";
import { useSelector } from "react-redux";

import BasePageLayout from "./BasePageLayout";
import { BASE_PATH } from "../../../constants";
import { Link } from "react-router-dom";

const SignupPageLayout = ({ children, pageUtils }) => {
    const layoutState = useSelector((state) => state.layoutReducer);

    return (
        <BasePageLayout authPage={false} pageUtils={pageUtils}>
            <div
                className="app-container app-theme-white body-tabs-shadow"
                style={{ height: "calc(100vh - 60px)" }}
            >
                <div
                    className="app-container"
                    style={{ minHeight: "calc(100vh - 60px)" }}
                >
                    <div style={{ minHeight: "calc(100vh - 60px)" }}>
                        <div
                            className="no-gutters row"
                            style={{ minHeight: "calc(100vh - 60px)" }}
                        >
                            <div
                                className="d-md-flex d-sm-block bg-white justify-content-center align-items-center col-md-12 col-lg-7"
                                style={{ minHeight: "calc(100vh - 60px)" }}
                            >
                                <div className="mx-auto app-login-box col-sm-12 col-md-10 col-lg-9 mt-4">
                                    <h4>
                                        <div>{pageUtils.strings.welcome}</div>
                                        <span className="small">
                                            {pageUtils.strings.description1}{" "}
                                            <span className="text-success">
                                                {pageUtils.strings.description2}
                                            </span>{" "}
                                            {pageUtils.strings.description3}
                                        </span>
                                    </h4>
                                    <div className="row">{children}</div>
                                    <div className="mt-4 d-flex align-items-center mb-4">
                                        <div className="mxdir-auto">
                                            <button
                                                className="btn-wide btn-pill btn-shadow btn-hover-shine btn btn-primary btn-lg"
                                                onClick={pageUtils.useForm.handleSubmit(
                                                    pageUtils.onSubmit
                                                )}
                                                type="button"
                                                title={pageUtils.strings.signup}
                                                disabled={layoutState?.loading}
                                            >
                                                {pageUtils.strings.signup}
                                            </button>
                                        </div>
                                        <h6 className="mb-0 small">
                                            {pageUtils.strings.haveAccount}{" "}
                                            <Link
                                                to={`${BASE_PATH}/users/login`}
                                                className="text-primary"
                                            >
                                                {(!layoutState?.width ||
                                                    layoutState?.width > 395) &&
                                                    pageUtils.strings.login}
                                                {layoutState?.width < 395 &&
                                                    pageUtils.strings.loginSM}
                                            </Link>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <div className="d-lg-flex d-md-none col-lg-5">
                                <div className="slider-light">
                                    <div className="slick-slider slick-initialized">
                                        <div>
                                            <div
                                                className="position-relative d-flex justify-content-center align-items-center bg-premium-dark"
                                                style={{
                                                    minHeight:
                                                        "calc(100vh - 60px)",
                                                }}
                                                tabIndex="-1"
                                            >
                                                <div
                                                    className="slide-img-bg"
                                                    style={{
                                                        backgroundImage:
                                                            'url("/assets/images/menu-bg1.jpg")',
                                                    }}
                                                ></div>
                                                <div className="slider-content">
                                                    <h3>
                                                        Scalable, Modular,
                                                        Consistent
                                                    </h3>
                                                    <p>
                                                        Easily exclude the
                                                        components you don't
                                                        require. Lightweight,
                                                        consistent Bootstrap
                                                        based styles across all
                                                        elements and components
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BasePageLayout>
    );
};

export default SignupPageLayout;
