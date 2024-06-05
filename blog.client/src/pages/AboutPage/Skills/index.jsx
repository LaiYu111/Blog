import s from './index.module.scss'
import Tag from "@/components/Tag/index.jsx";
import {useEffect, useRef} from "react";
import {FormattedMessage} from "react-intl";
function Skills(){
  const rowOneFlags = useRef([])


  useEffect(() => {

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 增加动画
          entry.target.classList.add(s.active);
          console.log(`[Skills] Active`)
        }else{
          entry.target.classList.remove(s.active)
          console.log(`[Skills] Remove`)
        }
      })
    })

    const { current: rowOneEls } = rowOneFlags

    rowOneEls.forEach((el) => observer.observe(el))


    return () => {
      rowOneEls.forEach((el) => {
        if (el){
          observer.unobserve(el)
          console.log(`[Skills] unobserve`)
        }
      })
    }

  }, []);

  return (
    <div className={s.skillLayout}>
      <h1><FormattedMessage id={'about.skills'}/></h1>
      <div className={`${s.skills} ${s.flagLeft}`} ref={(el) => rowOneFlags.current[0] = el}>
        <Tag name={"JavaScript"}/>
        <Tag name={"TypeScript"}/>
        <Tag name={"Python"}/>
        <Tag name={"C#"}/>
      </div>
      <div className={`${s.skills} ${s.flagLeft}`} ref={(el) => rowOneFlags.current[1] = el}>
        <Tag name={"Node.Js"}/>
        <Tag name={"React.Js"}/>
        <Tag name={"Express.Js"}/>
        <Tag name={".Net Core"}/>
        <Tag name={"Flask"}/>
        <Tag name={"Django"}/>
      </div>
      <div className={`${s.skills} ${s.flagLeft}`} ref={(el) => rowOneFlags.current[2] = el}>
        <Tag name={"MongoDb"}/>
        <Tag name={"MySQL"}/>
      </div>
      <div className={`${s.skills} ${s.flagLeft}`} ref={(el) => rowOneFlags.current[3] = el}>
        <Tag name={"Linux"}/>
        <Tag name={"Docker"}/>
        <Tag name={"Docker-compose"}/>
        <Tag name={"AWS"}/>
      </div>
    </div>
  )
}

export default Skills