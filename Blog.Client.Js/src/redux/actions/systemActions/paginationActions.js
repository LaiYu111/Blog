import {DELETE_ARTICLES, SET_PAGE_INDEX, SET_PAGE_SIZE} from "../../type.js";

export const setPageIndex = (index) => ({
  type: SET_PAGE_INDEX,
  payload: index
})

export const setPageSize = (size) => ({
  type: SET_PAGE_SIZE,
  payload: size
})
