import {SET_NAVIGATION} from "@/redux/type.js";



const initState = {
  hidden: false
}

const nav = (state = initState, action) =>{
  switch (action.type){
    case SET_NAVIGATION:
      return state
    default:
      return state
  }
}

export default nav