export const SET_LOADING_ACTION = "SET_LOADING_ACTION";
export const SET_SIZE_ACTION = "SET_SIZE_ACTION";

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
