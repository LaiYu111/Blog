import {Button, Divider, List} from "antd";
import useGet from "../../hooks/useGet.js";
import {useEffect} from "react";
import {BACKEND_URL} from "../../config.js";
import {useDispatch, useSelector} from "react-redux";
import {setTagCount, setTags} from "../../redux/actions/requestActions/tagAction.js";
import MyPagination from "../../components/MyPagination/index.jsx";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

function Header(){
  return (
    <div>
      Tag Management
    </div>
  )
}

function Footer (){
  return (
    <MyPagination />
  )
}

function Items({item}){
  return (
    <List.Item>
      {item.id} {item.tagName} {item.color}
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

function TagPage(){
  const { getData} = useGet()
  const dispatch = useDispatch()
  const pageIndex = useSelector(state => state.systemReducers.pagination.pageIndex)
  const pageSize = useSelector(state => state.systemReducers.pagination.pageSize)
  const data = useSelector(state => state.requestReducers.tag.tags)

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