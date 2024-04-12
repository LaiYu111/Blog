import {ADD_TAG, DELETE_TAGS, SET_TAG_COUNT, SET_TAGS, UPDATE_TAG} from "../../type.js";

export const setTags = (tag) => ({
  type: SET_TAGS,
  payload: tag
})

export const setTagCount = (count) => ({
  type: SET_TAG_COUNT,
  payload: count
})

export const updateTag = (tag) => ({
  type: UPDATE_TAG,
  payload: tag
})

export const addTag = (tag) => ({
  type: ADD_TAG,
  payload: tag
})

export const deleteTag = (ids) => ({
  type: DELETE_TAGS,
  payload: ids
})