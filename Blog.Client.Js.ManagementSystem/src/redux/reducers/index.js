import {combineReducers} from "redux";
import systemReducers from "./systemReducers/index.js";


const appReducer = combineReducers({
	systemReducers
})

export default appReducer