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
import {useIntl} from "react-intl";

function Header({data}){
	const intl = useIntl()

	return (
		<div>
			<div className={`${style.title}`}>
				{data.articleTitle}
			</div>
			<div className={style.caption}>
				{intl.formatMessage({id:'common.lastEdited'})}: {data.articleUpdateTime}
			</div>
		</div>
	)
}

Header.propTypes = {
	data : PropTypes.object
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
				<Header data={currentArticle}/>
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