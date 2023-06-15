import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import persianDate from "persian-date";
import { slideUp } from "es6-slide-up-down";

import { BASE_PATH, MESSAGE_CODES, MESSAGE_TYPES } from "../../../constants";
import {
  setDropDownElementAction,
  setLoadingAction,
  setShownModalAction,
  setSizeAction,
  setThemeAction,
  toggleSidebarAction,
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
  setPageUtilsAction,
  setPageTitleAction,
  clearPagePropsAction,
  setPageParamsAction,
} from "../../../state/page/pageActions";
import { clearLogoutAction } from "../../../state/user/userActions";
import utils from "../../../utils/Utils";
import { Footer, Header, Sidebar } from "../../components";
import { useLocale } from "../../../hooks";

const BasePageLayout = ({ pageUtils, children, authPage = true }) => {
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
    dispatch(setDropDownElementAction(null));
    dispatch(setShownModalAction(null));
    onPageLayoutChanged();
    window.addEventListener("resize", () => {
      onPageLayoutChanged();
    });
    utils.initLocale();
    utils.initTheme();
    dispatch(setThemeAction(utils.getLSVariable("theme")));
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
    onToggleDropDowns(e);
    onToggleSidebar(e);
    onToggleModal(e);
  };

  const onToggleDropDowns = (e) => {
    let element = e.target;
    let clickedOnDropDown = false;
    while (element.parentNode) {
      if (element.classList.contains("dropdown-list")) {
        clickedOnDropDown = true;
        break;
      }
      element = element.parentNode;
    }
    if (!clickedOnDropDown) {
      layoutState?.dropDownElement && slideUp(layoutState.dropDownElement);
      dispatch(setDropDownElementAction(null));
    }
  };

  const onToggleSidebar = (e) => {
    let sidebar = document.querySelector(".sidebar");
    if (
      document.body.clientWidth > 1024 ||
      !sidebar.classList.contains("active")
    ) {
      return;
    }
    let element = e.target;
    let clickedSidebar = false;
    while (element.parentNode) {
      if (element.classList.contains("sidebar")) {
        clickedSidebar = true;
        break;
      }
      element = element.parentNode;
    }
    if (!clickedSidebar) {
      dispatch(toggleSidebarAction());
    }
  };

  const onToggleModal = (e) => {
    let element = e.target;
    let clickedOnModal = false;
    while (element.parentNode) {
      if (element.classList.contains("modal")) {
        clickedOnModal = true;
        break;
      }
      element = element.parentNode;
    }
    if (!clickedOnModal) {
      dispatch(setShownModalAction(null));
    }
  };

  const renderToday = () => {
    if (isPersian) {
      const date = new persianDate();
      return `${date.date()} ${date.format("MMMM")} ${date.year()}`;
    } else {
      const date = new Date();
      const month = date.toLocaleString("default", { month: "short" });
      return `${date.getDate()} ${month} ${date.getFullYear()}`;
    }
  };

  if (userState.isAuthenticated) {
    return (
      <div onClick={(e) => onAppContainerClick(e)}>
        <div className="dashboard d-flex">
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
                  <div className="subtitle">{pageState?.subTitle}</div>
                </div>
                {children}
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return { ...children };
};

export default BasePageLayout;
