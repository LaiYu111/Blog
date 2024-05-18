import s from './index.module.scss'
import Navigation from "@/components/Navigation/index.jsx";
function Header(){

  return (
    <div className={s.header}>
      <div className={s.logo}>
        logo
      </div>
      <div className={s.navigation}><Navigation/></div>
    </div>
  )
}

export default Header