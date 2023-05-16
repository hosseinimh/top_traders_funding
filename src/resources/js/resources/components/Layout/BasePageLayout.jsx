import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import persianDate from "persian-date";

import {
  BASE_PATH,
  HEADER_BUTTONS,
  MESSAGE_CODES,
  MESSAGE_TYPES,
} from "../../../constants";
import {
  setLoadingAction,
  setSizeAction,
} from "../../../state/layout/layoutActions";
import {
  clearMessageAction,
  setMessageAction,
  setRenderMessageAction,
} from "../../../state/message/messageActions";
import {
  setDispatchAction,
  setNavigateAction,
  setPageAction,
  setPagePropsAction,
  setPageUtilsAction,
  setPageTitleAction,
  clearPagePropsAction,
  setPageParamsAction,
} from "../../../state/page/pageActions";
import { clearLogoutAction } from "../../../state/user/userActions";
import utils from "../../../utils/Utils";
import { Footer, Header, Sidebar, TopLoadingBar } from "../../components";
import { useLocale } from "../../../hooks";

const BasePageLayout = ({ pageUtils, children, authPage = true, modals }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [pageLoaded, setPageLoaded] = useState(false);
  const { general } = useLocale();
  const layoutState = useSelector((state) => state.layoutReducer);
  const pageState = useSelector((state) => state.pageReducer);
  const messageState = useSelector((state) => state.messageReducer);
  const userState = useSelector((state) => state.userReducer);
  const isPersian = general.locale === "فارسی" ? true : false;

  useEffect(() => {
    if (userState?.error) {
      dispatch(setLoadingAction(false));
      dispatch(
        setMessageAction(
          userState?.error,
          MESSAGE_TYPES.ERROR,
          MESSAGE_CODES.FORM_INPUT_INVALID
        )
      );
    }
  }, [userState]);

  useEffect(() => {
    if (
      typeof pageUtils?.useForm?.formState?.errors === "object" &&
      pageUtils?.useForm?.formState?.errors
    ) {
      const hasKeys = !!Object.keys(pageUtils?.useForm?.formState?.errors)
        .length;
      if (hasKeys) {
        dispatch(
          setMessageAction(
            pageUtils?.useForm?.formState?.errors[
              Object.keys(pageUtils?.useForm?.formState?.errors)[0]
            ].message,
            MESSAGE_TYPES.ERROR,
            MESSAGE_CODES.FORM_INPUT_INVALID,
            true,
            Object.keys(pageUtils?.useForm?.formState?.errors)[0]
          )
        );
      }
    }
  }, [pageUtils?.useForm?.formState?.errors]);

  useEffect(() => {
    if (pageLoaded) {
      pageUtils.onLoad();
    }
  }, [pageLoaded]);

  useEffect(() => {
    if (params && pageState?.pageUtils && pageState?.dispatch) {
      setPageLoaded(true);
    } else {
      setPageLoaded(false);
    }
  }, [pageUtils]);

  useEffect(() => {
    if (pageState?.props?.action) {
      pageUtils.onAction(pageState?.props);
    }
  }, [pageState?.props?.action]);

  useEffect(() => {
    dispatch(setPageUtilsAction(pageUtils));
    dispatch(
      setPageTitleAction(pageUtils.strings._title, pageUtils.strings._subTitle)
    );
  }, [layoutState?.locale]);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    const user = utils.getLSUser();
    if ((authPage && !user) || (!authPage && user)) {
      dispatch(clearLogoutAction());
      navigate(`${BASE_PATH}/users/login`);

      return;
    }
    dispatch(setRenderMessageAction());
    if (messageState?.messageField || messageState?.messageRender) {
      dispatch(clearMessageAction());
    }
    dispatch(setPageAction(pageUtils.name));
    dispatch(
      setPageTitleAction(pageUtils.strings._title, pageUtils.strings._subTitle)
    );
    dispatch(setPageParamsAction(params));
    dispatch(clearPagePropsAction());
    dispatch(setNavigateAction(navigate));
    dispatch(setDispatchAction(dispatch));
    dispatch(setPageUtilsAction(pageUtils));
    onPageLayoutChanged();
    window.addEventListener("resize", () => {
      onPageLayoutChanged();
    });
    utils.initLocale();
  }, []);

  const onPageLayoutChanged = () => {
    dispatch(
      setSizeAction(document.body.clientWidth, document.body.clientHeight)
    );
    try {
      const container = document.querySelector(".app-container");

      if (document.body.clientWidth < 1250) {
        container.classList.add("closed-sidebar-mobile");
        container.classList.add("closed-sidebar");
      } else {
        container.classList.remove("closed-sidebar-mobile");
        container.classList.remove("closed-sidebar");
      }
    } catch {}
  };

  const onAppContainerClick = (e) => {
    let element = e.target;
    const headerButton = findHeaderButtonClicked(element);
    try {
      document.getElementsByClassName("slide-img-bg")[0].style.opacity = "0.4";
      document.getElementsByClassName("slider-light")[0].style.zIndex =
        "inherit";
    } catch {}
    switch (headerButton) {
      case HEADER_BUTTONS.SIDEBAR_BTN_LG:
        closeAllDropDowns();
        toggleSidebar("sidebar-btn-lg");
        return;

      case HEADER_BUTTONS.LANGUANCGE:
        closeDropDowns([HEADER_BUTTONS.USER]);
        toggleDropDown(headerButton);
        return;
      case HEADER_BUTTONS.USER:
        closeDropDowns([HEADER_BUTTONS.LANGUANCGE]);
        toggleDropDown(headerButton);
        return;
      case HEADER_BUTTONS.SIDEBAR_BTN_SM:
        closeAllDropDowns();
        toggleSidebar("sidebar-btn-sm");
        return;
      case HEADER_BUTTONS.MOBILE_DROPDOWN:
        closeDropDowns([HEADER_BUTTONS.LANGUANCGE, HEADER_BUTTONS.USER]);
        toggleDropDown(headerButton);
        return;
      default:
        closeAllDropDowns();
        return;
    }
  };

  const findHeaderButtonClicked = (element) => {
    do {
      if (element.classList?.contains("sidebar-btn-lg")) {
        return HEADER_BUTTONS.SIDEBAR_BTN_LG;
      } else if (element.classList?.contains("locale-dropdown")) {
        return HEADER_BUTTONS.LANGUANCGE;
      } else if (element.classList?.contains("user-dropdown")) {
        return HEADER_BUTTONS.USER;
      } else if (element.classList?.contains("sidebar-btn-sm")) {
        return HEADER_BUTTONS.SIDEBAR_BTN_SM;
      } else if (element.classList?.contains("mobile-dropdown")) {
        return HEADER_BUTTONS.MOBILE_DROPDOWN;
      }
      element = element.parentNode;
    } while (element);
    return null;
  };

  const toggleSidebar = (className) => {
    const element = document.querySelector(`.${className}`);
    const container = document.querySelector(".app-container");
    if (element.classList.contains("is-active")) {
      element.classList.remove("is-active");
      if (document.body.clientWidth < 1250) {
        container.classList.remove("sidebar-mobile-open");
      } else {
        container.classList.remove("closed-sidebar");
      }
    } else {
      element.classList.add("is-active");
      if (document.body.clientWidth < 1250) {
        container.classList.add("sidebar-mobile-open");
      } else {
        container.classList.add("closed-sidebar");
      }
    }
  };

  const closeDropDowns = (dropDowns) => {
    dropDowns.forEach((dropDown) => {
      let [elementName, poupName] = getDropDown(dropDown);
      if (elementName) {
        try {
          if (dropDown === HEADER_BUTTONS.MOBILE_DROPDOWN) {
            const popup = document.getElementsByClassName(poupName)[0];
            popup.classList.remove("header-mobile-open");
          } else {
            const element = document.getElementsByClassName(elementName)[0];
            const btnGroup = element.parentElement;
            const popup = document.getElementsByClassName(poupName)[0];
            btnGroup.classList.remove("show");
            popup.classList.remove("show");
            popup.removeAttribute("x-placement");
            popup.style = "";
          }
        } catch {}
      }
    });
  };

  const closeAllDropDowns = () => {
    closeDropDowns([
      HEADER_BUTTONS.LANGUANCGE,
      HEADER_BUTTONS.USER,
      HEADER_BUTTONS.MOBILE_DROPDOWN,
    ]);
  };

  const toggleDropDown = (dropDown) => {
    let [elementName, poupName] = getDropDown(dropDown);
    if (elementName) {
      if (dropDown === HEADER_BUTTONS.MOBILE_DROPDOWN) {
        const popup = document.getElementsByClassName(poupName)[0];
        if (popup.classList.contains("header-mobile-open")) {
          popup.classList.remove("header-mobile-open");
        } else {
          popup.classList.add("header-mobile-open");
        }
      } else {
        const element = document.getElementsByClassName(elementName)[0];
        const btnGroup = element.parentElement;
        const popup = document.getElementsByClassName(poupName)[0];
        if (btnGroup.classList.contains("show")) {
          btnGroup.classList.remove("show");
          element.setAttribute("aria-expanded", "false");
          popup.classList.remove("show");
          popup.removeAttribute("x-placement");
          popup.style = "";
        } else {
          btnGroup.classList.add("show");
          element.setAttribute("aria-expanded", "false");
          popup.classList.add("show");
          popup.setAttribute("x-placement", "bottom-start");
          if (document.body.clientWidth < 992) {
            popup.style =
              "position: absolute; transform: translate3d(2rem, 62px, 0px); top: 2rem; will-change: transform;";
          } else {
            popup.style =
              "position: absolute; transform: translate3d(0px, 44px, 0px); top: 0px; will-change: transform;";
          }
          try {
            document.getElementsByClassName("slide-img-bg")[0].style.opacity =
              "0.1";
            document.getElementsByClassName("slider-light")[0].style.zIndex =
              "0";
          } catch {}
        }
      }
    }
  };

  const getDropDown = (dropDown) => {
    let elementName, poupName;
    if (dropDown === HEADER_BUTTONS.LANGUANCGE) {
      elementName = "locale-dropdown";
      poupName = "locale-popup";
    } else if (dropDown === HEADER_BUTTONS.USER) {
      elementName = "user-dropdown";
      poupName = "user-popup";
    } else if (dropDown === HEADER_BUTTONS.MOBILE_DROPDOWN) {
      elementName = "mobile-dropdown";
      poupName = "app-header__content";
    }
    return [elementName, poupName];
  };

  const renderToday = () => {
    if (isPersian) {
      const date = new persianDate();
      return `${date.daysInMonth()} ${date.format("MMMM")} ${date.year()}`;
    }
  };

  return (
    <div className="dashboard d-flex">
      {userState.isAuthenticated && (
        <>
          <Sidebar />
          <div className="main">
            <div className="center">
              <Header />
              <div className="statusbar">
                <div className="todaydate d-flex align-center">
                  <div className="online-state"></div>
                  <div id="pdate">{renderToday()}</div>
                </div>
              </div>
              <div className="dashboard-content">
                <div className="content-title">
                  <h2>{pageState?.title}</h2>
                  <div className="speedbar">{pageState?.subTitle}</div>
                </div>
                {children}
              </div>
            </div>
          </div>
        </>
      )}
      {!userState.isAuthenticated && { ...children }}
    </div>
  );
};

export default BasePageLayout;
