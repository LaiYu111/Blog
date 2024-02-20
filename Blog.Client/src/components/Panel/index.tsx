import {FC, ReactNode} from "react";
import style from './index.module.scss'

interface Props {
	children?: ReactNode
}

const Panel : FC<Props> = ({ children}) => {
	return (
		<div className={`${style.root}`}>
			{children}
		</div>
	)
}

export default Panel