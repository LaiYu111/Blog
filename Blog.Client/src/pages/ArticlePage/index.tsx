import style from "./index.module.scss"
import {FC} from "react";

// @ts-ignore
import MyEditor from "../../components/MyEditor";

interface Props {

}

const Article : FC = () => {
	return (
		<div>
			sss
		</div>
	)
}

const Review : FC = () => {
	return (
		<div>
			Reviews
		</div>
	)
}




const ArticlePage: FC<Props> = () =>{

	return (
		<div className={style.root}>
			<Article />
			<MyEditor />
			<Review />
		</div>
	)
}

export default ArticlePage