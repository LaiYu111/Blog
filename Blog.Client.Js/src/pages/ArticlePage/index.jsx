import style from "./index.module.scss"


// @ts-ignore
import MyEditor from "../../components/MyEditor/index.jsx";



const Article = () => {
	return (
		<div>
			sss
		</div>
	)
}

const Review  = () => {
	return (
		<div>
			Reviews
		</div>
	)
}




const ArticlePage= () =>{

	return (
		<div className={style.root}>
			<Article />
			<MyEditor />
			<Review />
		</div>
	)
}

export default ArticlePage