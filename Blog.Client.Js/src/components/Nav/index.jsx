import style from './index.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import useNav from "../../hooks/useNav.js";
import {MANAGEMENT_SYSTEM_URL} from "../../config.js";
import TranslateIcon from '@mui/icons-material/Translate';
import {IconButton} from "@mui/material";
import {  useIntl } from 'react-intl';
import {Languages} from "../../util.js";
import {setLanguage} from "../../redux/actions/systemActions/languageAction.js";

const Nav = () => {
	const intl = useIntl()
	const hide = useSelector((state) => state.componentReducers.nav.hidden)
	const language = useSelector(state => state.systemReducers.language.currentLang)
	const navigator = useNavigate()
	const dispatch = useDispatch()
	const {pageRouter} = useNav()

	const handleNav =(path)=>{
		navigator(path)
	}

	const pageRoute = (url) => {
		pageRouter(url)
	}

	const handleLanguage = () => {
		if (language === Languages.EN) {
			dispatch(setLanguage(Languages.ZH))
		}else {
			dispatch(setLanguage(Languages.EN))
		}
	}

	return (
		<div className={`${style.root} ${hide && style.hidden}`}>
			<div className={`${style.layout}`}>
				<div className={`${style.navigator}`}>
					<p className={`${style.item} ${style.onSelect}`} onClick={() => handleNav('/1')}>
						{intl.formatMessage({id: 'nav.home'})}
					</p>
					<hr />
					<p className={style.item} onClick={() => pageRoute(MANAGEMENT_SYSTEM_URL)}>
						{intl.formatMessage({id: 'nav.backend'})}
					</p>
				</div>


				<div className={`${style.others}`}>
					<div>
						<IconButton onClick={handleLanguage}><TranslateIcon /></IconButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Nav