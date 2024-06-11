import {INIT_ARTICLES} from "@/redux/type.js";

export const initArticle = (data) => ({
  type: INIT_ARTICLES,
  payload: data
})

