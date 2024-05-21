import {combineReducers} from "redux";
import Navigation from "@/redux/reducers/navigation.js";
import language from "@/redux/reducers/language.js";

const appReducer = combineReducers({
  language: language
})

export default appReducer