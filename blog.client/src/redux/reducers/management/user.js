import {INIT_USERS} from "@/redux/type.js";

const initState = []

const user = (state = initState, action) =>{
  switch (action.type){
    case INIT_USERS:
      return initState.concat(action.payload)
    default:
      return state
  }
}

export default user