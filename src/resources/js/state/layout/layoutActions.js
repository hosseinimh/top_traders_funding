export const SET_LOADING_ACTION = "SET_LOADING_ACTION";

export const setLoadingAction = (loading) => async (dispatch) => {
    dispatch({
        type: SET_LOADING_ACTION,
        payload: loading,
    });
};
