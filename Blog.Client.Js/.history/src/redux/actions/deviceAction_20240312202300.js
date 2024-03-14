import {SET_DEVICE} from "../type.js";

export const setDevice = (device: string) => ({
	type: SET_DEVICE,
	payload: device
})