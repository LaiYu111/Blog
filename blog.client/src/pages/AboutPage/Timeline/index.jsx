import s from './index.module.scss'
import {useEffect, useRef} from "react";
import event from './event.json'
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import WorkHistoryRoundedIcon from '@mui/icons-material/WorkHistoryRounded';
import {FormattedMessage} from "react-intl";
import {useSelector} from "react-redux";
import {LANGUAGE} from "@/config.js";
// 嵌套动画
// mask 滑动长度
// content 承载内容
function Timeline() {
  const timeFlagRef = useRef([])
  const contentFlagRef = useRef([])
  const maskRef = useRef(null)
  const language = useSelector(state => state.language._)

  // 初始化 mask 的长度
  useEffect(() => {
    if (maskRef) {
      maskRef.current.style.height = `${100*event.length}vh`
    }
  }, []);

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

    const { current: timeEls } = timeFlagRef
    const { current: contentEls} = contentFlagRef
    timeEls.forEach((el) => observer.observe(el))
    contentEls.forEach((el) => observer.observe(el))

    return () => {
      timeEls.forEach((el) => {
        if (el){
          observer.unobserve(el)
        }
      })
      contentEls.forEach((el) => {
        if (el){
          observer.unobserve(el)
        }
      })

    }
  }, []);

  return (
    <div className={s.mask} ref={(el) => (maskRef.current = el)}>
      <div className={s.content}>
        <h1 className={s.header}><FormattedMessage id={'about.experiences'} /></h1>
        {event.map((value, key) => (
          <section key={key} className={s.timelineSection}>
            {/*<div className={`${s.flagUp}`} ref={(el) => (timeFlagRef.current[key] = el)}>*/}
            {/*  {value.time}*/}
            {/*</div>*/}
            <div className={s.iconWrapper}>

              {value.type === 'school' ? (
                <SchoolRoundedIcon fontSize={'large'} className={s.icon}/>
              ) : (
                <WorkHistoryRoundedIcon fontSize={'large'} className={s.icon} />
              )}
              <hr/>
            </div>

            <div className={`${s.flagRight} ${s.information}`} ref={(el) => (contentFlagRef.current[key] = el)}>

              { language === LANGUAGE.EN && (
                <>
                  <h2>{value.title.en}</h2>
                  <div className={s.caption}>
                    <span>{value.time}</span>
                  </div>
                  <div className={s.caption}>
                    <span>{value.subtitle.en}</span>
                  </div>
                  <div dangerouslySetInnerHTML={{__html: value.event.en.replace(/\n/g, '<br/>')}}/>   {/* 灵活编辑 event 文本 */}
                </>
              )}

              {language === LANGUAGE.ZH && (
                <>
                  <h2>{value.title.zh}</h2>
                  <div className={s.caption}>
                    <span>{value.time}</span>
                  </div>
                  <div className={s.caption}>
                    <span>{value.subtitle.zh}</span>
                  </div>
                  <div dangerouslySetInnerHTML={{__html: value.event.zh.replace(/\n/g, '<br/>')}}/>
                </>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default Timeline;