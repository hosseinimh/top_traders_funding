import * as actions from "./layoutActions";

const initialState = {
    loading: false,
};

const layoutReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.SET_LOADING_ACTION:
            return {
                ...state,
                loading: payload,
            };
        default:
            return state;
    }
};

export default layoutReducer;
