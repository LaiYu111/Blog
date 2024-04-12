import {Button, Divider, List, Tag} from "antd";
import './index.css'
import MyPagination from "../../components/MyPagination/index.jsx";
import {useEffect} from "react";
import useGet from "../../hooks/useGet.js";
import {BACKEND_URL} from "../../config.js";
import {deleteArticles, setArticleCount, setArticles} from "../../redux/actions/requestActions/articleAction.js";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import useDelete from "../../hooks/useDelete.js";
import {setPageIndex} from "../../redux/actions/systemActions/paginationActions.js";



function Footer (){
  const pageIndex = useSelector(state =>  state.systemReducers.pagination.pageIndex)
  const pageSize = useSelector(state =>  state.systemReducers.pagination.pageSize)
  const total = useSelector(state => state.requestReducers.article.total)

  return (
    <MyPagination pageIndex={pageIndex} pageSize={pageSize} total={total} />
  )
}

function Header(){
  return (
    <div>Article Management</div>
  )
}

function Items( {item} ) {
  const { deleteData, data } = useDelete()
  const dispatch = useDispatch()
  const token = useSelector(state => state.systemReducers.user.token)
  const navigator = useNavigate()


  useEffect(() => {
    if (data === true){
      dispatch(deleteArticles([item.articleId]))
    }
  }, [data]);

  const handleDelete = () => {
    deleteData(`${BACKEND_URL}/api/Article/DeleteArticle`, [item.articleId],token)
  }

  const handleEdit = (articleId) => {
    navigator(`/articles/${articleId}`)
  }


  return (
    <List.Item>
      <List.Item.Meta
        title={<Link to={`/articles/${item.articleId}`}>{item.articleId} | {item.articleTitle}</Link>}
        description={
          <>
            <div>
              {item.articleDescription}
            </div>
            <div style={{display:"flex", flexDirection:"row" }}>
              {item.tags.map((tag) => (
                <div key={tag.id}>
                  <Tag color={tag.color}>
                    {tag.tagName}
                  </Tag>
                </div>
              ))}
            </div>
          </>
        }
      />

      <div style={{ display: "flex", flexDirection:"row", height: "100%"}}>
        <div>
          <Button type={"link"} onClick={() => handleEdit(item.articleId)} >Edit</Button>
        </div>
        <div>
          <Divider type={"vertical"} style={{height:"100%"}} />
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
    articleId: PropTypes.number,
    articleTitle: PropTypes.string,
    articleDescription: PropTypes.string,
    tags: PropTypes.array
  }),
}


function ArticlesPage(){
  const { getData } = useGet()
  const dispatch = useDispatch()
  const pageIndex = useSelector(state => state.systemReducers.pagination.pageIndex)
  const pageSize = useSelector(state => state.systemReducers.pagination.pageSize)
  const data = useSelector(state => state.requestReducers.article.articles)


  useEffect(() => {

    dispatch(setPageIndex(1))
  }, []);

  useEffect(() => {
    async function fetchData () {
      const count = await getData(`${BACKEND_URL}/api/Article/CountArticles`)
      dispatch(setArticleCount(count))
      const articles = await getData(`${BACKEND_URL}/api/Article/GetArticles/${pageSize}/${pageIndex}`)
      dispatch(setArticles(articles))
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
        itemLayout={"horizontal"}
        dataSource={data}
        renderItem={(item) => <Items item={item}/>}
      />
    </div>
  )
}

export default ArticlesPage