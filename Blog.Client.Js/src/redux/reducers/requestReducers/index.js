// Handling request from backend

import {combineReducers} from "redux";
import article from "./article.js";

const requestReducers = combineReducers({
  article
})

export default requestReducers