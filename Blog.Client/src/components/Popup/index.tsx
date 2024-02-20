import {FC} from "react";
import style from './index.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../redux/interfaces.ts";
import {setPopup} from "../../redux/actions/popupAction.ts";

interface Props{
	articleID: string | number
}
const Popup : FC<Props> = ({ articleID }) => {
	const show = useSelector((state: AppState) => state.componentReducers.popup.hidden)
	const dispatch = useDispatch()

	const handleKeyInteraction: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
		const key = e.key;

		switch (key) {
			case 'Escape':
			  dispatch(setPopup(false))
				break;
			default:
				break;
		}
	};

	return (
		<div
			className={`${show? style.active : style.hidden}`}
			onKeyDown={handleKeyInteraction}
			tabIndex={0} // 为了使div能够获取焦点，接收键盘事件
		>
			{ articleID }
		</div>
	)
}

export default Popup