import {SET_POPUP} from "../../type.ts";

interface Action{
	type: string
	payload: boolean
}

const initState = {
	hidden: false
}

const popup = (state = initState, action: Action) =>{
	switch (action.type){
		case SET_POPUP:
			return {
				...state,
				hidden: action.payload
			}
		default:
			return state
	}
}

export default popup