import { themes } from "../../constants";
import utils from "../../utils/Utils";

export const SET_LOADING_ACTION = "SET_LOADING_ACTION";
export const SET_SIZE_ACTION = "SET_SIZE_ACTION";
export const SET_LOCALE_ACTION = "SET_LOCALE_ACTION";
export const SET_THEME_ACTION = "SET_THEME_ACTION";
export const SET_NOTIFICATIONS_ACTION = "SET_NOTIFICATIONS_ACTION";
export const TOGGLE_SIDEBAR_ACTION = "TOGGLE_SIDEBAR_ACTION";
export const SET_DROP_DOWN_ELEMENT_ACTION = "SET_DROP_DOWN_ELEMENT_ACTION";
export const SET_SHOWN_MODAL_ACTION = "SET_SHOWN_MODAL_ACTION";

export const setLoadingAction = (loading) => async (dispatch) => {
  dispatch({
    type: SET_LOADING_ACTION,
    payload: loading,
  });
};

export const setSizeAction = (width, height) => async (dispatch) => {
  dispatch({
    type: SET_SIZE_ACTION,
    payload: { width, height },
  });
};

export const setLocaleAction = (locale) => async (dispatch) => {
  utils.setLSVariable("locale", locale);
  dispatch({
    type: SET_LOCALE_ACTION,
    payload: locale,
  });
};

export const setThemeAction = (theme) => async (dispatch) => {
  let t = themes.find((tm) => tm.name === theme);
  if (!t) {
    return;
  }
  utils.setLSVariable("theme", theme);
  document.documentElement.style.setProperty("--text", t.colors.text);
  document.documentElement.style.setProperty("--light", t.colors.light);
  document.documentElement.style.setProperty("--dark", t.colors.dark);
  document.documentElement.style.setProperty("--body", t.colors.body);
  document.documentElement.style.setProperty(
    "--light-body",
    t.colors.lightBody
  );
  document.documentElement.style.setProperty("--link", t.colors.link);
  document.documentElement.style.setProperty("--success", t.colors.success);
  document.documentElement.style.setProperty("--danger", t.colors.danger);
  document.documentElement.style.setProperty("--primary", t.colors.primary);
  document.documentElement.style.setProperty(
    "--primary-light",
    t.colors.primaryLight
  );
  document.documentElement.style.setProperty("--warning", t.colors.warning);
  document.documentElement.style.setProperty(
    "--dark-warning",
    t.colors.darkWarning
  );
  document.documentElement.style.setProperty(
    "--placeholder",
    t.colors.placeholder
  );
  document.documentElement.style.setProperty("--border", t.colors.border);
  document.documentElement.style.setProperty(
    "--border-error",
    t.colors.borderError
  );
  document.documentElement.style.setProperty(
    "--border-error-light",
    t.colors.borderErrorLight
  );
  document.documentElement.style.setProperty("--hover", t.colors.hover);
  document.documentElement.style.setProperty(
    "--box-shadow",
    t.colors.boxShadow
  );
  document.documentElement.style.setProperty(
    "--gradient-bg",
    t.colors.gradientBg
  );
  document.documentElement.style.setProperty("--table-btn", t.colors.tableBtn);
  document.documentElement.style.setProperty(
    "--table-row-odd",
    t.colors.tableRowOdd
  );
  document.documentElement.style.setProperty(
    "--table-row-odd-hover",
    t.colors.tableRowOddHover
  );
  document.documentElement.style.setProperty(
    "--table-row-even",
    t.colors.tableRowEven
  );
  document.documentElement.style.setProperty(
    "--table-row-even-hover",
    t.colors.tableRowEvenHover
  );
  document.documentElement.style.setProperty(
    "--alert-sucess-background",
    t.colors.alertSucessBackground
  );
  document.documentElement.style.setProperty(
    "--alert-success-border",
    t.colors.alertSuccessBorder
  );
  document.documentElement.style.setProperty(
    "--alert-success-color",
    t.colors.alertSuccessColor
  );
  document.documentElement.style.setProperty(
    "--alert-danger-background",
    t.colors.alertDangerBackground
  );
  document.documentElement.style.setProperty(
    "--alert-danger-border",
    t.colors.alertDangerBorder
  );
  document.documentElement.style.setProperty(
    "--alert-danger-color",
    t.colors.alertDangerColor
  );
  dispatch({
    type: SET_THEME_ACTION,
    payload: t,
  });
};

export const setNotificationsAction = (notifications) => async (dispatch) => {
  utils.setLSVariable("notifications", JSON.stringify(notifications));
  dispatch({
    type: SET_NOTIFICATIONS_ACTION,
    payload: notifications,
  });
};

export const toggleSidebarAction = () => async (dispatch) => {
  dispatch({
    type: TOGGLE_SIDEBAR_ACTION,
  });
};

export const setDropDownElementAction = (element) => async (dispatch) => {
  dispatch({
    type: SET_DROP_DOWN_ELEMENT_ACTION,
    payload: element,
  });
};

export const setShownModalAction = (modal) => async (dispatch) => {
  dispatch({
    type: SET_SHOWN_MODAL_ACTION,
    payload: modal,
  });
};
