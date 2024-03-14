import {combineReducers} from "redux";
import nav from "./nav.ts";
import popup from "./popup.ts";


const componentReducers = combineReducers({
	nav,
	popup
})

export default componentReducers