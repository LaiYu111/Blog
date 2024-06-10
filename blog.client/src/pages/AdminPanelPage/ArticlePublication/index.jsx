import TextEditor from "@/components/TextEditor/index.jsx";
import Panel from "@/components/Panel/index.jsx";
import s from './index.module.scss'
import ArticleContent from "@/components/ArticleContent/index.jsx";
import {useEffect, useRef, useState} from "react";
import Cover from "@/components/Cover/index.jsx";
import {TextField} from "@mui/material";
import Button from "@/components/Button/index.jsx";
import usePost from "@/hooks/usePost.js";
import {BACKEND_URL} from "@/config.js";
import ProgressBar from "@/components/ProgressBar/index.jsx";

function ArticlePublication() {
  // const article = useSelector(state => state.publication.article)
  const fileInputRef = useRef(null)
  const [content, setContent] = useState('')
  const [description, setDescription] = useState('')
  const [title, setTitle]=useState('')
  const [imagePath, setImagePath] = useState('')
  const [highQualityImage, setHighQualityImage] = useState('')
  const [date] = useState(Date.now())
  const [tags, setTags] = useState([{ id: "1", name: "Sample Tag 1", bgColor: "#abcdef" }])
  const { postData, progress } = usePost()


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // 触发文件选择对话框
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0]; // 获取选择的文件

    // 文件上传逻辑
    try {
      const result = await postData(`${BACKEND_URL}/api/common/files/image`, {"images": file}, null, 'images')
      setImagePath(`${BACKEND_URL}/api/common/files/image/${result.data[0].lowQualityFilename}`)
      setHighQualityImage(`${BACKEND_URL}/api/common/files/image/${result.data[0].highQualityFilename}`)
    }catch (e){
      console.log(e)
    }
  };

  const handleSubmitArticle = async () => {
    try {
      const result = await postData(`${BACKEND_URL}/api/articles/`, {
        title: title,
        content: content,
        description: description,
        imagePath: imagePath,
        highQualityImage: highQualityImage,
        createDate: date,
        modifyDate: date,
        tags: tags
      })
      console.log('Article created:', result);
      reset()
    }catch (error) {
      console.error('Error creating article:', error);
    }
  }

  const reset = () => {
    // 重置所有输入状态为空值
    setTitle('');
    setDescription('');
    setImagePath('');
    setHighQualityImage('');
    setContent('');
    setTags([]);
  }

  return (
    <>
      <ProgressBar  progress={progress} />
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
              highQualityImage: highQualityImage,
              createDate: date,
              modifyDate: date,
              tags: tags
            }} />
          </div>
        </Panel>

        <Panel className={s.textEditorContainer}>
          <h2>Write an article</h2>
          <hr/>
          <section>
            <div className={s.row1}>
              <TextField
                required={true}
                label={"Title"}
                value={title}
                onChange={handleTitleChange}

              />

              <input
                type="file"
                ref={fileInputRef}
                style={{display: 'none'}} // 隐藏真实的文件选择按钮
                onChange={handleFileChange}
              />
              <Button onClick={handleUpload}>
                Upload a cover
              </Button>
            </div>

            <TextField
              required={false}
              label={"Description"}
              value={description}
              onChange={handleDescriptionChange}
              className={s.description}
            />

            <TextEditor content={content} setContent={setContent}/>

            <Button className={s.submit} onClick={handleSubmitArticle}>Submit</Button>
          </section>
        </Panel>
      </div>
    </>
  )
}

export default ArticlePublication