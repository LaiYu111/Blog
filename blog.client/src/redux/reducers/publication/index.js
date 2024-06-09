import {combineReducers} from "redux";
import article from "@/redux/reducers/publication/article.js";

const publicationReducer = combineReducers({
  article: article
})

export default publicationReducer