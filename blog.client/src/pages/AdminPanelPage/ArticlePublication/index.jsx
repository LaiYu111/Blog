import TextEditor from "@/components/TextEditor/index.jsx";
import Panel from "@/components/Panel/index.jsx";
import s from './index.module.scss'
import ArticleContent from "@/components/ArticleContent/index.jsx";
import {useEffect, useRef, useState} from "react";
import Cover from "@/components/Cover/index.jsx";
import {FormControl, MenuItem, Select, TextField} from "@mui/material";
import Button from "@/components/Button/index.jsx";
import usePost from "@/hooks/usePost.js";
import {BACKEND_URL, NOTIFICATION} from "@/config.js";
import ProgressBar from "@/components/ProgressBar/index.jsx";
import PropTypes from "prop-types";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import useGet from "@/hooks/useGet.js";
import usePut from "@/hooks/usePut.js";
import useNotification from "@/hooks/useNotification.js";
import Notification from "@/components/Notification/index.jsx";
import useDelete from "@/hooks/useDelete.js";

function ArticlePublication() {
  const fileInputRef = useRef(null)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search);
  const { postData, progress } = usePost()
  const { getData } = useGet()
  const { putData} = usePut()

  // article basic information
  const [content, setContent] = useState('')
  const [description, setDescription] = useState('')
  const [title, setTitle]=useState('')
  const [imagePath, setImagePath] = useState('')
  const [highQualityImage, setHighQualityImage] = useState('')
  const [createDate] = useState(Date.now())
  const [modifyDate, setModifyDate] = useState(Date.now())
  const [tags, setTags] = useState([])

  // picker
  const [tagPicker, setTagPicker] = useState([])

  // notification
  const { notifications, showNotification, hideNotification } = useNotification();

  // modify_mode
  const modifyMode = searchParams.get('modify_mode');
  const modifyArticleId = searchParams.get('article_id');
  const modifyArticle = useSelector(state => {
    if (modifyArticleId) {
      return state.management.articles.find(x => x._id === modifyArticleId)
    }else {
      return {}
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      const result = await getData(`${BACKEND_URL}/api/tags`)
      if (result.data){
        setTagPicker(result.data)
      }
    }
    fetchData()
  }, []);


  useEffect(() => {
    // Init article
    if(modifyMode){
      setContent(modifyArticle.content)
      setTitle(modifyArticle.title);
      setDescription(modifyArticle.description || "");
      setImagePath(modifyArticle.imagePath || "");
      setHighQualityImage(modifyArticle.highQualityImage || "");
      setTags(modifyArticle.tags || []);
    }
  }, [modifyMode]);

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
      showNotification(result.message)
    }catch (e){
      console.log(e)
      showNotification(e, NOTIFICATION.WARNING)
    }
  };

  const handleSubmitArticle = async () => {
    try {
      const result = await postData(`${BACKEND_URL}/api/articles/`, article())
      showNotification(result.message)
      reset()
    }catch (e) {
      console.error('Error creating article:', e);
      showNotification(e, NOTIFICATION.WARNING)
    }
  }

  const handleUpdateArticle = async () => {
    try {
      setModifyDate(Date.now())
      const result = await putData(`${BACKEND_URL}/api/articles`, {
        id: modifyArticleId,
        article: {
          content: content,
          title: title,
          description: description,
          imagePath: imagePath,
          highQualityImage: highQualityImage,
          modifyDate: modifyDate,
          tags: tags
        }
      })
      showNotification(result.message)
      reset()
    }catch (e){
      showNotification(e, NOTIFICATION.WARNING)
    }
  }

  const handleTagChange = (e) => {
    setTags(e.target.value)
  }

  const renderSelector = (selectedTags) => {
    if (selectedTags.length === 0){
      return <em>Select Tags</em>
    }

    const tagNames = selectedTags.map( (tag) => tag.name )
    return tagNames.join(', ')
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

  const article = () => {
      return {
        content: content,
        title: title,
        description: description,
        imagePath: imagePath,
        highQualityImage: highQualityImage,
        createDate: createDate,
        modifyDate: modifyDate,
        tags: tags
      }
  }

  return (
    <>
      <Notification onClose={hideNotification} notifications={notifications} />
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

            <ArticleContent article={article()} />
          </div>
        </Panel>

        <Panel className={s.textEditorContainer}>
          {modifyMode? (
            <h2>Editing {modifyArticleId}</h2>
          ): (
            <h2>Write an article</h2>
          )}
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

              <FormControl>
                <Select
                  multiple={true}
                  value={tags}
                  onChange={handleTagChange}
                  renderValue={renderSelector}
                  style={ {width: "300px" }}
                >
                  { tagPicker.map( (tag) => (
                    <MenuItem
                      key={tag._id}
                      value={tag}
                    >
                      {tag.name}
                    </MenuItem>
                  ) )}
                </Select>
              </FormControl>
            </div>

            <TextField
              required={false}
              label={"Description"}
              value={description}
              onChange={handleDescriptionChange}
              className={s.description}
            />

            <TextEditor content={content} setContent={setContent}/>

            { modifyMode ?(
              <Button className={s.submit} onClick={handleUpdateArticle}>Confirm Change</Button>
            ):(
              <Button className={s.submit} onClick={handleSubmitArticle}>Submit</Button>
            )}
          </section>
        </Panel>
      </div>
    </>
  )
}

ArticlePublication.propTypes = {
  modifyMode: PropTypes.bool
}

export default ArticlePublication