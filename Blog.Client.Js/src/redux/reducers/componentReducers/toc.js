// toc level: toc title
// [{
//  "level": "H1"
//  "name": "Header 1"
//  "anchor": ""
// }]
import {SET_TOC} from "../../type.js";

const initState = {
  tableOfContent: []
}

const toc = (state = initState, action) =>{
  switch (action.type){
    case SET_TOC:
      return {
        ...state,
        tableOfContent: action.payload
      }
    default:
      return state
  }
}

export default toc