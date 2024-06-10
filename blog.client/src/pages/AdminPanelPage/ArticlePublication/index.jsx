import TextEditor from "@/components/TextEditor/index.jsx";
import Panel from "@/components/Panel/index.jsx";
import s from './index.module.scss'
import ArticleContent from "@/components/ArticleContent/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {formatDate} from "@/utils.js";
import Cover from "@/components/Cover/index.jsx";
import {TextField} from "@mui/material";

function ArticlePublication() {
  // const article = useSelector(state => state.publication.article)
  const [content, setContent] = useState('')
  const [description, setDescription] = useState('')
  const [title, setTitle]=useState('')
  const [imagePath, setImagePath] = useState('')
  const [tags, setTags] = useState([{ id: "1", name: "Sample Tag 1", bgColor: "#abcdef" }])

  useEffect(() => {
    console.log(content)
  }, [content]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <div className={s.layout}>
      <Panel className={s.coverPreview}>
        <div>
          <h2>Preview Cover</h2>
          <hr/>

          <Cover description={description} title={title} imageURL={imagePath} tags={tags}/>
        </div>
      </Panel>

      <Panel className={s.textPreview}>
        <div>
          <h2>Preview Article</h2>
          <hr/>

          <ArticleContent article={{
            content: content,
            title: title,
            description: description,
            imagePath: imagePath,
            createDate: formatDate(Date.now()),
            modifyDate: formatDate(Date.now()),
            tags: tags
          }} />
        </div>
      </Panel>

      <Panel className={s.textEditorContainer}>
        <h2>Write an article</h2>
        <hr/>
        <section >
          <TextField
            required={true}
            label={"Title"}
            value={title}
            onChange={handleTitleChange}
            className={s.title}
          />

          <TextField
            required={false}
            label={"Description"}
            value={description}
            onChange={handleDescriptionChange}
            className={s.description}
          />

          <TextEditor content={content} setContent={setContent}/>
        </section>
      </Panel>
    </div>
  )
}

export default ArticlePublication