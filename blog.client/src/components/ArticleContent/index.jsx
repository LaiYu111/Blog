import  { useEffect, useRef, useState } from "react";
import s from './index.module.scss';
import Tag from "@/components/Tag/index.jsx";
import PropTypes from "prop-types";
import 'react-quill/dist/quill.snow.css';
import {formatDate} from "@/utils.js";
import './codeBlock.scss'

// 从 ArticleContentPage 分离出来
function ArticleContent({article}) {
  const tableOfContentAnchor = useRef();
  const [tableOfContent, setTableOfContent] = useState([]);

  useEffect(() => {
    if (tableOfContentAnchor.current) {
      const titles = tableOfContentAnchor.current.querySelectorAll('h1, h2, h3, h4');
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

    // 添加 clipboard
    if (tableOfContentAnchor.current){
      const preCodeBlocks = tableOfContentAnchor.current.querySelectorAll('pre')

      preCodeBlocks.forEach((block) => {
        const container = document.createElement('div')
        container.className = 'clipboardContainer'

        const button = document.createElement('button')
        button.innerText = 'Copy'
        button.className = 'clipboard'

        container.appendChild(button)
        block.prepend(container)

        button.onclick = () => {
          copyToClipboard(block.innerText)
          button.innerText = '√ Copied !'
          setTimeout(() => {
            button.innerText = 'Copy'
          }, 3000)
        }
      });
    }
  }, [article]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const handleScrolling = (anchorId) => {
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const styleMap = {
    H1: { indent: 0, fontSize: '16px' },
    H2: { indent: 20, fontSize: '14px' },
    H3: { indent: 40, fontSize: '12px' },
    H4: { indent: 60, fontSize: '10px' }
  }

  return (
    <div className={s.article}>
      {/* Navigation */}
      <div className={s.navigation}>
        {tableOfContent.map((value, index) => (
          <div
            key={index}
            onClick={() => handleScrolling(value.anchorId)}
            style={{
              marginLeft: `${styleMap[value.level].indent}px`,
              fontSize: styleMap[value.level].fontSize
            }}
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
            <div key={tag._id}>
              <Tag name={tag.name} bgColor={tag.bgColor} textColor={tag.textColor}/>
            </div>
          ))}
        </div>

        {article.highQualityImage && <img className={s.coverImage} src={article.highQualityImage} alt={'Lost image'}/>}

        <div
          dangerouslySetInnerHTML={{ __html: article.content }}
          className={`${s.content} view ql-editor`}
          ref={tableOfContentAnchor}
        />

        <div className={`${s.caption}`}>
          <small>Created at: {formatDate(article.createDate)}</small>
          <br/>
          <small>Modified at: {formatDate(article.modifyDate)}</small>
        </div>
      </div>
    </div>
  );
}

ArticleContent.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    imagePath: PropTypes.string,
    highQualityImage: PropTypes.string,
    content: PropTypes.string,
    createDate: PropTypes.any,
    modifyDate: PropTypes.any,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        bgColor: PropTypes.string
      })
    )
  })
};

export default ArticleContent;
