// Handling request from backend

import {combineReducers} from "redux";
import article from "./article.js";
import tag from "./tag.js";

const requestReducers = combineReducers({
  article,
  tag
})

export default requestReducers