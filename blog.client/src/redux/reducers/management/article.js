import {DELETE_ARTICLES, INIT_ARTICLES} from "@/redux/type.js";


const initState = [

]

const article = (state = initState, action) =>{
  switch (action.type){
    case INIT_ARTICLES:
      return initState.concat(action.payload)
    case DELETE_ARTICLES:
      return  state.filter( x => !action.payload.includes(x._id))
    default:
      return state
  }
}

export default article