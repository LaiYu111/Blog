import {SET_NAV} from "../type.ts";

export const setNav = ( data:boolean ) => ({
	type: SET_NAV,
	payload: data
})