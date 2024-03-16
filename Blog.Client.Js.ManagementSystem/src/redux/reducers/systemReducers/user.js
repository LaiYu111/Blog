import {SET_CURRENT_USER, USER_LOGOUT} from "../../type.js";

const initState = {
  token: ""
}

const user = (state = initState, action) =>{
  switch (action.type){
    case SET_CURRENT_USER:
      return {
        ...state,
        token: action.payload
      }
    case USER_LOGOUT:
      return {
        ...state,
        token: ""
      }
    default:
      return state
  }
}

export default user