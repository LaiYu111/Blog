import {SET_DEVICE} from "../type.ts";

export const setDevice = (device: string) => ({
	type: SET_DEVICE,
	payload: device
})