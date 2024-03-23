import style from "./index.module.scss"


// @ts-ignore
import MyEditor from "../../components/MyEditor/index.jsx";
import {useParams} from "react-router-dom";
import useGet from "../../hooks/useGet.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {BACKEND_URL} from "../../config.js";
import { setCurrentArticle} from "../../redux/actions/requestActions/articleAction.js";
import Panel from "../../components/Panel/index.jsx";
import PropTypes from "prop-types";
import Cover from "../../components/Cover/index.jsx";

function Header({title}){
	return (
		<div>
			<div className={`${style.title}`}>
				{title}
			</div>
			<div>
				xxx
			</div>
		</div>
	)
}

const Article = ({articleId}) => {
	const {getData} = useGet()
	const dispatch = useDispatch()
	const currentArticle = useSelector(state => state.requestReducers.article.currentArticle)

	useEffect(  () => {
		async function fetchData (){
			const currentArticle = await getData(`${BACKEND_URL}/api/Article/GetArticle/${articleId}`)
			dispatch(setCurrentArticle(currentArticle))
		}
		fetchData()
	}, []);
	return (
		<Panel>
			<div className={`${style.article}`}>
				{/* Header */}
				<Header title={currentArticle.articleTitle} />
				<hr />

				{/* Content */}
				<div
					dangerouslySetInnerHTML={{__html: currentArticle.articleContent}}
					className={`${style.coverImage}`}
				/>

			</div>
		</Panel>
	)
}

Header.propTypes = {
	title: PropTypes.string
}

Article.propTypes = {
	articleId : PropTypes.string,

}

const ArticlePage = () => {
	const {id: articleId} = useParams()

	return (
		<div className={style.root}>
			<Article articleId={articleId}/>
		</div>
	)
}

export default ArticlePage