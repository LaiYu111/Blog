import {SET_POPUP} from "../type.ts";

export const setPopup = ( data:boolean ) => ({
	type: SET_POPUP,
	payload: data
})