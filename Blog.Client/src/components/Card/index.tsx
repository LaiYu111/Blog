import {FC} from "react";
import style from './index.module.scss'
import Panel from "../Panel";

interface Props {
	img: string,
	title: string,
	caption: string
}

const Card : FC<Props> = (props: Props) => {
	return (
		<Panel>
			<div className={style.root}>
				<img src={props.img}/>
				<div className={style.title}>
					{props.title}
				</div>
			</div>
		</Panel>
	)
}

export default Card