import {SET_PAGE_INDEX, SET_PAGE_SIZE} from "../../type.js";


const initState = {
  pageSize: 5,
  pageIndex: 1,
}

const pagination = (state = initState, action) =>{
  switch (action.type){
    case SET_PAGE_INDEX:
      return {
        ...state,
        pageIndex: action.payload
      }
    case SET_PAGE_SIZE:
      return {
        ...state,
        pageSize: action.payload
      }
    default:
      return state
  }
}

export default pagination