import s from './index.module.scss'
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";

function Navigation(){
  const [activeIndex, setActiveIndex] = useState(0);
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
  }, [activeIndex]);

  return (
    <div className={s.navContainer}>
      <nav>
        <a ref={(el) => (navRefs.current[0] = el)} onClick={() => handleNavClick(0, '/article')}>文章</a>
        <a ref={(el) => (navRefs.current[1] = el)} onClick={() => handleNavClick(1, '/about')}>作者</a>
        <a ref={(el) => (navRefs.current[2] = el)} onClick={() => handleNavClick(2, '/')}>其他</a>
      </nav>
      <div className={s.animation} style={sliderStyle}></div>
    </div>
  );
}


export default Navigation