import {formatDate} from "@/utils.js";

const initState = {
    title: "",
    description: "",
    imagePath: "",
    content: "",
    createDate: formatDate(Date.now()),
    modifyDate: "",
    tags: [
    ]
  }


const article = (state = initState, action) =>{
  switch (action.type){
    default:
      return state
  }
}

export default article