import s from './index.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {setLanguage} from "@/redux/actions/languageAction.js";
import {LANGUAGE} from "@/config.js";

function Settings(){
  const dispatch = useDispatch()
  const language = useSelector(state => state.language._)
  const handleSetting = (value) => {
    dispatch(setLanguage(value))
  }

  return (
    <div className={s.setting}>
      <div className={s.layout}>
        {language === LANGUAGE.ZH ? (
          <div className={s.element} onClick={ () => handleSetting(LANGUAGE.EN)}>EN</div>
        ): (
          <div className={s.element} onClick={ () => handleSetting(LANGUAGE.ZH)}>ZH</div>
        )}
        {/*<div className={s.element}>XX</div>*/}
      </div>
    </div>
  )
}

export default Settings