import {SET_NAV} from "../type.js";

export const setNav = ( data:boolean ) => ({
	type: SET_NAV,
	payload: data
})