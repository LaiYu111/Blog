import {combineReducers} from "redux";

import article from "@/redux/reducers/management/article.js";
import tag from "@/redux/reducers/management/tag.js";

const managementReducer = combineReducers({
  tags: tag,
  articles:article
})

export default managementReducer