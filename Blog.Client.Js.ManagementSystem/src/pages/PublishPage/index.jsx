import MyEditor from "../../components/MyEditor/index.jsx";
import {Button, Flex, Image, message} from "antd";
import {useDispatch, useSelector} from "react-redux";
import usePost from "../../hooks/usePost.js";
import {BACKEND_URL} from "../../config.js";
import MyModal from "../../components/MyModal/index.jsx";
import TextArea from "antd/es/input/TextArea.js";
import {SetModal} from "../../redux/actions/modalAction.js";
import './index.css'
import { useState} from "react";
import {ClearEditor} from "../../redux/actions/editorAction.js";
import {getFirstImage} from "../../util.js";

function PublishPage(){
  const dispatch = useDispatch()
  const [messageApi, contextHolder] = message.useMessage()
  const token = useSelector(state => state.systemReducers.user.token)
  const { postData}= usePost()
  const articleContent = useSelector(state => state.componentReducers.editor.content)
  const articlePlainText = useSelector(state => state.componentReducers.editor.plaintext)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState('')
  const [coverImage, setCoverImage]= useState('')

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

  const handleModalSubmit = () => {
    postData(`${BACKEND_URL}/api/Article/CreateArticle`, {
      title: title,
      content: articleContent,
      description: description,
      coverImage: coverImage
    }, token)
    dispatch(SetModal(false))
    setTitle("")
    dispatch(ClearEditor())
  }

  const handleModalCancel = () => {
    dispatch(SetModal(false))
  }

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
      <div style={{display: 'flex', flexDirection: "row", height: "100%"}}>
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