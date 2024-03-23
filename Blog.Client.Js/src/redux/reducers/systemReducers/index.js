import {combineReducers} from "redux";
import media from "./media.js";
import pagination from "./pagination.js";
import language from "./language.js";


const systemReducers = combineReducers({
	media,
	pagination,
	language
})

export default systemReducers