import {LANGUAGE} from "@/config.js";

// _ 指父节点名字 -> language
const initState = {
  _ : LANGUAGE.EN
}

const language = (state = initState, action) =>{
  switch (action.type){
    default:
      return state
  }
}

export default language