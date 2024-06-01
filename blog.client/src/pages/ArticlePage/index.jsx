import s from './index.module.scss'
import Cover from "@/components/Cover/index.jsx";
import articleList from './article.json'
import {useNavigate} from "react-router-dom";

function HomePage() {
  const navigator = useNavigate()
  const handleRouting = (path) => {
    navigator(path)
  }

  return (
    <div className={s.homeLayout}>
      <h1>Articles</h1>
      <div className={s.caption}>This CSS style will create a subheading with a brief description of you, your work, and what you’re all about, similar to the style shown in the image. Adjust the font-size and padding as needed to fit your design preferences.</div>
      <div className={s.covers}>
        {articleList.map((article) => (
          <div key={article.id}>
            <Cover
              description={article.description}
              title={article.title}
              imageURL={article.imageURL}
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