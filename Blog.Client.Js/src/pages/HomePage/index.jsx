
import Panel from "../../components/Panel";
import image from '../../assets/aaa.jpg'
import {Card, Skeleton} from "@mui/material";
import Cover from "../../components/Cover/index.jsx";
import useGet from "../../hooks/useGet.js";
import {useEffect} from "react";
import {BACKEND_URL} from "../../config.js";
import {useDispatch, useSelector} from "react-redux";
import {setArticleCount, setArticles} from "../../redux/actions/requestActions/articleAction.js";

function HomePage () {
	const { getData } = useGet()
	const dispatch = useDispatch()
	const articles = useSelector(state => state.requestReducers.article.articles)

	useEffect(  () => {
		async function fetchData (){
			const count = await getData(`${BACKEND_URL}/api/Article/CountArticles`)
			dispatch(setArticleCount(count))
			const articles = await getData(`${BACKEND_URL}/api/Article/GetArticles/${10}/${1}`)
			dispatch(setArticles(articles))
		}
		fetchData()
	}, []);


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

		</div>
	)
}

export default HomePage