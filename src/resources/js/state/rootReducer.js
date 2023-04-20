import { combineReducers } from "redux";

import userReducer from "./user/userReducer";
import layoutReducer from "./layout/layoutReducer";
import messageReducer from "./message/messageReducer";
import pageReducer from "./page/pageReducer";

export default combineReducers({
    userReducer,
    layoutReducer,
    messageReducer,
    pageReducer,
});
