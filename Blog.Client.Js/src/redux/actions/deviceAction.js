import {SET_DEVICE} from "../type.js";

export const setDevice = (device) => ({
	type: SET_DEVICE,
	payload: device
})