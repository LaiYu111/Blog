import {DELETE_TAGS, INIT_TAGS, SET_TAGS} from "@/redux/type.js";

export const initTags = (data) => ({
  type: INIT_TAGS,
  payload: data
})

export const setTags = (data) => ({
  type: SET_TAGS,
  payload: data
})

export const deleteTags = (id)=>({
  type: DELETE_TAGS,
  payload: id
})