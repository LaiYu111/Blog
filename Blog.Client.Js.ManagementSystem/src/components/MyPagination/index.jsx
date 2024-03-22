import {Input, Pagination} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {setPageIndex, setPageSize} from "../../redux/actions/systemActions/paginationActions.js";

function MyPagination(){
  const pageIndex = useSelector(state =>  state.systemReducers.pagination.pageIndex)
  const pageSize = useSelector(state =>  state.systemReducers.pagination.pageSize)
  const total = useSelector(state => state.requestReducers.article.total)
  const dispatch = useDispatch()

  const handleSetPage=(page, pageSize)=>{
    dispatch(setPageIndex(page))
    dispatch(setPageSize(pageSize))
  }

  const handlePageSize = (e) => {
    dispatch(setPageSize(Number(e.target.value)))
  }


  return (
    <div style={{display:"flex", flexDirection:"row"}}>
      <Pagination
        size={"small"}
        total={total}
        defaultPageSize={pageSize}
        defaultCurrent={pageIndex}
        showTotal={(total) => `Total ${total} items`}
        onChange={handleSetPage}
      />
      <div style={{display:"flex", flexDirection:"row", gap:"5px"}}>

        <div>
          {pageSize} / page
        </div>
      </div>
    </div>
  )
}

export default MyPagination