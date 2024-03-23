import {SET_AUTHOR} from "../../type.js";

const initState = {
  information: {}
}

const author = (state = initState, action) =>{
  switch (action.type){
    case SET_AUTHOR:
      return {
        ...state,
        information: action.payload
      }
    default:
      return state
  }
}

export default author