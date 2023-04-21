import * as actions from "./layoutActions";

const initialState = {
    loading: false,
    width: 0,
    height: 0,
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
        default:
            return state;
    }
};

export default layoutReducer;
