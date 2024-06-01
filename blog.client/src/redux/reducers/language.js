import {LANGUAGE} from "@/config.js";
import {SET_LANGUAGE} from "@/redux/type.js";

// _ 指父节点名字 -> language
const initState = {
  _ : LANGUAGE.EN
}

const language = (state = initState, action) =>{
  switch (action.type){
    case SET_LANGUAGE:
      return {
        ...state,
        _: action.payload
      }
    default:
      return state
  }
}

export default language