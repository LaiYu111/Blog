// import author from '@/assets/author.png'
import author from '@/assets/author.jpg'
import s from './index.module.scss'
import {useEffect, useRef, useState} from "react";
import Timeline from "@/components/Timeline/index.jsx";
import TypingAnimation from "@/components/TypingAnimation/index.jsx";
import useTypeWritter from "react-typewriter-hook";
import Skills from "@/components/Skills/index.jsx";

const prompts = [
  "Hi, I am Laiyu Pei!",
  "你好，我是裴来宇!",
  ""
]

let index = 0

function AboutPage() {
  const flagsRef = useRef([])
  const [promptTemp, setPromptTemp] = useState('')
  const prompt = useTypeWritter(promptTemp)
  const intervalRef = useRef({})

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

  useEffect(() => {
    intervalRef.current = setInterval(() =>{
      index = index > prompts.length ? 0 : ++index;
      setPromptTemp(prompts[index])
    },1000)

    return () => {
      clearInterval(intervalRef.current)
    }

  }, [prompt])

  return (
    <div className={s.aboutLayout}>
      <section className={s.aboutSection}>
        <div className={`${s.imageContainer} ${s.flagLeft}`} ref={(el) => (flagsRef.current[0] = el)}>
          <img className={s.authorImg} src={author}/>
        </div>

        <div className={s.flagRight} ref={(el) => (flagsRef.current[1] = el)}>
          <h1>About</h1>
          {/*<TypingAnimation /> */}
          <h2>{prompt}<span className={s.blink}>_</span></h2>
          <div className={s.caption}>
            asdasdasdasdasdasdasdasdasdasdasd
          </div>
          <div>
            asdasdasdasdasdasd您asdasdasdasd您asdasdasdasd您asdasdasdasd您asdasdasdasd您asdasdasdasd您asdasd您asdaasdasdasdasd您sdasdasd您asdasdasdasd您asdasdasdasd您asdasdasdasd您asdasdasdasd您asdaasdasdasdasd您asdasdasdasd您sdasdasd您asdasdasdasd您asdasdasdasd您asdasdasdasd您asdasdasdasd您asdasdasdasd您
          </div>
        </div>
      </section>
      <Skills />
      <Timeline/>

    </div>
  )
}

export default AboutPage