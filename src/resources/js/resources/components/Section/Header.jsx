import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { slideDown, slideUp } from "es6-slide-up-down";
import { easeOutQuint } from "es6-easings";

import { BASE_PATH, LOCALES, IMAGES_PATH, THEMES } from "../../../constants";
import { fetchLogoutAction } from "../../../state/user/userActions";
import utils from "../../../utils/Utils";
import CustomLink from "../Link/CustomLink";
import {
  setLocaleAction,
  setLoadingAction,
  toggleSidebarAction,
  setDropDownElementAction,
  setThemeAction,
  setNotificationsAction,
  setShownModalAction,
} from "../../../state/layout/layoutActions";
import { useLocale } from "../../../hooks";
import { User, Notification } from "../../../http/entities";
import { default as notificationUtils } from "../../../utils/Notification";
import ProfileModal from "../Modal/ProfileModal";

const Header = () => {
  const layoutState = useSelector((state) => state.layoutReducer);
  const userState = useSelector((state) => state.userReducer);
  const [notifications, setNotifications] = useState(false);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);
  const [loadingNotifications, setLoadingNotifications] = useState(false);
  const dispatch = useDispatch();
  const { header: strings, date, general } = useLocale();
  const notification = new Notification();

  useEffect(() => {
    let countUnSeenUserNotifications =
      layoutState?.notifications?.userNotifications?.filter(
        (item) => !item.seenAt
      ).length;
    let countUnSeenSystemNotifications =
      layoutState?.notifications?.systemNotifications?.filter(
        (item) => !item.seenAt
      ).length;
    setHasNewNotifications(
      countUnSeenUserNotifications + countUnSeenSystemNotifications > 0
        ? true
        : false
    );
    const userNotifications =
      layoutState?.notifications?.userNotifications?.map((item) => {
        let timespan = "";
        let relativeDate = utils.relativeDate(item.createdAt);
        if (relativeDate.amount === 0) {
          timespan = date.now;
        } else {
          timespan = `${relativeDate.amount} ${date[relativeDate.format]}${
            relativeDate.amount > 1 ? date.plural : ""
          } ${relativeDate.isBefore ? date.ago : date.ahead}`;
        }
        item.timespan = timespan;
        return item;
      });
    const systemNotifications =
      layoutState?.notifications?.systemNotifications?.map((item) => {
        let timespan = "";
        let relativeDate = utils.relativeDate(item.createdAt);
        if (relativeDate.amount === 0) {
          timespan = date.now;
        } else {
          timespan = `${relativeDate.amount} ${date[relativeDate.format]}${
            relativeDate.amount > 1 ? date.plural : ""
          } ${relativeDate.isBefore ? date.ago : date.ahead}`;
        }
        item.timespan = timespan;
        return item;
      });
    setNotifications({ userNotifications, systemNotifications });
  }, [layoutState?.notifications]);

  useEffect(() => {
    if (loadingNotifications === false && userState?.user) {
      setTimeout(async () => {
        await getNotifications();
      }, 10000);
    }
  }, [loadingNotifications]);

  useEffect(() => {
    return () => {
      setLoadingNotifications(true);
    };
  }, []);

  const getNotifications = async () => {
    if (loadingNotifications) {
      return;
    }
    try {
      setLoadingNotifications(true);
      const result = await notification.getReview();
      if (result) {
        dispatch(
          setNotificationsAction({
            userNotifications: result.userNotifications,
            systemNotifications: result.systemNotifications,
          })
        );
      }
    } catch {}
    setLoadingNotifications(false);
  };

  const toggleSidebar = () => {
    dispatch(toggleSidebarAction());
  };

  const setLocale = (locale) => handleSetLocale(locale);

  const handleSetLocale = async (locale) => {
    const prevLocale = utils.getLSVariable("locale");
    slideUp(layoutState.dropDownElement);
    const element = document.querySelector("#locales-menu").lastChild;
    if (layoutState?.dropDownElement === element) {
      dispatch(setDropDownElementAction(null));
    }
    if (prevLocale === locale) {
      return;
    }
    dispatch(setLoadingAction(true));
    dispatch(setLocaleAction(locale));
    const user = new User();
    await user.setLocale(locale);
    window.location.href = `${window.location.href}?_locale=${locale}`;
  };

  const onLogout = () => {
    dispatch(fetchLogoutAction());
  };

  const showProfileModal = (e) => {
    e.stopPropagation();
    dispatch(setShownModalAction("profileModal"));
  };

  const hideNotificationTexts = (e) => {
    document.querySelectorAll(".notification-text.show").forEach((item) => {
      if (e.target.lastChild !== item) {
        item.classList.remove("show");
        slideUp(item);
      }
    });
  };

  const onChangeTabContent = (e) => {
    e.stopPropagation();
    const dataTabContent = e.target.getAttribute("data-tab-content");
    [...document.querySelectorAll(".checked-item.tab-item.dropdown-item")].map(
      (btn) => {
        if (e.target === btn) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      }
    );
    [...document.querySelectorAll(".tab-content")].map((tabContent) => {
      if (tabContent.classList.contains(dataTabContent)) {
        tabContent.classList.add("active");
      } else {
        tabContent.classList.remove("active");
      }
    });
  };

  const onNotificationClick = (e) => {
    e.stopPropagation();
    hideNotificationTexts(e);
    const element = e.target.lastChild;
    if (element.classList.contains("show")) {
      slideUp(element);
    } else {
      const id = parseInt(e.target.className.substring(23));
      const item = layoutState?.notifications?.userNotifications?.find(
        (notification) => notification.id === id
      );
      if (item) {
        const seen = item.seenAt ? true : false;
        item.seenAt = seen ? item.seenAt : Date.now();
        dispatch(
          setNotificationsAction({
            userNotifications: layoutState.notifications.userNotifications,
          })
        );
        if (!seen) {
          notification.seen(item.id);
        }
      }
      slideDown(element, {
        duration: 400,
        easing: easeOutQuint,
      });
    }
    element.classList.toggle("show");
  };

  const onSeenReview = () => {
    if (!hasNewNotifications) {
      return;
    }
    const userNotifications =
      layoutState?.notifications?.userNotifications?.map((notification) => ({
        ...notification,
        seenAt: Date.now(),
      }));
    const systemNotifications =
      layoutState?.notifications?.systemNotifications?.map((notification) => ({
        ...notification,
        seenAt: Date.now(),
      }));
    dispatch(
      setNotificationsAction({
        userNotifications,
        systemNotifications,
      })
    );
    notification.seenReview();
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

  const toggleNotificationsDropdown = (e) => {
    e.stopPropagation();
    const element = document.querySelector("#notifications-menu").lastChild;
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

  const toggleLocalesDropdown = (e) => {
    e.stopPropagation();
    const element = document.querySelector("#locales-menu").lastChild;
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

  const toggleColorsDropdown = (e) => {
    e.stopPropagation();
    const element = document.querySelector("#colors-menu").lastChild;
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

  const renderUserDropdown = () => (
    <div className="userinfo sub dropdown-link" id="user-menu">
      <div className="d-flex align-center" onClick={(e) => toggleUserMenu(e)}>
        <div className="img">
          <img
            src={
              userState?.user?.avatar
                ? `${userState?.user?.avatar}`
                : `${IMAGES_PATH}/avatar-user.png`
            }
            alt=""
          />
        </div>
        <div className="info">
          <div className="name">{`${userState?.user?.name ?? ""} ${
            userState?.user?.family ?? ""
          }`}</div>
          <div className="userid">{`${userState?.user?.username ?? ""}`}</div>
        </div>
      </div>
      <div className="submenu dropdown-list">
        <ul>
          <li>
            <CustomLink onClick={(e) => showProfileModal(e)}>
              <i className="icon-personalcard"></i>
              <span className="mx-10">{strings.profile}</span>
            </CustomLink>
          </li>
          <li>
            <CustomLink onClick={onLogout} className="danger">
              <i className="icon-logout"></i>
              <span className="mx-10">{strings.logout}</span>
            </CustomLink>
          </li>
        </ul>
      </div>
    </div>
  );

  const renderNotifications = (notifications, dataTabContent) => (
    <div
      className={`tab-content ${dataTabContent} ${
        dataTabContent === "user-notifications" ? "active" : ""
      }`}
    >
      <div className="notification-list scrollhide">
        {notifications?.map((item) => {
          return (
            <div
              className={`notification-item item-${item.id}`}
              key={item.id}
              onClick={(e) => onNotificationClick(e)}
            >
              <div className="notification-item-hd d-flex align-center">
                <div className={`icon ${item.seenAt ? "seen" : ""}`}>
                  <i className="icon-notification-bing"></i>
                </div>
                <div className="info">
                  <div className="date">{item.timespan}</div>
                  <h3>{item.subCategoryTitle}</h3>
                </div>
              </div>
              <div className="notification-text">
                <div>
                  {notificationUtils.getSubCategoryText(item, general.locale)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderNotificationsDropdown = () => (
    <div
      className="item sub dropdown-link d-flex align-center"
      id="notifications-menu"
      onClick={(e) => toggleNotificationsDropdown(e)}
    >
      {hasNewNotifications && <div className="dot-icon bg-success"></div>}
      <i className="icon-notification-bing"></i>
      <span>{strings.notifications}</span>
      <div className="sub-box tab-container submenu submenu-mid">
        <div>
          <div className="checked-list scrollhide d-flex">
            <div
              className="checked-item tab-item dropdown-item active"
              data-tab-content="user-notifications"
              onClick={(e) => onChangeTabContent(e)}
            >
              {strings.userNotifications}
            </div>
            <div
              className="checked-item tab-item dropdown-item"
              data-tab-content="system-notifications"
              onClick={(e) => onChangeTabContent(e)}
            >
              {strings.systemNotifications}
            </div>
          </div>
          {renderNotifications(
            notifications?.userNotifications,
            "user-notifications"
          )}
          {renderNotifications(
            notifications?.systemNotifications,
            "system-notifications"
          )}
        </div>
        <div className="notification-btns">
          <button className="btn btn-border" onClick={() => onSeenReview()}>
            {strings.seenReviewNotifications}
          </button>
          <Link to={`${BASE_PATH}/notifications`} className="btn btn-primary">
            {strings.showNotifications}
          </Link>
        </div>
      </div>
    </div>
  );

  const renderLocalesDropdown = () => {
    let flag;
    let locale = utils.getLSVariable("locale");
    switch (locale) {
      case "fa-IR":
        flag = "IR";
        break;
      case "en-US":
        flag = "US";
        break;
      default:
        flag = "IR";
        break;
    }
    return (
      <div className="item sub dropdown-link" id="locales-menu">
        <div
          className="d-flex align-center"
          onClick={(e) => toggleLocalesDropdown(e)}
        >
          <div className="img">
            <img src={`${IMAGES_PATH}/${flag}.svg`} alt="" />
          </div>
        </div>
        <div className="submenu submenu-mid dropdown-list locales-menu">
          <ul>
            <li>
              <CustomLink onClick={() => setLocale(LOCALES.FA)}>
                <img src={`${IMAGES_PATH}/IR.svg`} alt="" />
                {strings.fa}
              </CustomLink>
            </li>
            <li>
              <CustomLink onClick={() => setLocale(LOCALES.EN)}>
                <img src={`${IMAGES_PATH}/US.svg`} alt="" />
                {strings.us}
              </CustomLink>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  const renderToggleTheme = () => (
    <div
      className={`item dark-toggle ${
        layoutState?.theme?.name === THEMES.LIGHT ? "active" : ""
      }`}
      onClick={toggleTheme}
    >
      <i className="icon-sun-1"></i>
    </div>
  );

  const renderColorsDropdown = () => (
    <div className="item sub dropdown-link" id="colors-menu">
      <div
        className="color-btn d-flex align-center"
        onClick={(e) => toggleColorsDropdown(e)}
      >
        <img src={`${IMAGES_PATH}/color.svg`} alt="" />
      </div>
      <div
        className="submenu submenu-end dropdown-list colors-list"
        id="colors"
      >
        <ul className="d-flex">
          <li>
            <div className="color purple-btn"></div>
          </li>
          <li>
            <div className="color green-btn"></div>
          </li>
        </ul>
      </div>
    </div>
  );

  const toggleTheme = () => {
    if (layoutState?.theme?.name === THEMES.LIGHT) {
      dispatch(setThemeAction(THEMES.DARK));
    } else {
      dispatch(setThemeAction(THEMES.LIGHT));
    }
  };

  return (
    <div className="navbar d-flex align-center">
      {userState?.user && (
        <>
          <div className="menu-toggle" onClick={toggleSidebar}>
            <i className="icon-category4"></i>
          </div>
          {renderUserDropdown()}
        </>
      )}
      <div className="navbar-actions">
        {userState?.user && (
          <>
            <ProfileModal />
            {renderNotificationsDropdown()}
          </>
        )}
        {renderLocalesDropdown()}
        {renderToggleTheme()}
        {renderColorsDropdown()}
      </div>
    </div>
  );
};

export default Header;
