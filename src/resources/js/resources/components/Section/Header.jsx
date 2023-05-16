import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  BASE_PATH,
  USER_ROLES,
  ASSETS_PATH,
  LOCALES,
  IMAGES_PATH,
} from "../../../constants";
import { fetchLogoutAction } from "../../../state/user/userActions";
import utils from "../../../utils/Utils";
import CustomLink from "../Link/CustomLink";
import {
  setLocaleAction,
  setLoadingAction,
  toggleSidebarAction,
} from "../../../state/layout/layoutActions";
import { useLocale } from "../../../hooks";
import { User } from "../../../http/entities";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { header: strings, general } = useLocale();
  const userState = useSelector((state) => state.userReducer);
  const authUser = utils.getLSUser();

  const toggleSidebar = () => {
    dispatch(toggleSidebarAction());
  };

  const setLocale = (locale) => handleSetLocale(locale);

  const handleSetLocale = async (locale) => {
    const prevLocale = utils.getLSVariable("locale");
    if (prevLocale === locale) {
      return;
    }
    dispatch(setLoadingAction(true));
    dispatch(setLocaleAction(locale));
    const user = new User();
    await user.setLocale(locale);
    window.location.reload();
  };

  const userTitle = () => {
    return authUser?.role === USER_ROLES.ADMINISTRATOR
      ? general.administrator
      : "";
  };

  const widgetUserTitle = () => {
    let title =
      authUser?.role === USER_ROLES.ADMINISTRATOR ? general.administrator : "";

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

  const renderLocalesDropdown = () => {
    let flag;
    let locale = utils.getLSVariable("locale");
    switch (locale) {
      case "fa":
        flag = "IR";
        break;
      case "en":
        flag = "US";
        break;
      default:
        flag = "IR";
        break;
    }
    return (
      <div className="dropdown">
        <button
          type="button"
          data-toggle="dropdown"
          className="p-0 btn btn-link locale-dropdown"
          aria-expanded="false"
        >
          <span className="icon-wrapper icon-wrapper-alt rounded-circle">
            <span className="icon-wrapper-bg bg-focus"></span>
            <span
              className={`language-icon opacity-8 flag large ${flag}`}
            ></span>
          </span>
        </button>
        <div
          tabIndex="-1"
          role="menu"
          aria-hidden="true"
          className="rm-pointers dropdown-menu dropdown-menu-left locale-popup"
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
                  {strings.chooseLocale}
                </h6>
              </div>
            </div>
          </div>
          <button
            type="button"
            tabIndex="0"
            className={`dropdown-item ${flag === "US" ? "active" : ""}`}
            onClick={() => setLocale(LOCALES.EN)}
          >
            <span className="mxdir-3 opacity-8 flag large US"></span>{" "}
            {strings.us}
          </button>
          <button
            type="button"
            tabIndex="0"
            className={`dropdown-item ${flag === "IR" ? "active" : ""}`}
            onClick={() => setLocale(LOCALES.FA)}
          >
            <span className="mxdir-3 opacity-8 flag large IR"></span>{" "}
            {strings.fa}
          </button>
        </div>
      </div>
    );
  };

  const renderUserLgDropdown = () => {
    return (
      <div className="header-btn-lg">
        <div className="widget-content p-0">
          <div className="widget-content-wrapper">
            <div className="widget-content-left">
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
                    alt={`${authUser?.name ?? ""} ${authUser?.family ?? ""}`}
                  />
                  <i className="fa fa-angle-down mxdir-2 opacity-8"></i>
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
                      <div className="menu-header-content">
                        <div className="widget-content p-0">
                          <div className="widget-content-wrapper">
                            <div className="widget-content-left mx-2 mxdir-3 mb-3">
                              <img
                                width="42"
                                className="rounded-circle"
                                src={`${ASSETS_PATH}/images/user.png`}
                                alt=""
                              />
                            </div>
                            <div className="widget-content-right">
                              <div className="widget-heading">
                                {`${authUser?.name ?? ""} ${
                                  authUser?.family ?? ""
                                }`}
                              </div>
                              <div className="widget-subheading opacity-6">
                                {widgetUserTitle()}
                              </div>
                            </div>
                            <div className="widget-content-left mx-2">
                              <button
                                className="btn-pill btn-shadow btn-shine btn btn-focus mb-3"
                                onMouseUp={onLogout}
                              >
                                {strings.logout}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="scroll-area-xs" style={{ height: "100px" }}>
                    <div className="scrollbar-container ps">
                      <ul className="nav flex-column">
                        <li className="nav-item-header nav-item">
                          {strings.tools}
                        </li>
                        <li className="nav-item">
                          <CustomLink
                            className="nav-link mxdir-2"
                            onClick={onEditUser}
                          >
                            {strings.editProfile}
                          </CustomLink>
                        </li>
                        <li className="nav-item">
                          <CustomLink
                            className="nav-link mxdir-2"
                            onClick={onChanePassword}
                          >
                            {strings.changePassword}
                          </CustomLink>
                        </li>
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
                  {userState?.user?.role === USER_ROLES.USER && (
                    <>
                      <ul className="nav flex-column">
                        <li className="nav-item-divider mb-0 nav-item"></li>
                      </ul>
                      <div className="grid-menu grid-menu-2col">
                        <div className="no-gutters row">
                          <div className="col-sm-6">
                            <button className="btn-icon-vertical btn-transition btn-transition-alt pt-2 pb-2 btn btn-outline-warning">
                              <i className="pe-7s-chat icon-gradient bg-amy-crisp btn-icon-wrapper mb-2"></i>{" "}
                              {strings.messageInbox}
                            </button>
                          </div>
                          <div className="col-sm-6">
                            <button className="btn-icon-vertical btn-transition btn-transition-alt pt-2 pb-2 btn btn-outline-danger">
                              <i className="pe-7s-ticket icon-gradient bg-love-kiss btn-icon-wrapper mb-2"></i>
                              <b>{strings.supportTickets}</b>
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="widget-content-left mxdir-3 header-user-info">
              <div className="widget-heading">
                {`${authUser?.name ?? ""} ${authUser?.family ?? ""}`}
              </div>
              <div className="widget-subheading">{userTitle()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="navbar d-flex align-center">
      <div className="menu-toggle" onClick={toggleSidebar}>
        <i className="icon-category4"></i>
      </div>
      <div className="userinfo sub">
        <div className="d-flex align-center">
          <div className="img">
            <img src={`${IMAGES_PATH}/avatar-user.png`} alt="" />
          </div>
          <div className="info">
            <div className="name">{`${authUser?.name ?? ""} ${
              authUser?.family ?? ""
            }`}</div>
            <div className="userid">{`${authUser?.username ?? ""}`}</div>
          </div>
        </div>
        <div className="submenu">
          <ul>
            <li>
              <a href="https://kifpool.me/member_v2/profile">
                <i className="icon-personalcard"></i> پروفایل کاربری
              </a>
            </li>
            <li>
              <a href="https://kifpool.me/member_v2/earn-money">
                <i className="icon-money-add4"></i> کسب درآمد
              </a>
            </li>
            <li>
              <a href="https://kifpool.me/member_v2/verify/cards">
                <i className="icon-cards"></i> افزودن حساب بانکی
              </a>
            </li>
            <li>
              <a href="https://kifpool.me/member_v2/logout" className="red">
                <i className="icon-logout"></i> خروج از حساب
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
