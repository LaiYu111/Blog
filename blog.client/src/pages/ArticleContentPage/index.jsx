import s from './index.module.scss'
import Input from "@/components/Input/index.jsx";

function ArticleContentPage(){
  return (
    <div className={s.layout}>
      <div className={s.article}>
        <div className={s.navigation}>
          ss
        </div>
        <div>
          <hr className={s.divider}/>
        </div>
        <div className={s.content}>
          xx
        </div>
      </div>

      <Input/>
    </div>
  )
}

export default ArticleContentPage