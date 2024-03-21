import Panel from "../../components/Panel";
import image from '../../assets/aaa.jpg'
import {Card, IconButton, Skeleton} from "@mui/material";
import Cover from "../../components/Cover/index.jsx";
import useGet from "../../hooks/useGet.js";
import {useEffect, useState} from "react";
import {BACKEND_URL} from "../../config.js";
import {useDispatch, useSelector} from "react-redux";
import {setArticleCount, setArticles} from "../../redux/actions/requestActions/articleAction.js";
import {useNavigate, useParams} from "react-router-dom";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
function HomePage () {
	const { getData } = useGet()
	const { page } = useParams()
	const dispatch = useDispatch()
	const articles = useSelector(state => state.requestReducers.article.articles)
	const totalArticles = useSelector(state => state.requestReducers.article.total)
	const navigator = useNavigate()
	const [disabledNext, setDisabledNext] = useState(false)
	const [disabledPrev, setDisabledPrev] = useState(false)

	useEffect(  () => {
		let pageSize = 2

		if ( Math.ceil(totalArticles/pageSize) === Number(page)){
			setDisabledNext(true)
		}else{
			setDisabledNext(false)
		}

		if ( Number(page) === 1){
			setDisabledPrev(true)
		}else{
			setDisabledPrev(false)
		}

		async function fetchData (){
			const count = await getData(`${BACKEND_URL}/api/Article/CountArticles`)
			dispatch(setArticleCount(count))
			const articles = await getData(`${BACKEND_URL}/api/Article/GetArticles/${pageSize}/${page}`)
			dispatch(setArticles(articles))
		}
		fetchData()

	}, [page]);

	const handleNextPage = () => {
		navigator(`/${Number(page) + 1}`)
	}
	const handlePreviousPage = () => {
		navigator(`/${Number(page) - 1 }`)
	}

	return (
		<div>
			<div style={{ display: "grid", width: "100%", gridTemplateColumns:"70% 29% "}}>
				<div>
					<Card img={image } title={'1'} caption={'1'} />
				</div>
				<div style={{ display: "grid", width: "100%", gridGap:"10px", gridTemplateRows:"48% 48%", alignItems:"center"}}>
					<Card img={image} title={'1'} caption={'1'}/>
					<Card img={image} title={'1'} caption={'1'}/>
				</div>
			</div>

			{articles? (
				<Panel>
					{articles.map((value, key) => (
						<div key={key}>
							<Cover
								articleID={value.articleId}
								image={value.articleCoverImage}
								title={value.articleTitle}
								description={value.articleDescription}
								content={value.articleContent}
							/>
							<hr />
						</div>
					))}
				</Panel>
			) : (
				<Skeleton animation={"pulse"} />
			)}

			<div>
				<IconButton disabled={disabledPrev} onClick={handlePreviousPage}><NavigateBeforeIcon /></IconButton>
				<IconButton disabled={disabledNext} onClick={handleNextPage}><NavigateNextIcon /></IconButton>
			</div>
		</div>
	)
}

export default HomePage