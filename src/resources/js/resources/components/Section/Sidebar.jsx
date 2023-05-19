import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import { slideUp, slideDown } from "es6-slide-up-down";
import { easeOutQuint } from "es6-easings";

import { BASE_PATH, IMAGES_PATH, USER_ROLES } from "../../../constants";
import { fetchLogoutAction } from "../../../state/user/userActions";
import { CustomLink } from "../";
import { useLocale } from "../../../hooks";
import utils from "../../../utils/Utils";

function Sidebar() {
  const dispatch = useDispatch();
  const { sidebar: strings, general } = useLocale();
  const layoutState = useSelector((state) => state.layoutReducer);
  const pageState = useSelector((state) => state.pageReducer);
  const userState = useSelector((state) => state.userReducer);
  const [challengesCollapsed, setChallengesCollapsed] = useState(false);
  const isPersian = general.locale === "فارسی" ? true : false;

  useEffect(() => {
    initSidebarMenus();
  }, []);

  const toggleChallenges = () => {
    const element = document.querySelector("#challenges-management").lastChild;
    if (challengesCollapsed) {
      slideUp(element);
    } else {
      slideDown(element, {
        duration: 1000,
        easing: easeOutQuint,
      });
    }
    setChallengesCollapsed(!challengesCollapsed);
  };

  const initSidebarMenus = () => {
    const links = [...document.querySelectorAll(".menu-container")];

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const parent = link.parentNode;
        closeOtherMenus(links, link);
        if (parent.classList.contains("mm-active")) {
          parent.classList.remove("mm-active");
          link.setAttribute("aria-expanded", "false");
          slideUp(link.nextElementSibling);
        } else {
          parent.classList.add("mm-active");
          link.setAttribute("aria-expanded", "true");
          slideDown(link.nextElementSibling, {
            duration: 400,
            easing: easeOutQuint,
          });
        }
      });
    });
  };

  const closeOtherMenus = (links, exceptLink) => {
    const otherLinks = links.filter((l) => l !== exceptLink);
    otherLinks.forEach((link) => {
      link.parentNode.classList.remove("mm-active");
      link.setAttribute("aria-expanded", "false");
      slideUp(link.nextElementSibling);
    });
  };

  const onLogout = () => {
    dispatch(fetchLogoutAction());
  };

  const renderMenuItem = (url, string, icon, page, badge = 0) => (
    <li className={`${pageState?.page === page ? "active" : ""}`}>
      <Link to={url}>
        <i className={icon}></i>
        <span>{string}</span>
      </Link>
    </li>
  );

  const renderSubMenuItem = (url, string, page) => (
    <li className={`${pageState?.page === page ? "active" : ""}`}>
      <Link to={url}>
        <span>{string}</span>
      </Link>
    </li>
  );

  return (
    <div className={`sidebar ${layoutState?.sidebarCollapsed ? "active" : ""}`}>
      <div className="sidebar-hd d-flex align-start just-between">
        <div className="logo">
          <img
            className="logo-larg dark-logo"
            src={`${IMAGES_PATH}/logo-large.svg`}
            alt=""
          />
          <img
            className="logo-larg light-logo"
            src={`${IMAGES_PATH}/logo-large-light.sv`}
            alt=""
          />
          <img className="logo-sm" src={`${IMAGES_PATH}/logo-sm.svg`} alt="" />
        </div>
        <div className="closemenu">
          <i className="icon-arrow-right"></i>
        </div>
      </div>
      <div className="menu scrollhide">
        <div className="menu-title">{strings.mainMenu}</div>
        <ul>
          {renderMenuItem(
            `${BASE_PATH}`,
            strings.dashboard,
            "icon-category4",
            "Dashboard"
          )}
          {userState?.user?.role === USER_ROLES.USER &&
            !userState?.user?.freeChallengeRegistered &&
            renderMenuItem(
              `${BASE_PATH}/challenges/take/free`,
              strings.takeFreeChallenge,
              "icon-money-send",
              "TakeFreeChallenge"
            )}
          {userState?.user?.role === USER_ROLES.USER &&
            renderMenuItem(
              `${BASE_PATH}/challenges`,
              strings.challenges,
              "icon-strongbox-24",
              "Challenges"
            )}
          {userState?.user?.role === USER_ROLES.ADMINISTRATOR &&
            renderMenuItem(
              `${BASE_PATH}/challenges`,
              strings.challengesAdmin,
              "icon-strongbox-24",
              "Challenges",
              layoutState?.notifications?.waitingChallengesCount
            )}
          <div className="menu-title">{strings.quickAccess}</div>
          {userState?.user?.role === USER_ROLES.USER &&
            renderMenuItem(
              `${BASE_PATH}/tickets`,
              strings.tickets,
              "icon-support",
              "Tickets"
            )}
          {renderMenuItem(
            userState?.user?.role === USER_ROLES.ADMINISTRATOR
              ? `${BASE_PATH}/app_rules/admin`
              : `${BASE_PATH}/app_rules`,
            strings.appRules,
            "icon-receipt",
            "AppRules"
          )}
          {userState?.user?.role === USER_ROLES.ADMINISTRATOR &&
            renderMenuItem(
              `${BASE_PATH}/campaigns`,
              strings.campaigns,
              "icon-receipt",
              "Campaigns"
            )}
          <li className="sub" id="challenges-management">
            <CustomLink onClick={toggleChallenges}>
              <i className="icon-strongbox-24"></i>
              <span>
                {strings.challengesManagement}{" "}
                <i className="icon-arrow-down-14"></i>
              </span>
            </CustomLink>
            <ul className="subMenu" style={{ display: "none" }}>
              {userState?.user?.role === USER_ROLES.ADMINISTRATOR &&
                renderMenuItem(
                  `${BASE_PATH}/challenge_balances`,
                  strings.challengeBalances,
                  "icon-receipt",
                  "ChallengeBalances"
                )}
              {userState?.user?.role === USER_ROLES.ADMINISTRATOR &&
                renderMenuItem(
                  `${BASE_PATH}/challenge_leverages`,
                  strings.challengeLeverages,
                  "icon-receipt",
                  "ChallengeLeverages"
                )}
              {userState?.user?.role === USER_ROLES.ADMINISTRATOR &&
                renderMenuItem(
                  `${BASE_PATH}/challenge_servers`,
                  strings.challengeServers,
                  "icon-receipt",
                  "ChallengeServers"
                )}
              {userState?.user?.role === USER_ROLES.ADMINISTRATOR &&
                renderMenuItem(
                  `${BASE_PATH}/challenge_rules`,
                  strings.challengeRules,
                  "icon-receipt",
                  "ChallengeRules"
                )}
              {userState?.user?.role === USER_ROLES.ADMINISTRATOR &&
                renderMenuItem(
                  `${BASE_PATH}/challenge_platforms`,
                  strings.challengePlatforms,
                  "icon-receipt",
                  "ChallengePlatforms"
                )}
            </ul>
          </li>
          {userState?.user?.role === USER_ROLES.ADMINISTRATOR &&
            renderMenuItem(
              `${BASE_PATH}/users`,
              strings.users,
              "icon-personalcard",
              "Users"
            )}
          <li>
            <CustomLink onClick={onLogout} className="red">
              <i className="icon-logout"></i>
              <span>{strings.logout}</span>
            </CustomLink>
          </li>
        </ul>
        <div className="menu-title">{strings.telSupport}</div>
        <ul>
          <li>
            <a href="tel:02191306781">
              <i className="icon-call"></i>
              <span className="tel">{strings.tel}</span>
            </a>
          </li>
          <li>
            <a>
              <span>{strings.supportHours}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
