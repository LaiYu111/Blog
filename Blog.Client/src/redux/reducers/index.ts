import {combineReducers} from "redux";
import componentReducers from "./componentReducers";
import systemReducers from "./systemReducers";

const appReducer = combineReducers({
	 componentReducers,
	 systemReducers
})

export default appReducer