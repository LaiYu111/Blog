import {ARTICLE_PUBLICATION, DELETE_ARTICLES, INIT_ARTICLES} from "@/redux/type.js";

export const initArticle = (data) => ({
  type: INIT_ARTICLES,
  payload: data
})

export const deleteArticle = (id) => ({
  type: DELETE_ARTICLES,
  payload: id
})

export const setArticlePublication = (id) => ({
  type: ARTICLE_PUBLICATION,
  payload: id
})