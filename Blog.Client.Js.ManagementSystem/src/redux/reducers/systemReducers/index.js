import {combineReducers} from "redux";
import user from "./user.js";
import pagination from "./pagination.js";



const systemReducers = combineReducers({
  user,
  pagination,
})

export default systemReducers