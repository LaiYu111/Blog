import {ADD_TAG, DELETE_TAGS, INIT_TAGS, SET_TAGS} from "@/redux/type.js";


const initState = [

]

const tag = (state = initState, action) =>{
  switch (action.type){
    case INIT_TAGS:
      return initState.concat(action.payload)
    case SET_TAGS:
      // eslint-disable-next-line no-case-declarations
      const updatedTags = state.map((tempTag) => {
        if (tempTag._id === action.payload.id){
          return {
            ...tempTag,
            name: action.payload.name,
            bgColor: action.payload.bgColor,
            textColor: action.payload.textColor
          }
        }
        return tempTag
      })
      return updatedTags
    case ADD_TAG:
      return state.concat([action.payload])
    case DELETE_TAGS:
      return state.filter( x => !action.payload.includes(x._id))
    default:
      return state
  }
}

export default tag