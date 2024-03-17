import systemReducers from "./systemReducers/index.js";
import componentReducers from "./componentReducers/index.js";
import {combineReducers} from "redux";


const appReducer = combineReducers({
	systemReducers,
	componentReducers
})

export default appReducer