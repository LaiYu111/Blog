import {combineReducers} from "redux";
import editor from "./editor.js";
import modal from "./modal.js";




const componentReducers = combineReducers({
  editor,
  modal
})

export default componentReducers