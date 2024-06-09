import TextEditor from "@/components/TextEditor/index.jsx";
import Panel from "@/components/Panel/index.jsx";
import s from './index.module.scss'
import ArticleContent from "@/components/ArticleContent/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {formatDate} from "@/utils.js";

function ArticlePublication() {
  // const article = useSelector(state => state.publication.article)
  const [content, setContent] = useState('')

  useEffect(() => {
    console.log(content)
  }, [content]);

  return (
    <div className={s.layout}>
      <Panel className={s.textPreview}>
        <div>
          <h2>Preview</h2>
          <hr/>

          <ArticleContent article={{
            content: content,
            title: "",
            description: "",
            imagePath: "",
            createDate: formatDate(Date.now()),
            modifyDate: formatDate(Date.now()),
            tags: [
              { id: "1", name: "Sample Tag 1", bgColor: "#abcdef" },
              { id: "2", name: "Sample Tag 2", bgColor: "#fedcba" }
            ]
          }} />
        </div>
      </Panel>
      <Panel className={s.textEditorContainer}>
        <h2>Write an article</h2>
        <hr/>

        <TextEditor content={content} setContent={setContent}/>
      </Panel>
    </div>
  )
}

export default ArticlePublication