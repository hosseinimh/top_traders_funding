import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { slideDown, slideUp } from "es6-slide-up-down";
import { easeOutQuint } from "es6-easings";

import {
  BASE_PATH,
  ASSETS_PATH,
  LOCALES,
  IMAGES_PATH,
  THEMES,
} from "../../../constants";
import { fetchLogoutAction } from "../../../state/user/userActions";
import utils from "../../../utils/Utils";
import CustomLink from "../Link/CustomLink";
import {
  setLocaleAction,
  setLoadingAction,
  toggleSidebarAction,
  setDropDownElementAction,
  setThemeAction,
} from "../../../state/layout/layoutActions";
import { useLocale } from "../../../hooks";
import { User } from "../../../http/entities";

const Header = () => {
  const dispatch = useDispatch();
  const { header: strings, general } = useLocale();
  const layoutState = useSelector((state) => state.layoutReducer);
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

  const onLogout = () => {
    dispatch(fetchLogoutAction());
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
              <div className="menu-header-content text-center">
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
            <span className="mx-rdir-10 opacity-8 flag large US"></span>{" "}
            {strings.us}
          </button>
          <button
            type="button"
            tabIndex="0"
            className={`dropdown-item ${flag === "IR" ? "active" : ""}`}
            onClick={() => setLocale(LOCALES.FA)}
          >
            <span className="mx-rdir-10 opacity-8 flag large IR"></span>{" "}
            {strings.fa}
          </button>
        </div>
      </div>
    );
  };

  const toggleUserMenu = (e) => {
    e.stopPropagation();
    const element = document.querySelector("#user-menu").lastChild;
    if (layoutState?.dropDownElement) {
      slideUp(layoutState.dropDownElement);
      if (layoutState?.dropDownElement === element) {
        dispatch(setDropDownElementAction(null));
        return;
      }
    }
    dispatch(setDropDownElementAction(element));
    slideDown(element, {
      duration: 400,
      easing: easeOutQuint,
    });
  };

  const toggleTheme = () => {
    if (layoutState?.theme?.name === THEMES.LIGHT) {
      dispatch(setThemeAction(THEMES.DARK));
    } else {
      dispatch(setThemeAction(THEMES.LIGHT));
    }
  };

  return (
    <div className="navbar d-flex align-center">
      <div className="menu-toggle" onClick={toggleSidebar}>
        <i className="icon-category4"></i>
      </div>
      <div className="userinfo sub dropdown-link" id="user-menu">
        <CustomLink onClick={(e) => toggleUserMenu(e)}>
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
        </CustomLink>
        <div className="submenu dropdown-list">
          <ul>
            <li>
              <Link to={`${BASE_PATH}/users/edit`}>
                <i className="icon-personalcard"></i> {strings.profile}
              </Link>
            </li>
            <li>
              <CustomLink onClick={onLogout} className="danger">
                <i className="icon-logout"></i> {strings.logout}
              </CustomLink>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-actions">
        <CustomLink onClick={toggleTheme}>
          <div
            className={`item dark-toggle ${
              layoutState?.theme?.name === THEMES.LIGHT ? "active" : ""
            }`}
          >
            <i className="icon-sun-1"></i>
          </div>
        </CustomLink>
      </div>
    </div>
  );
};

export default Header;
