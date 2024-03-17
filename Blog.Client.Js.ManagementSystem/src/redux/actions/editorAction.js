import {CLEAR_EDITOR, SET_EDITOR_CONTENT, SET_EDITOR_COVER_IMAGE, SET_EDITOR_PLAINTEXT} from "../type.js";


export function SetEditorContent(content){
  return {
    type: SET_EDITOR_CONTENT,
    payload: content
  }
}

export function SetEditorPlainText(plainText){
  return {
    type: SET_EDITOR_PLAINTEXT,
    payload: plainText
  }
}

export function ClearEditor(){
  return {
    type: CLEAR_EDITOR
  }
}

export function SetEditorCoverImage(image){
  return{
    type: SET_EDITOR_COVER_IMAGE,
    payload: image
  }
}