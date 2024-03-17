import {SET_MODAL} from "../../type.js";


const initState = {
  onOpen: false

}

const modal = (state = initState, action) =>{
  switch (action.type){
    case SET_MODAL:
      return {
        ...state,
        onOpen: action.payload
      }
    default:
      return state
  }
}

export default modal

