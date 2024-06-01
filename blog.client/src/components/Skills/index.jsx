import s from './index.module.scss'
import Tag from "@/components/Tag/index.jsx";
import {useEffect, useRef} from "react";
import {FormattedMessage} from "react-intl";
function Skills(){
  const rowOneFlags = useRef([])
  const rowTwoFlags = useRef([])

  useEffect(() => {

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 增加动画
          entry.target.classList.add(s.active);

          // 自定义结束动画定位
          if (entry.target.classList.contains(s.flagRight)){
            entry.target.classList.add(s.leftSkew)
          }

          if (entry.target.classList.contains(s.flagLeft)){
            entry.target.classList.add(s.rightSkew)
          }

        } else {
          entry.target.classList.remove(s.active);
          entry.target.classList.remove(s.leftSkew);
          entry.target.classList.remove(s.rightSkew);
        }
      })
    })

    const { current: rowOneEls } = rowOneFlags
    const { current: rowTwoEls} = rowTwoFlags

    rowOneEls.forEach((el) => observer.observe(el))
    rowTwoEls.forEach((el) => observer.observe(el))

    return () => {
      rowOneEls.forEach((el) => {
        if (el){
          observer.unobserve(el)
        }
      })
      rowTwoEls.forEach((el) => {
        if (el){
          observer.unobserve(el)
        }
      })
    }

  }, []);

  return (
    <div className={s.skillLayout}>
      <h1><FormattedMessage id={'about.skills'} /></h1>
      <div className={`${s.skills} ${s.flagRight}`} ref={(el) => rowOneFlags.current[0] = el}>
        <Tag name={"React.Js"}/>
        <Tag name={"JavaScript"}/>
        <Tag name={"JavaScript"}/>
      </div>
      <div className={`${s.skills} ${s.flagLeft}`} ref={(el) => rowTwoFlags.current[0] = el}>
        <Tag name={"React.Js"}/>
        <Tag name={"JavaScript"}/>
      </div>
      <div className={`${s.skills} ${s.flagRight}`} ref={(el) => rowOneFlags.current[1] = el}>
        <Tag name={"React.Js"}/>
        <Tag name={"JavaScript"}/>
      </div>
      <div className={`${s.skills} ${s.flagLeft}`} ref={(el) => rowTwoFlags.current[1] = el}>
        <Tag name={"React.Js"}/>
        <Tag name={"JavaScript"}/>
      </div>
    </div>
  )
}

export default Skills