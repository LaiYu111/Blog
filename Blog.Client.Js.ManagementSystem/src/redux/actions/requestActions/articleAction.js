import {DELETE_ARTICLES, SET_ARTICLE_COUNT, SET_ARTICLES, SET_CURRENT_ARTICLE} from "../../type.js";


export const setArticles = (articles) => ({
  type: SET_ARTICLES,
  payload: articles
})

export const setArticleCount = (count) => ({
  type: SET_ARTICLE_COUNT,
  payload: count
})

export const setCurrentArticle = (article) => ({
  type: SET_CURRENT_ARTICLE,
  payload: article
})

export const deleteArticles = (ids) => ({
  type: DELETE_ARTICLES,
  payload: ids
})

