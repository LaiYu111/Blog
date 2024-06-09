import {combineReducers} from "redux";
import language from "@/redux/reducers/language.js";
import publicationReducer from "@/redux/reducers/publication/index.js";

const appReducer = combineReducers({
  language: language,
  publication: publicationReducer
})

export default appReducer