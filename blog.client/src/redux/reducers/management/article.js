import {ARTICLE_PUBLICATION, DELETE_ARTICLES, INIT_ARTICLES} from "@/redux/type.js";


const initState = [

]

const article = (state = initState, action) =>{
  switch (action.type){
    case INIT_ARTICLES:
      return initState.concat(action.payload)
    case DELETE_ARTICLES:
      return  state.filter( x => !action.payload.includes(x._id))
    case ARTICLE_PUBLICATION:
      // eslint-disable-next-line no-case-declarations
      const updatedArticles = state.map( (tempArticle) =>  {
        if (tempArticle._id === action.payload){
          return {
            ...tempArticle,
            isPublished: !tempArticle.isPublished
          }
        }
        return tempArticle
      })
      return updatedArticles
    default:
      return state
  }
}

export default article