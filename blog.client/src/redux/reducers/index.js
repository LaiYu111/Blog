import {combineReducers} from "redux";
import language from "@/redux/reducers/language.js";
import managementReducer from "@/redux/reducers/management/index.js";

const appReducer = combineReducers({
  language: language,
  management: managementReducer
})

export default appReducer