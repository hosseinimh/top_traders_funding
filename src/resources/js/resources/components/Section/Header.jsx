import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BASE_PATH, USER_ROLES, ASSETS_PATH } from "../../../constants";
import { header as strings, general } from "../../../constants/strings";
import { fetchLogoutAction } from "../../../state/user/userActions";
import utils from "../../../utils/Utils";
import CustomLink from "../Link/CustomLink";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userState = useSelector((state) => state.userReducer);
    const authUser = utils.getLSUser();

    const userTitle = () => {
        let title =
            authUser?.role === USER_ROLES.ADMINISTRATOR
                ? general.administrator
                : general.user;

        title += `: [ ${authUser?.username} ]`;

        return title;
    };

    const widgetUserTitle = () => {
        let title =
            authUser?.role === USER_ROLES.ADMINISTRATOR
                ? general.administrator
                : general.user;

        return (
            <>
                <p className="mb-0">{title}</p>
                <p>{authUser?.username}</p>
            </>
        );
    };

    const onLogout = () => {
        dispatch(fetchLogoutAction());
    };

    const onEditUser = () => {
        navigate(`${BASE_PATH}/users/edit`);
    };

    const onChanePassword = () => {
        navigate(`${BASE_PATH}/users/change_password`);
    };

    const renderLanguageDropdown = () => {
        return (
            <div className="dropdown">
                <button
                    type="button"
                    data-toggle="dropdown"
                    className="p-0 mr-2 btn btn-link language-dropdown"
                    aria-expanded="false"
                >
                    <span className="icon-wrapper icon-wrapper-alt rounded-circle">
                        <span className="icon-wrapper-bg bg-focus"></span>
                        <span className="language-icon opacity-8 flag large IR"></span>
                    </span>
                </button>
                <div
                    tabIndex="-1"
                    role="menu"
                    aria-hidden="true"
                    className="rm-pointers dropdown-menu dropdown-menu-right language-popup"
                >
                    <div className="dropdown-menu-header">
                        <div className="dropdown-menu-header-inner pt-4 pb-4 bg-focus">
                            <div
                                className="menu-header-image opacity-05"
                                style={{
                                    backgroundImage: `url("${ASSETS_PATH}/images/menu-bg2.jpg")`,
                                }}
                            ></div>
                            <div className="menu-header-content text-center text-white">
                                <h6 className="menu-header-subtitle mt-0">
                                    {" "}
                                    Choose Language
                                </h6>
                            </div>
                        </div>
                    </div>
                    <button
                        type="button"
                        tabIndex="0"
                        className="dropdown-item"
                    >
                        <span className="ml-3 opacity-8 flag large US"></span>{" "}
                        USA
                    </button>
                </div>
            </div>
        );
    };

    const renderUserLgDropdown = () => {
        return (
            <div className="header-btn-lg pr-0">
                <div className="widget-content p-0">
                    <div className="widget-content-wrapper">
                        <div className="widget-content-left ml-2">
                            <div className="btn-group">
                                <a
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    className="p-0 btn user-dropdown"
                                >
                                    <img
                                        width="42"
                                        className="rounded-circle"
                                        src={`${ASSETS_PATH}/images/user.png`}
                                        alt={`${authUser?.name} ${authUser?.family}`}
                                    />
                                    <i className="fa fa-angle-down ml-2 opacity-8"></i>
                                </a>
                                <div
                                    tabIndex="-1"
                                    role="menu"
                                    aria-hidden="true"
                                    className="rm-pointers dropdown-menu-lg dropdown-menu dropdown-menu-left user-popup"
                                >
                                    <div className="dropdown-menu-header">
                                        <div className="dropdown-menu-header-inner bg-info">
                                            <div
                                                className="menu-header-image opacity-2"
                                                style={{
                                                    backgroundImage: `url("${ASSETS_PATH}/images/menu-bg2.jpg")`,
                                                }}
                                            ></div>
                                            <div className="menu-header-content text-right">
                                                <div className="widget-content p-0">
                                                    <div className="widget-content-wrapper">
                                                        <div className="widget-content-right mr-3 mb-3">
                                                            <img
                                                                width="42"
                                                                className="rounded-circle"
                                                                src={`${ASSETS_PATH}/images/user.png`}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="widget-content-right">
                                                            <div className="widget-heading">
                                                                {`${authUser?.name} ${authUser?.family}`}
                                                            </div>
                                                            <div className="widget-subheading opacity-6">
                                                                {widgetUserTitle()}
                                                            </div>
                                                        </div>
                                                        <div className="widget-content-right mr-2">
                                                            <button
                                                                className="btn-pill btn-shadow btn-shine btn btn-focus mb-3"
                                                                onMouseUp={
                                                                    onLogout
                                                                }
                                                            >
                                                                {strings.logout}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="scroll-area-xs"
                                        style={{ height: "100px" }}
                                    >
                                        <div className="scrollbar-container ps">
                                            <ul className="nav flex-column">
                                                <li className="nav-item-header nav-item">
                                                    {strings.tools}
                                                </li>
                                                <li className="nav-item">
                                                    <CustomLink
                                                        className="nav-link mr-2"
                                                        onClick={
                                                            onChanePassword
                                                        }
                                                    >
                                                        {strings.changePassword}
                                                    </CustomLink>
                                                </li>
                                                <li className="nav-item">
                                                    <CustomLink
                                                        className="nav-link mr-2"
                                                        onClick={onEditUser}
                                                    >
                                                        {strings.editProfile}
                                                    </CustomLink>
                                                </li>
                                                {userState?.user?.role ===
                                                    USER_ROLES.USER && (
                                                    <>
                                                        <li className="nav-item-header nav-item">
                                                            My Account
                                                        </li>
                                                        <li className="nav-item">
                                                            <a
                                                                href="#"
                                                                className="nav-link"
                                                            >
                                                                Settings
                                                                <div className="ml-auto badge badge-success">
                                                                    New
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a
                                                                href="#"
                                                                className="nav-link"
                                                            >
                                                                Messages
                                                                <div className="ml-auto badge badge-warning">
                                                                    512
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li className="nav-item">
                                                            <a
                                                                href="#"
                                                                className="nav-link"
                                                            >
                                                                Logs
                                                            </a>
                                                        </li>
                                                    </>
                                                )}
                                            </ul>
                                            <div
                                                className="ps__rail-x"
                                                style={{
                                                    left: "0px",
                                                    bottom: "0px",
                                                }}
                                            >
                                                <div
                                                    className="ps__thumb-x"
                                                    tabIndex="0"
                                                    style={{
                                                        left: "0px",
                                                        width: "0px",
                                                    }}
                                                ></div>
                                            </div>
                                            <div
                                                className="ps__rail-y"
                                                style={{
                                                    top: "0px",
                                                    right: "0px",
                                                }}
                                            >
                                                <div
                                                    className="ps__thumb-y"
                                                    tabIndex="0"
                                                    style={{
                                                        top: "0px",
                                                        height: "0px",
                                                    }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                    {userState?.user?.role ===
                                        USER_ROLES.USER && (
                                        <>
                                            <ul className="nav flex-column">
                                                <li className="nav-item-divider mb-0 nav-item"></li>
                                            </ul>
                                            <div className="grid-menu grid-menu-2col">
                                                <div className="no-gutters row">
                                                    <div className="col-sm-6">
                                                        <button className="btn-icon-vertical btn-transition btn-transition-alt pt-2 pb-2 btn btn-outline-warning">
                                                            <i className="pe-7s-chat icon-gradient bg-amy-crisp btn-icon-wrapper mb-2"></i>{" "}
                                                            Message Inbox
                                                        </button>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <button className="btn-icon-vertical btn-transition btn-transition-alt pt-2 pb-2 btn btn-outline-danger">
                                                            <i className="pe-7s-ticket icon-gradient bg-love-kiss btn-icon-wrapper mb-2"></i>
                                                            <b>
                                                                Support Tickets
                                                            </b>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className="nav flex-column">
                                                <li className="nav-item-divider nav-item"></li>
                                                <li className="nav-item-btn text-center nav-item">
                                                    <button className="btn-wide btn btn-primary btn-sm">
                                                        {" "}
                                                        Open Messages{" "}
                                                    </button>
                                                </li>
                                            </ul>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="widget-content-left  ml-3 header-user-info">
                            <div className="widget-heading">
                                {`${authUser?.name} ${authUser?.family}`}
                            </div>
                            <div className="widget-subheading">
                                {userTitle()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="app-header header-shadow">
            <div className="app-header__logo">
                <div className="logo-src">
                    <span>{general.brandLogo}</span>
                </div>

                <div className="header__pane mr-auto">
                    <div>
                        {userState?.user && (
                            <button
                                type="button"
                                className="hamburger close-sidebar-btn hamburger--elastic sidebar-btn-lg"
                            >
                                <span className="hamburger-box">
                                    <span className="hamburger-inner"></span>
                                </span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="app-header__mobile-menu">
                <div>
                    {userState?.user && (
                        <button
                            type="button"
                            className="hamburger hamburger--elastic mobile-toggle-nav sidebar-btn-sm"
                        >
                            <span className="hamburger-box">
                                <span className="hamburger-inner"></span>
                            </span>
                        </button>
                    )}
                </div>
            </div>
            <div className="app-header__menu">
                <span>
                    <button
                        type="button"
                        className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav mobile-dropdown"
                    >
                        <span className="btn-icon-wrapper">
                            <i className="fa fa-ellipsis-v fa-w-6"></i>
                        </span>
                    </button>
                </span>
            </div>
            <div className="app-header__content">
                <div className="app-header-left">
                    <div className="header-dots">
                        {renderLanguageDropdown()}
                    </div>
                    {userState?.user && renderUserLgDropdown()}
                </div>
            </div>
        </div>
    );
};

export default Header;
