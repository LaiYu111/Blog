import {ADD_TAG, DELETE_TAGS, SET_TAG_COUNT, SET_TAGS, UPDATE_TAG} from "../../type.js";


const initState = {
  tags: [],
  total:0,
}

const tag = (state = initState, action) =>{
  switch (action.type){
    case SET_TAGS:
      return {
        ...state,
        tags: action.payload
      }
    case SET_TAG_COUNT:
      return {
        ...state,
        total: action.payload
      }
    case UPDATE_TAG:
      // eslint-disable-next-line no-case-declarations
      const updatedTags = state.tags.map((tempTag) => {
        if (tempTag.id === action.payload.id) {
          return {
            ...tempTag,
            tagName: action.payload.tagName,
            color: action.payload.color
          };
        }
        return tempTag;
      });

      return {
        ...state,
        tags: updatedTags
      };
    case ADD_TAG:
      return {
        ...state,
        tags: [...state.tags, ...action.payload]
      }
    case DELETE_TAGS:
      return {
        ...state,
        tags: state.tags.filter( x => !action.payload.includes(x.id))
      }
    default:
      return state
  }
}

export default tag