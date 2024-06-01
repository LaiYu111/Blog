import s from './index.module.scss'
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ROUTE} from "@/config.js";
import {useSelector} from "react-redux";
import {FormattedMessage} from "react-intl";

function Navigation(){
  const locale = useSelector( state => state.language._)
  const [activeIndex, setActiveIndex] = useState(localStorage.getItem(ROUTE)? localStorage.getItem(ROUTE): 1);
  const [sliderStyle, setSliderStyle] = useState({});
  const navRefs = useRef([]);
  const nav = useNavigate()

  const handleNavClick = (index, path) => {
    setActiveIndex(index);
    nav(path)
  };

  useEffect(() => {
    const currentNav = navRefs.current[activeIndex];
    if (currentNav) {
      setSliderStyle({
        left: currentNav.offsetLeft,
        width: currentNav.offsetWidth,
      });
    }

    // 存储当前路由到 localstorage
    localStorage.setItem(ROUTE, activeIndex)

  }, [activeIndex, locale]);

  return (
    <div className={s.navContainer}>
      <nav>
        <a ref={(el) => (navRefs.current[0] = el)} onClick={() => handleNavClick(0, `/article`)}>
          <FormattedMessage id={"base.article"} />
        </a>
        <a ref={(el) => (navRefs.current[1] = el)} onClick={() => handleNavClick(1, `/about`)}>
          <FormattedMessage id={"base.author"} />
        </a>
      </nav>
      <div className={s.animation} style={sliderStyle}></div>
    </div>
  );
}


export default Navigation