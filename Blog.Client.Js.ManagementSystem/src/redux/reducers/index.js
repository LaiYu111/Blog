import systemReducers from "./systemReducers/index.js";
import componentReducers from "./componentReducers/index.js";
import {combineReducers} from "redux";
import requestReducers from "./requestReducers/index.js";


const appReducer = combineReducers({
	systemReducers,
	componentReducers,
	requestReducers
})

export default appReducer