import author from '@/assets/author.png'
import author2 from '@/assets/author2.png'
import s from './index.module.scss'
import {useEffect, useRef} from "react";


function AboutPage() {
  const flagsRef = useRef([])

  useEffect(() => {
    console.log(flagsRef)
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
      <section>
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

      <section>
        <div className={`${s.imageContainer} ${s.flagLeft}`} ref={(el) => (flagsRef.current[2] = el)}>
          <img src={author2}/>
        </div>

        <div className={s.flagRight} ref={(el) => (flagsRef.current[3] = el)}>
          <h1>About2</h1>
          <div className={s.caption}>
            asdasdasdasdasdasdasdasdasdasdasd
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage