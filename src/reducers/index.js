import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import sample from "./sample";


export default combineReducers({
    sample,
    routing: routerReducer
});
