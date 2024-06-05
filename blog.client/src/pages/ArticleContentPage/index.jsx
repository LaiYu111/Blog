import s from './index.module.scss'
import {useParams} from "react-router-dom";
import articles from '@/pages/ArticlePage/article.json'
import {useEffect, useRef, useState} from "react";
import Tag from "@/components/Tag/index.jsx";

function ArticleContentPage(){
  const { id: articleId} = useParams()
  const [article] = useState(articles.find( x => x.id === articleId))
  const tableOfContentAnchor = useRef()
  const [tableOfContent, setTableOfContent] = useState([])

  useEffect(() => {
    if (tableOfContentAnchor.current){
      const titles = tableOfContentAnchor.current.querySelectorAll('h1, h2, h3, h4, h5');
      const temp = []
      titles.forEach((title, index) => {
        const anchorId = `anchor${index}`
        title.setAttribute('id', anchorId)
        temp.push({
          ['level']: title.tagName,
          ['name']: title.textContent,
          ['anchorId']: anchorId
        })
      })
      setTableOfContent(temp)
    }
  }, []);

  const handleScrolling = (anchorId) => {
    const element = document.getElementById(anchorId)
    if (element){
      element.scrollIntoView({behavior: "smooth"})
    }
  }

  return (
    <div className={s.layout}>
      <div className={s.article}>

        {/* Navigation */}
        <div className={s.navigation}>
          {tableOfContent.map((value, index) => (
            <div
              key={index}
              onClick={() => handleScrolling(value.anchorId)}
            >
              {value.name}
            </div>
          ))}
        </div>

        {/* Divider*/}
        <div>
          <hr className={s.divider}/>
        </div>

        {/* content */}
        <div className={s.content}>
          <div className={s.tags}>
            {article.tags.map((tag) => (
              <div key={tag.id}>
                <Tag name={tag.name} />
              </div>
            ))}
          </div>

          <img src={article.imagePath} />

          <div
            dangerouslySetInnerHTML={{__html: article.content}}
            className={s.content}
            ref={tableOfContentAnchor}
          />

          <div className={`${s.caption}`}>Create Date: {article.createDate}</div>
        </div>
      </div>
    </div>
  )
}

export default ArticleContentPage