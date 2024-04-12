// Handling request from backend

import {combineReducers} from "redux";
import article from "./article.js";
import author from "./author.js";
import tag from "./tag.js";

const requestReducers = combineReducers({
  article,
  author,
  tag
})

export default requestReducers