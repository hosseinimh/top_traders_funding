import utils from "../../utils/Utils";

export const SET_LOADING_ACTION = "SET_LOADING_ACTION";
export const SET_SIZE_ACTION = "SET_SIZE_ACTION";
export const SET_LOCALE_ACTION = "SET_LOCALE_ACTION";
export const SET_NOTIFICATIONS_ACTION = "SET_NOTIFICATIONS_ACTION";
export const TOGGLE_SIDEBAR_ACTION = "TOGGLE_SIDEBAR_ACTION";

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
