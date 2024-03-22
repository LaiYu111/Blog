import {DELETE_ARTICLES, SET_ARTICLE_COUNT, SET_ARTICLES, SET_CURRENT_ARTICLE} from "../../type.js";


const initState = {
  articles: [],
  total:0,
  currentArticle: {}
}

const article = (state = initState, action) =>{
  switch (action.type){
    case SET_ARTICLE_COUNT:
      return {
        ...state,
        total: action.payload
      }
    case SET_ARTICLES:
      return {
        ...state,
        articles: action.payload
      }
    case SET_CURRENT_ARTICLE:
      return {
        ...state,
        currentArticle: action.payload
      }
    case DELETE_ARTICLES:
      return {
        ...state,
        articles: state.articles.filter(x => !action.payload.includes(x.articleId))
      }
    default:
      return state
  }
}

export default article