import {INIT_USERS} from "@/redux/type.js";

export const initUsers = (data) => ({
  type: INIT_USERS,
  payload: data
})