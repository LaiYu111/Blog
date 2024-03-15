import style from './index.module.scss'
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import useNav from "../../hooks/useNav.js";
import {MANAGEMENT_SYSTEM_URL} from "../../config.js";

const Nav = () => {
	const hide = useSelector((state) => state.componentReducers.nav.hidden)
	const navigator = useNavigate()
	const {pageRouter} = useNav()

	const handleNav =(path)=>{
		navigator(path)
	}

	const pageRoute = (url) => {
		pageRouter(url)
	}

	return (
		<div className={`${style.root} ${hide && style.hidden}`}>
			<div className={`${style.layout}`}>
				<div className={`${style.navigator}` }>
					<p className={`${style.item} ${style.onSelect}`} onClick={() => handleNav('/')} >首页</p>
					<p className={`${style.item} ${style.onSelect}`}>日志</p>
					<p className={`${style.item} ${style.onSelect}`}>关于</p>
				</div>


				<div className={`${style.others}`}>
					<div >
						<input placeholder={'搜索'}/>
					</div>
					<div >
						<p className={style.item} onClick={()=> pageRoute(MANAGEMENT_SYSTEM_URL)}>后台</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Nav