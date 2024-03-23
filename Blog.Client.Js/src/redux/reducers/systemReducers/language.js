
import {Languages} from "../../../util.js";
import {SET_LANGUAGE} from "../../type.js";



const initState = {
  currentLang: Languages.EN
}

const language = (state = initState, action) =>{
  switch (action.type){
    case SET_LANGUAGE:
      return {
        ...state,
        currentLang: action.payload
      }
    default:
      return state
  }
}

export default language