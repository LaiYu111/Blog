import {SET_LANGUAGE} from "@/redux/type.js";

export const setLanguage = (l) => ({
  type: SET_LANGUAGE,
  payload: l
})