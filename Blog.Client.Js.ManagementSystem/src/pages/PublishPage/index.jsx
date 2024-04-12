import MyEditor from "../../components/MyEditor/index.jsx";
import {Button, Flex, Image, message, Select, Tag} from "antd";
import {useDispatch, useSelector} from "react-redux";
import usePost from "../../hooks/usePost.js";
import {BACKEND_URL} from "../../config.js";
import MyModal from "../../components/MyModal/index.jsx";
import TextArea from "antd/es/input/TextArea.js";
import {SetModal} from "../../redux/actions/modalAction.js";
import './index.css'
import {useEffect, useState} from "react";
import {ClearEditor} from "../../redux/actions/editorAction.js";
import {getFirstImage} from "../../util.js";
import useGet from "../../hooks/useGet.js";
import {setTags} from "../../redux/actions/requestActions/tagAction.js";

function PublishPage(){
  const dispatch = useDispatch()
  const [messageApi, contextHolder] = message.useMessage()
  const token = useSelector(state => state.systemReducers.user.token)
  const { postData}= usePost()
  const {getData} = useGet()
  const articleContent = useSelector(state => state.componentReducers.editor.content)
  const articlePlainText = useSelector(state => state.componentReducers.editor.plaintext)
  const tag = useSelector(state => state.requestReducers.tag.tags)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState('')
  const [coverImage, setCoverImage]= useState('')
  const [articleTag, setArticleTag] = useState([])

  useEffect(() => {
    const fectchData = async () =>{
      const result = await getData(`${BACKEND_URL}/api/Tag/AllTags`)
      dispatch(setTags(result))
    }
    fectchData()
  }, []);

  const handleSubmit = () => {
    if (articleContent === ""){
      messageApi.open({
        type:"error",
        content: "article content cannot be empty !"
      })
    }
    else{
      setDescription(articlePlainText.substring(0, 199))
      setCoverImage(getFirstImage(articleContent))
      dispatch(SetModal(true))
    }
  }

  const handleModalSubmit = async () => {

    const sumbit = async () => {
      const article = await postData(`${BACKEND_URL}/api/Article/CreateArticle`, {
        title: title,
        content: articleContent,
        description: description,
        coverImage: coverImage,
        // tags: [tag.filter( t => articleTag.includes(t.id))]
      }, token)
      await postData(`${BACKEND_URL}/api/Article/AttachTags?articleId=${article.articleId}`, articleTag)
    }
    await sumbit()
    dispatch(SetModal(false))
    setTitle("")
    dispatch(ClearEditor())
  }

  const handleModalCancel = () => {
    dispatch(SetModal(false))
  }

  const options = tag.map(x => ({value: x.id, label: x.tagName}))

  const handleTagChange = (value) =>{
    setArticleTag(value)
  }

  const tagRender = (props) => {
    // eslint-disable-next-line react/prop-types
    const { label,value, closable, onClose } = props;
    const color = tag.find( x => x.id === value).color
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={color}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{
          marginInlineEnd: 4,
        }}
      >
        {label}
      </Tag>
    );
  };

  return(
    <div >
      {contextHolder}
      <p>
        Guest user can try, but your article will not publish onto Blog client/ will not store to database.
      </p>
      <MyModal  handleOk={handleModalSubmit} handleCancel={handleModalCancel}>
        <Flex vertical={true} gap={15} style={{margin: "30px"}}>
          <div>
            <p>Title</p>
            <TextArea
              placeholder="Title" autoSize maxLength={50}
              showCount value={title} onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <p>Description</p>
            <TextArea
              showCount maxLength={200} value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <p>Tags</p>
            <Select
              tagRender={tagRender}
              mode="multiple"
              style={{width:"100%"}}
              allowClear
              value={articleTag}
              onChange={ handleTagChange}
              placeholder={"Select Tags"}
              options={options}
            />
          </div>
          <p>Cover Image</p>
            <Image
              width={200}
              src={coverImage}
            />
          <p>Preview</p>
          <div
            dangerouslySetInnerHTML={{__html: articleContent}}
            style={{
              maxHeight: "250px",
              overflow: "auto",
              border: "1px solid",
              borderRadius: "15px",
              borderColor: "#dcdcdc"
            }}
          />
        </Flex>
      </MyModal>
      <div>
        <div>
          <div>
            <MyEditor/>
          </div>
          <div>
            <Button onClick={handleSubmit}>Publish</Button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PublishPage