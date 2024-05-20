import author from '@/assets/author.png'
import s from './index.module.scss'
import {useEffect, useRef} from "react";
import Timeline from "@/components/Timeline/index.jsx";


function AboutPage() {
  const flagsRef = useRef([])

  // 选择标签放入 flagsRef 作为锚点。如果被选中的锚点被观察（IntersectionObserver）到，则添加css动画样式。卸载组件时初始化状态。
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

    const { current: elements } = flagsRef
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => {
        if (el){
          observer.unobserve(el)
        }
      })
    }

  }, []);

  return (
    <div className={s.aboutLayout}>
      <section className={s.aboutSection}>
        <div className={`${s.imageContainer} ${s.flagLeft}`} ref={(el) => (flagsRef.current[0] = el)}>
          <img src={author}/>
        </div>

        <div className={s.flagRight} ref={(el) => (flagsRef.current[1] = el)}>
          <h1>About</h1>
          <div className={s.caption}>
            asdasdasdasdasdasdasdasdasdasdasd
          </div>
        </div>
      </section>


      <Timeline/>

      <section>

      </section>
    </div>
  )
}

export default AboutPage