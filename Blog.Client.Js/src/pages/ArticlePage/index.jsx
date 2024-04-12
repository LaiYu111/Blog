import style from "./index.module.scss"
import "react-quill/dist/quill.snow.css";
import {useParams} from "react-router-dom";
import useGet from "../../hooks/useGet.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {BACKEND_URL} from "../../config.js";
import { setCurrentArticle} from "../../redux/actions/requestActions/articleAction.js";
import Panel from "../../components/Panel/index.jsx";
import PropTypes from "prop-types";
import {useIntl} from "react-intl";
import 'highlight.js/styles/googlecode.css'
import {setTOC} from "../../redux/actions/componentAction/tocAction.js";
import Tag from "../../components/Tag/index.jsx";

function Header({data}){
	const intl = useIntl()

	return (
		<div>
			<div className={`${style.title}`}>
				{data.articleTitle}
			</div>
			<div>
				{data.tags.map((value, key) => (
					<div key={key}>
						<Tag tagName={value.tagName} color={value.color} />
					</div>
				))}
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
	const toc = useRef()

	useEffect(  () => {
		async function fetchData (){
			const currentArticle = await getData(`${BACKEND_URL}/api/Article/GetArticle/${articleId}`)
			dispatch(setCurrentArticle(currentArticle))
		}
		fetchData()
	}, []);

	useEffect(()=>{
		if (toc.current){
			const titles = toc.current.querySelectorAll('h1, h2, h3, h4, h5');
			const tocContent = []
			titles.forEach((title, index) => {
				const id = `tocAnchor${index}`
				title.id = id
				tocContent.push({
					['level']: title.tagName,
					['name']: title.textContent,
					['anchorId']: id
				})
			})
			dispatch(setTOC(tocContent))
		}
	}, [currentArticle])


	return (
		<Panel>
			<div className={`${style.article}`}>
				{/* Header */}
				<Header data={currentArticle}/>
				<hr />

				{/* Content */}
				<div className={`${style.custom}`} ref={toc}>
					<div
						dangerouslySetInnerHTML={{__html: currentArticle.articleContent}}
						className={`ql-editor`}
					/>
				</div>
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