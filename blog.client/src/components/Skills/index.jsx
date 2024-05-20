import s from './index.module.scss'
import Tag from "@/components/Tag/index.jsx";
import {useEffect, useRef} from "react";
function Skills(){
  const rowOneFlags = useRef([])
  const rowTwoFlags = useRef([])

  useEffect(() => {

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(s.active);
        } else {
          entry.target.classList.remove(s.active);
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
      <h1>Skills</h1>
      <div className={`${s.skills} ${s.flagRight}`} ref={(el) => rowOneFlags.current[0] = el}>
        <Tag name={"React.Js"}/>
        <Tag name={"JavaScript"}/>
        <Tag name={".Net Core"}/>
        <Tag name={"MongoDb"}/>
        <Tag name={"Node.Js"}/>
      </div>
      <div className={`${s.skills} ${s.flagLeft}`} ref={(el) => rowTwoFlags.current[0] = el}>
        <Tag name={"React.Js"}/>
        <Tag name={"JavaScript"}/>
        <Tag name={".Net Core"}/>
        <Tag name={"MongoDb"}/>
      </div>
      <div className={`${s.skills} ${s.flagRight}`} ref={(el) => rowOneFlags.current[1] = el}>
        <Tag name={"React.Js"}/>
        <Tag name={"JavaScript"}/>
        <Tag name={".Net Core"}/>
        <Tag name={"MongoDb"}/>
        <Tag name={"AWS"}/>
        <Tag name={"Docker"}/>
      </div>
      <div className={`${s.skills} ${s.flagLeft}`} ref={(el) => rowTwoFlags.current[1] = el}>
        <Tag name={"React.Js"}/>
        <Tag name={"JavaScript"}/>

      </div>
    </div>
  )
}

export default Skills