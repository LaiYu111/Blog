import {INIT_ARTICLES} from "@/redux/type.js";


const initState = [

]

const article = (state = initState, action) =>{
  switch (action.type){
    case INIT_ARTICLES:
      return initState.concat(action.payload)
    default:
      return state
  }
}

export default article