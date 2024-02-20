import {FC} from "react";
import style from './index.module.scss'
import Panel from "../Panel";

interface Props {
	img: string,
	title: string,
	caption: string
}

const Card : FC<Props> = ({ img, title}) => {
	return (
		<Panel>
			<div className={style.root}>
				<img src={img}/>
				<div className={style.title}>
					{title}xxxxxx
				</div>
			</div>
		</Panel>
	)
}

export default Card