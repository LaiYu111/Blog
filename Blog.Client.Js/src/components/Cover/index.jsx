import style from './index.module.scss'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';

import PropTypes from "prop-types";
import useNav from "../../hooks/useNav.js";
import {useState} from "react";
import Tag from "../Tag/index.jsx";




const Cover = ({image, articleID, title, description, tags}) => {
	const {navigate} = useNav()

	const handleNav = () => {
		navigate(`/article/${articleID}`)
	}

	return (
	<>
		<div
			className={`${style.root} ${style.expand}`}
		>
			{/* text */}
			<div className={style.text}>
				<div
					className={style.title}
					onClick={handleNav}
				>
					{title}
				</div>
				<div className={style.tags}>
					{tags.map((tag) => (
						<div key={tag.id}>
							<Tag
								tagName={tag.tagName}
								color={tag.color}
							/>
						</div>
					))}
				</div>
				<div
					className={style.article}
					onClick={handleNav}
				>
					{description}
				</div>
			</div>
			<div className={style.gap}></div>
			{/* image */}
			{image && (
				<div className={style.image}>
					<img src={image} alt={"image"}/>
				</div>
			)}
		</div>
	</>
	)
}

Cover.propTypes = {
	image : PropTypes.string,
	articleID : PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.number
	]),
	title: PropTypes.string,
	description: PropTypes.string,
	tags: PropTypes.array
}


export default Cover