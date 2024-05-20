import s from './index.module.scss'
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {ROUTE} from "@/config.js";

function Navigation(){
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

  }, [activeIndex]);

  return (
    <div className={s.navContainer}>
      <nav>
        <a ref={(el) => (navRefs.current[0] = el)} onClick={() => handleNavClick(0, '/article')}>文章</a>
        <a ref={(el) => (navRefs.current[1] = el)} onClick={() => handleNavClick(1, '/about')}>作者</a>
      </nav>
      <div className={s.animation} style={sliderStyle}></div>
    </div>
  );
}


export default Navigation