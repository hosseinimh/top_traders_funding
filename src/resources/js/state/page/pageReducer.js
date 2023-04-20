import * as actions from "./pageActions";

const initialState = {
    page: "",
    props: {},
    params: {},
    dispatch: null,
    navigate: null,
    title: "",
    subTitle: "",
    icon: null,
    pageUtils: null,
    pageUtilsLoaded: false,
};

const pageReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.SET_PAGE_ACTION:
            return {
                ...state,
                page: payload,
            };
        case actions.SET_PROPS_ACTION:
            return { ...state, props: { ...state.props, ...payload } };
        case actions.SET_PARAMS_ACTION:
            return { ...state, params: { ...state.params, ...payload } };
        case actions.SET_DISPATCH_ACTION:
            return {
                ...state,
                dispatch: payload,
            };
        case actions.SET_NAVIGATE_ACTION:
            return {
                ...state,
                navigate: payload,
            };
        case actions.SET_TITLE_ACTION:
            return {
                ...state,
                title: payload.title,
                subTitle: payload.subTitle,
            };
        case actions.SET_ICON_ACTION:
            return {
                ...state,
                icon: payload,
            };
        case actions.SET_PAGE_UTILS_ACTION:
            return {
                ...state,
                pageUtils: payload,
            };
        case actions.SET_PAGE_UTILS_LOADED_ACTION:
            return {
                ...state,
                pageUtilsLoaded: true,
            };
        default:
            return state;
    }
};

export default pageReducer;
