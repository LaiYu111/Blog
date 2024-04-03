import {combineReducers} from "redux";
import nav from "./nav.js";
import toc from "./toc.js";


const componentReducers = combineReducers({
	nav,
	toc
})

export default componentReducers