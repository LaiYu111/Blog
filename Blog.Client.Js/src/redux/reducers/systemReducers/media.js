import {SET_DEVICE} from "../../type.js";



const initState = {
	device: ""
}

const media = (state = initState, action) =>{
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