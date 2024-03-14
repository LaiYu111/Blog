import {SET_NAV} from "../../type.js";



const initState = {
	hidden: false
}

const nav = (state = initState, action) =>{
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