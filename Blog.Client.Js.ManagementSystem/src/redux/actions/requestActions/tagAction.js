import {SET_TAG_COUNT, SET_TAGS} from "../../type.js";

export const setTags = (articles) => ({
  type: SET_TAGS,
  payload: articles
})

export const setTagCount = (count) => ({
  type: SET_TAG_COUNT,
  payload: count
})