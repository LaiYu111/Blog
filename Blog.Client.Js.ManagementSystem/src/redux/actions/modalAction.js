import { SET_MODAL} from "../type.js";

export function SetModal(status){
  return {
    type: SET_MODAL,
    payload: status
  }
}