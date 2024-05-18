import s from './index.module.scss'
import {useEffect, useRef, useState} from "react";

function Navigation(){
  const [activeIndex, setActiveIndex] = useState(0);
  const [sliderStyle, setSliderStyle] = useState({});
  const navRefs = useRef([]);

  const handleNavClick = (index) => {
    setActiveIndex(index);
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
        <a ref={(el) => (navRefs.current[0] = el)} onClick={() => handleNavClick(0)}>文xxxx章</a>
        <a ref={(el) => (navRefs.current[1] = el)} onClick={() => handleNavClick(1)}>作者</a>

      </nav>
      <div className={s.animation} style={sliderStyle}></div>
    </div>
  );
}


export default Navigation