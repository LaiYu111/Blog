import  { useEffect, useRef, useState } from "react";
import s from './index.module.scss';
import Tag from "@/components/Tag/index.jsx";
import PropTypes from "prop-types";
import 'react-quill/dist/quill.snow.css';

// 从 ArticleContentPage 分离出来
function ArticleContent({ article }) {
  const tableOfContentAnchor = useRef();
  const [tableOfContent, setTableOfContent] = useState([]);

  useEffect(() => {
    if (tableOfContentAnchor.current) {
      const titles = tableOfContentAnchor.current.querySelectorAll('h1, h2, h3, h4, h5');
      const temp = [];
      titles.forEach((title, index) => {
        const anchorId = `anchor${index}`;
        title.setAttribute('id', anchorId);
        temp.push({
          level: title.tagName,
          name: title.textContent,
          anchorId: anchorId
        });
      });
      setTableOfContent(temp);
    }
  }, [article]);

  const handleScrolling = (anchorId) => {
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
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

      {/* Divider */}
      <div>
        <hr className={s.divider} />
      </div>

      {/* Content */}
      <div className={s.content}>
        <div className={s.tags}>
          {article.tags?.map((tag) => (
            <div key={tag.id}>
              <Tag name={tag.name} />
            </div>
          ))}
        </div>

        {article.imagePath && <img className={s.coverImage} src={article.imagePath} alt={'Lost image'}/>}

        <div
          dangerouslySetInnerHTML={{ __html: article.content }}
          className={`${s.content} view ql-editor`}
          ref={tableOfContentAnchor}
        />

        <div className={`${s.caption}`}>
          <small>Create Date: {article.createDate}</small>
        </div>
      </div>
    </div>
  );
}

ArticleContent.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string,
    description: PropTypes.string,
    imagePath: PropTypes.string,
    content: PropTypes.string,
    createDate: PropTypes.string,
    modifyDate: PropTypes.string,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        bgColor: PropTypes.string
      })
    )
  })
};

export default ArticleContent;
