import userReducer from "@redux/reducer/userReducer.js";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    user: userReducer,
});

export default  rootReducer;