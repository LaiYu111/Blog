import {SET_NAV} from "../../type.js";

interface Action{
	type: string
	payload: boolean
}

const initState = {
	hidden: false
}

const nav = (state = initState, action: Action) =>{
	switch (action.type){
		case SET_NAV:
			return {
				...state,
				hidden: action.payload
			}
		default:
			return state
	}
}

export default nav