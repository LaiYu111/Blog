import {SET_TAG_COUNT, SET_TAGS} from "../../type.js";


const initState = {
  tags: [],
  total:0,
}

const tag = (state = initState, action) =>{
  switch (action.type){
    case SET_TAGS:
      return {
        ...state,
        tags: action.payload
      }
    case SET_TAG_COUNT:
      return {
        ...state,
        total: action.payload
      }
    default:
      return state
  }
}

export default tag