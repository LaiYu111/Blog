import s from './index.module.scss'
import Cover from "@/components/Cover/index.jsx";
import articleList from './article.json'
import {useNavigate} from "react-router-dom";
import {FormattedMessage} from "react-intl";

function HomePage() {
  const navigator = useNavigate()
  const handleRouting = (path) => {
    navigator(path)
  }

  return (
    <div className={s.homeLayout}>
      <h1><FormattedMessage id={'article.title'} /></h1>
      {/*<div className={s.caption}></div>*/}
      <div className={s.covers}>
        {articleList.map((article) => (
          <div key={article.id}>
            <Cover
              description={article.description}
              title={article.title}
              imageURL={article.imagePath}
              id={article.id}
              tags={article.tags}
              onClick={() => handleRouting(`/article/${article.id}`)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage