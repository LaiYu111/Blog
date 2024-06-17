import TextEditor from "@/components/TextEditor/index.jsx";
import Panel from "@/components/Panel/index.jsx";
import s from './index.module.scss'
import ArticleContent from "@/components/ArticleContent/index.jsx";
import {useEffect, useRef, useState} from "react";
import Cover from "@/components/Cover/index.jsx";
import { TextField} from "@mui/material";
import Button from "@/components/Button/index.jsx";
import usePost from "@/hooks/usePost.js";
import {AUTH, BACKEND_URL, NOTIFICATION, PATH} from "@/config.js";
import ProgressBar from "@/components/ProgressBar/index.jsx";
import PropTypes from "prop-types";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import usePut from "@/hooks/usePut.js";
import useNotification from "@/hooks/useNotification.js";
import Notification from "@/components/Notification/index.jsx";
import TagSelector from "@/components/TagSelector/index.jsx";
import I18n from "@/components/i18n/index.jsx";
import {FormattedMessage} from "react-intl";

function ArticlePublication() {
  const fileInputRef = useRef(null)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search);
  const navigator = useNavigate()
  const [token] = useState(localStorage.getItem(AUTH.TOKEN))
  const { postData, progress, error:postError } = usePost()
  const { putData,error:putError} = usePut()

  // article basic information
  const [content, setContent] = useState('')
  const [description, setDescription] = useState('')
  const [title, setTitle]=useState('')
  const [imagePath, setImagePath] = useState('')
  const [highQualityImage, setHighQualityImage] = useState('')
  const [createDate] = useState(Date.now())
  const [modifyDate, setModifyDate] = useState(Date.now())
  const [tags, setTags] = useState([])


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
    const showErrorNotification = (error) => {
      if (error && error.response) {
        showNotification(`[${error.response.statusText}]: ${error.message}`, NOTIFICATION.WARNING);
      }
    };

    showErrorNotification(putError);
    showErrorNotification(postError);
  }, [putError, postError]);



  useEffect(() => {
    if (!modifyArticle){
      navigator(`/admin_panel/${PATH.management_articles}`) // redux 找不到article
    }else{
      setContent(modifyArticle.content)
      setTitle(modifyArticle.title);
      setDescription(modifyArticle.description || "");
      setImagePath(modifyArticle.imagePath || "");
      setHighQualityImage(modifyArticle.highQualityImage || "");
      setTags(modifyArticle.tags || []);
    }

  }, [modifyMode, modifyArticleId]);

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
    const result = await postData(`${BACKEND_URL}/api/common/files/image`, {"images": file}, null, 'images')
    if (result){
      setImagePath(`${BACKEND_URL}/api/common/files/image/${result.data[0].lowQualityFilename}`)
      setHighQualityImage(`${BACKEND_URL}/api/common/files/image/${result.data[0].highQualityFilename}`)
      showNotification(result.message)
    }
  };

  const getArticleData = (isUpdate = false) => {
    const articleData = {
      content: content,
      title: title,
      description: description,
      imagePath: imagePath,
      highQualityImage: highQualityImage,
      tagIds: tags.map((tag) => tag._id),
    };
    if (isUpdate) {
      articleData.modifyDate = Date.now();
    } else {
      articleData.createDate = createDate;
      articleData.modifyDate = modifyDate;
    }
    return articleData;
  };

  const getArticleContent = () => {
    return {
      ...getArticleData(false),
      tags: tags
    }
  }

  const handleSubmitArticle = async () => {
    const result = await postData(`${BACKEND_URL}/api/articles/`, getArticleData(), token);
    if (result) {
      showNotification(result.message);
      reset();
    }
  };

  const handleUpdateArticle = async () => {
    const result = await putData(`${BACKEND_URL}/api/articles`, {
      id: modifyArticleId,
      article: getArticleData(true)
    }, token);
    if (result) {
      showNotification(result.message);
      reset();
    }
  };

  const reset = () => {
    // 重置所有输入状态为空值
    setTitle('');
    setDescription('');
    setImagePath('');
    setHighQualityImage('');
    setContent('');
    setTags([]);
  };


  return (
    <>
      <Notification onClose={hideNotification} notifications={notifications} />
      <ProgressBar  progress={progress} />
      <div className={s.layout}>
        <Panel className={s.coverPreview}>
          <div>
            <h2>{I18n.createArticlePreviewCover}</h2>
            <hr/>

            <Cover description={description} title={title} imageURL={imagePath} tags={tags}/>
          </div>
        </Panel>

        <Panel className={s.textPreview}>
          <div>
            <h2>{I18n.createArticlePreviewArticle}</h2>
            <hr/>

            <ArticleContent article={getArticleContent()} />
          </div>
        </Panel>

        <Panel className={s.textEditorContainer}>
          {modifyMode? (
            <h2>{I18n.updateArticleEditing} {modifyArticleId}</h2>
          ): (
            <h2>{I18n.createArticleWriteArticle}</h2>
          )}
          <hr/>
          <section>
            <div className={s.row1}>
              <TextField
                required={true}
                label={<FormattedMessage id="create.article.title" />}
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

              <TagSelector selectedTags={tags} setSelectedTags={setTags} />
            </div>



            <TextField
              required={false}
              label={<FormattedMessage id="create.article.description" />}
              value={description}
              onChange={handleDescriptionChange}
              className={s.description}
            />

            <TextEditor content={content} setContent={setContent}/>

            { modifyMode ?(
              <Button className={s.submit} onClick={handleUpdateArticle}> {I18n.createArticleConfirmChange} </Button>
            ):(
              <Button className={s.submit} onClick={handleSubmitArticle}>{I18n.createArticleSubmit}</Button>
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