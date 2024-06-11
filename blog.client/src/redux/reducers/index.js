import {combineReducers} from "redux";
import language from "@/redux/reducers/language.js";
import publicationReducer from "@/redux/reducers/publication/index.js";
import managementReducer from "@/redux/reducers/management/index.js";

const appReducer = combineReducers({
  language: language,
  publication: publicationReducer,
  management: managementReducer
})

export default appReducer