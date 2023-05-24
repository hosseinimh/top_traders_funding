import utils from "../../utils/Utils";
import * as actions from "./layoutActions";

const initialState = {
  loading: false,
  width: 0,
  height: 0,
  locale: utils.initLocale(),
  notifications: JSON.parse(utils.getLSVariable("notifications")) ?? {},
  sidebarCollapsed: false,
  dropDownElement: null,
  shownModal: null,
};

const layoutReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.SET_LOADING_ACTION:
      return {
        ...state,
        loading: payload,
      };
    case actions.SET_SIZE_ACTION:
      return {
        ...state,
        width: payload.width,
        height: payload.height,
      };
    case actions.SET_LOCALE_ACTION:
      return {
        ...state,
        locale: payload,
      };
    case actions.SET_NOTIFICATIONS_ACTION:
      return {
        ...state,
        notifications: payload,
      };
    case actions.TOGGLE_SIDEBAR_ACTION:
      return {
        ...state,
        sidebarCollapsed: !state.sidebarCollapsed,
      };
    case actions.SET_DROP_DOWN_ELEMENT_ACTION:
      return {
        ...state,
        dropDownElement: payload,
      };
    case actions.SET_SHOWN_MODAL_ACTION:
      return {
        ...state,
        shownModal: payload,
      };
    default:
      return state;
  }
};

export default layoutReducer;
