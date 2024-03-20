import {combineReducers} from "redux";
import componentReducers from "./componentReducers";
import systemReducers from "./systemReducers";
import requestReducers from "./requestReducers/index.js";

const appReducer = combineReducers({
	requestReducers,
	componentReducers,
	systemReducers,
})

export default appReducer