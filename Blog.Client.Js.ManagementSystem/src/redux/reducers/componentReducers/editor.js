import {CLEAR_EDITOR, SET_EDITOR_CONTENT, SET_EDITOR_COVER_IMAGE, SET_EDITOR_PLAINTEXT} from "../../type.js";


const initState = {
  content: '',
  plaintext: '',
  coverImage: ""
}

const editor = (state = initState, action) =>{
  switch (action.type){
    case SET_EDITOR_CONTENT:
      return {
        ...state,
        content: action.payload
      }
    case SET_EDITOR_PLAINTEXT:
      return {
        ...state,
        plaintext: action.payload
      }
    case SET_EDITOR_COVER_IMAGE:
      return {
        ...state,
        coverImage: action.payload
      }
    case CLEAR_EDITOR:
      return {
        ...state,
        plaintext: "",
        content:  "",
        coverImage: ""
      }
    default:
      return state
  }
}

export default editor