import {FC} from "react";
import style from './index.module.scss'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import {useSelector} from "react-redux";
import {AppState} from "../../redux/interfaces.ts";

interface Props{
	mode? : string,
	setMode?: Function,
}

const Nav: FC<Props> = () => {
	const hide = useSelector((state :AppState) => state.componentReducers.nav.hidden)


	return (
		<div className={`${style.root} ${hide && style.hidden}`}>
			<div>
				<button > <HomeOutlinedIcon /> </button>
			</div>
		</div>
	);
};

export default Nav