import MyEditor from "../../../components/MyEditor/index.jsx";
import {useParams} from "react-router-dom";
import useGet from "../../../hooks/useGet.js";
import {useEffect, useState} from "react";
import {BACKEND_URL} from "../../../config.js";
import {Button, Flex, Image, message, Spin} from "antd";
import './index.css'
import TextArea from "antd/es/input/TextArea.js";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import usePut from "../../../hooks/usePut.js";



function Article({article, id}) {
  const [title, setTitle] = useState(article.articleTitle)
  const [description, setDescription] = useState(article.articleDescription)
  const articleContent = useSelector(state => state.componentReducers.editor.content)
  const [coverImage] = useState(article.articleCoverImage)
  const [messageApi, contextHolder] = message.useMessage()
  const {putData, data, loading, error} = usePut()

  useEffect(() => {
    if (loading){
      messageApi.open({
        type:"loading",
        content: "Updating !!",
        key: 1
      })
    }
    else{
      messageApi.destroy(1)
    }
  }, [loading]);

  useEffect(() => {
    if (data) {
      messageApi.open({
        type: "success",
        content: `${id} have been updated successfully.`
      })
    }
  }, [data])

  useEffect(() => {
    if (error){
      messageApi.open({
        type: "error",
        content: error
      })
    }
  }, [error]);

  const handleSaveArticle = async () => {
    await putData(`${BACKEND_URL}/api/Article/UpdateArticle`,{
      id: id,
      title: title,
      content: articleContent,
      description: description,
      coverImage: coverImage,
    })
  }

  return (
   <>
     {contextHolder}
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
         <p>Cover Image</p>
         <Image
           width={200}
           src={coverImage}
         />
       </div>

     </Flex>

     <div >
       <MyEditor content={article.articleContent}/>
     </div>

     <Button onClick={handleSaveArticle}>Submit</Button>
   </>
  )
}

function EditArticlePage(){
  const {id} = useParams()
  const {getData, data} = useGet()

  useEffect(() => {
    getData(`${BACKEND_URL}/api/Article/GetArticle/${id}`)
  }, []);

  return (
    <div className={'root'}>
      <div className={'header'}>
        Edit article
      </div>
      {data? (
        <>
          <Article article={data} id={id}/>
        </>
      ) : (
        <>
          <Spin />
        </>
      )}
    </div>
  )
}

Article.propTypes = {
  article: PropTypes.object,
  id: PropTypes.number
}

export default EditArticlePage