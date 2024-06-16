import {combineReducers} from "redux";

import article from "@/redux/reducers/management/article.js";
import tag from "@/redux/reducers/management/tag.js";
import user from "@/redux/reducers/management/user.js";

const managementReducer = combineReducers({
  tags: tag,
  articles:article,
  users: user
})

export default managementReducer