import {combineReducers} from "redux";
import Navigation from "@/redux/reducers/navigation.js";

const appReducer = combineReducers({
  navigation: Navigation
})

export default appReducer