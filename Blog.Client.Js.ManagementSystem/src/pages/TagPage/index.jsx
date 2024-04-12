import {Button, ColorPicker, Divider, Input, List, message, Tag} from "antd";
import useGet from "../../hooks/useGet.js";
import {useEffect, useState} from "react";
import {BACKEND_URL} from "../../config.js";
import {useDispatch, useSelector} from "react-redux";
import {addTag, setTagCount, setTags, updateTag} from "../../redux/actions/requestActions/tagAction.js";
import MyPagination from "../../components/MyPagination/index.jsx";
import PropTypes from "prop-types";
import {setPageIndex} from "../../redux/actions/systemActions/paginationActions.js";
import usePut from "../../hooks/usePut.js";
import usePost from "../../hooks/usePost.js";
import useDelete from "../../hooks/useDelete.js";

function Header(){
  const [color, setColor] = useState('')
  const [tagName, setTagName] = useState('')
  const [messageApi, contextHolder] = message.useMessage()
  const { postData, data, loading, error}= usePost()
  const dispatch = useDispatch()

  useEffect(() => {
    if (loading){
      messageApi.open({
        type:"loading",
        content: "Submitting !!",
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
        content: `${data.map(i => i.id).join(', ')} have been updated successfully.`
      })
      dispatch(addTag(data))
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

  const handleSubmit =() => {
    const newTag = [{
      tagName: tagName,
      color: color
    }]
    postData(`${BACKEND_URL}/api/Tag/CreateTags`, newTag)
  }

  return (
    <div>
      {contextHolder}
      <div>
        Tag Management
      </div>
      <Divider type={"horizontal"} style={{margin: "10px"}}/>
      <div style={{display:"flex", flexDirection:"row", gap: "5px"}}>
        <div>
          new tag:
        </div>
        <div>
          <Input size={"small"} value={tagName} onChange={(e) => setTagName(e.target.value)}/>
        </div>
        <div>
          <ColorPicker size={"small"} value={color} onChange={(e)=> setColor(e.toHexString())}/>
        </div>
        <div>
          <Button size={"small"} onClick={handleSubmit} >Submit</Button>
        </div>
      </div>
    </div>
  )
}

function Footer (){
  const pageIndex = useSelector(state =>  state.systemReducers.pagination.pageIndex)
  const pageSize = useSelector(state =>  state.systemReducers.pagination.pageSize)
  const total = useSelector(state => state.requestReducers.tag.total)


  return (
    <MyPagination pageIndex={pageIndex} pageSize={pageSize} total={total}/>
  )
}

function Items({item}){
  const [editMode, setEditMode] = useState(false)
  const [color, setColor] = useState(item.color)
  const [tagName, setTagName] = useState(item.tagName)
  const dispatch = useDispatch()
  const {putData, data, loading, error} = usePut()
  const [messageApi, contextHolder] = message.useMessage()
  const {deleteData} = useDelete()
  const token = useSelector(state => state.systemReducers.user.token)

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
        content: `${item.id} have been updated successfully.`
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
  const handleEditMode = (value) => {
    setEditMode(value)
  }

  const handleSubmit = () =>{
    const newTag = {
      id: item.id,
      tagName: tagName,
      color: color
    }
    putData(`${BACKEND_URL}/api/Tag/UpdateTag`, newTag)
    dispatch(updateTag(newTag))
    setEditMode(false)
  }

  const handleDelete = async  () => {
    const result = await deleteData(`${BACKEND_URL}/api/Tag/DeleteTag`, [item.id], token)
    if (result){

    }
  }

  return (
    <List.Item>
      {contextHolder}
      <List.Item.Meta
        title={`${item.id} | ${item.tagName}`}
        description={
          <div style={{display:"flex", flexDirection:"row", gap: "5px"}}>
            { editMode ? (
              <>
                <div>
                  <Input size={"small"} value={tagName} onChange={(e) => setTagName(e.target.value)}/>
                </div>
                <div>
                  <ColorPicker size={"small"} value={color} onChange={(e)=> setColor(e.toHexString())} />
                </div>
                <div>
                  <Button size={"small"} onClick={handleSubmit}>Submit</Button>
                </div>
              </>
            ) : (
              <Tag color={`${item.color}`} >{item.tagName}</Tag>
            )}
          </div>
        }
      />

      <div style={{display: "flex", flexDirection: "row", height: "100%"}}>
        <div>
          { editMode ? (

            <Button danger={true} type={"text"} onClick={() => handleEditMode(false)}>Cancel</Button>
          ):(
            <Button type={"link"} onClick={() => handleEditMode(true)}>Edit</Button>
          )}
        </div>
        <div>
          <Divider type={"vertical"} style={{height: "100%"}}/>
        </div>
        <div>
          <Button danger={true} type={"text"} onClick={handleDelete}>Delete</Button>
        </div>
      </div>
    </List.Item>
  )
}

Items.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    tagName: PropTypes.string,
    color: PropTypes.string,
  }),
}

function TagPage() {
  const {getData} = useGet()
  const dispatch = useDispatch()
  const pageIndex = useSelector(state => state.systemReducers.pagination.pageIndex)
  const pageSize = useSelector(state => state.systemReducers.pagination.pageSize)
  const data = useSelector(state => state.requestReducers.tag.tags)

  useEffect(() => {
    dispatch(setPageIndex(1))
  }, []);

  useEffect(() => {
    async function fetchData () {
      const count = await getData(`${BACKEND_URL}/api/Tag/CountTags`)
      dispatch(setTagCount(count))
      const tags = await getData(`${BACKEND_URL}/api/Tag/GetTags/${pageSize}/${pageIndex}`)
      dispatch(setTags(tags))
    }
    fetchData()
  }, [pageIndex]);

  return (
    <div>
      <List
        size="large"
        header={<Header />}
        footer={<Footer />}
        bordered
        dataSource={data}
        itemLayout={"horizontal"}
        renderItem={(item) => <Items item={item}/>}
      />
    </div>
  )
}

export default TagPage