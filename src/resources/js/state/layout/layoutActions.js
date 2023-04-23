import utils from "../../utils/Utils";

export const SET_LOADING_ACTION = "SET_LOADING_ACTION";
export const SET_SIZE_ACTION = "SET_SIZE_ACTION";
export const SET_LOCALE_ACTION = "SET_LOCALE_ACTION";

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
