import {SET_DEVICE} from "../../type.js";

interface Action{
	type: string
	payload: string
}

const initState = {
	device: ""
}

const media = (state = initState, action: Action) =>{
	switch (action.type){
		case SET_DEVICE:
			return {
				...state,
				device: action.payload
			}
		default:
			return state
	}
}

export default media