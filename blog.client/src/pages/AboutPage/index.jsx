import author from '@/assets/author.jpg'
import s from './index.module.scss'
import {useEffect, useRef, useState} from "react";
import Timeline from "@/pages/AboutPage/Timeline/index.jsx";
import useTypeWritter from "react-typewriter-hook";
import Skills from "@/pages/AboutPage/Skills/index.jsx";
import {FormattedMessage} from "react-intl";
import Projects from "@/pages/AboutPage/Projects/index.jsx";
import Button from "@/components/Button/index.jsx";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import DownloadIcon from '@mui/icons-material/Download';

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

  const handleNavigation = (url) => {
    window.open(url)
  }

  return (
    <div className={s.aboutLayout}>
      <section className={s.aboutSection}>
        <div className={`${s.imageContainer} ${s.flagLeft}`} ref={(el) => (flagsRef.current[0] = el)}>
          <img className={s.authorImg} src={author} alt={'image'}/>
        </div>

        <div className={s.flagRight} ref={(el) => (flagsRef.current[1] = el)}>
          <h1><FormattedMessage id={'about'} /></h1>
          <div className={s.icon}>
            <Button onClick={() => handleNavigation('https://www.linkedin.com/in/laiyu-pei-90b572223/')}><LinkedInIcon/></Button>
            <Button onClick={() => handleNavigation('https://github.com/LaiYu111')} ><GitHubIcon/></Button>
            <Button><FormattedMessage id={'about.CV'} /> <DownloadIcon /> </Button>
          </div>
          {/*<TypingAnimation /> */}
          <h2>{prompt}<span className={s.blink}>_</span></h2>
          <div className={s.introduction}>
            <div className={s.caption}>
              <FormattedMessage id={'about.introduction.caption'}/>
            </div>
            <div>
              <FormattedMessage id={'about.introduction'}/>
            </div>
          </div>
        </div>
      </section>
      <Projects/>
      <Skills/>
      <Timeline/>
    </div>
  )
}

export default AboutPage