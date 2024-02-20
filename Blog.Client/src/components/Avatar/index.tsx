import {FC} from "react";
import style from './index.module.scss'
interface Props{
	image: string
}

const Avatar : FC<Props> = ({ image }) =>{
	return (
		<>
			<img className={style.root} src={image}/>
		</>
	)
}

export default Avatar