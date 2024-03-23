// Handling request from backend

import {combineReducers} from "redux";
import article from "./article.js";
import author from "./author.js";

const requestReducers = combineReducers({
  article,
  author
})

export default requestReducers