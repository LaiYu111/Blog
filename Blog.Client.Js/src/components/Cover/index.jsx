import style from './index.module.scss'
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';

import PropTypes from "prop-types";
import useNav from "../../hooks/useNav.js";
import {useState} from "react";




const Cover = ({image, articleID, title, description}) => {
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
					{articleID}: {title}
				</div>


					<div
						className={style.article}
						onClick={handleNav}
					>
						{description}
					</div>


			{/*<div className={style.others}>*/}
			{/*		<ThumbUpOffAltIcon fontSize={"small"}  />*/}
			{/*		<ChatBubbleOutlineIcon fontSize={'small'}/>*/}
			{/*		<ChromeReaderModeOutlinedIcon fontSize={'small'}/>*/}
			{/*	</div>*/}
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
	description: PropTypes.string
}


export default Cover