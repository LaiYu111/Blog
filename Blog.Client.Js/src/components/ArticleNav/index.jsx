import Panel from "../Panel/index.jsx";
import style from './index.module.scss'
import useGet from "../../hooks/useGet.js";
import {useEffect, useState} from "react";
import {BACKEND_URL} from "../../config.js";
import {Skeleton} from "@mui/material";
import PropTypes from "prop-types";
import {SelectedType} from "../../util.js";
import useNav from "../../hooks/useNav.js";
import {useIntl} from "react-intl";



function Items({data}){
  const {pageRouter} = useNav()

  const handlePageRoute = (id) => {
    pageRouter(`/article/${id}`)
  }

  return (
    <div>
      {data.map((value) => (
        <div key={value.articleId}>
          {/* Title */}
          <div className={style.link} onClick={() => handlePageRoute(value.articleId)}>
            {value.articleTitle}
          </div>
          <hr/>
        </div>
      ))}
    </div>
  )
}

Items.propTypes = {
  data: PropTypes.array
}


function ArticleNav(){
  const {getData, data} = useGet()
  const [selectedType, setSelectedType] = useState(SelectedType.random)
  const intl = useIntl()

  useEffect(() => {
    switch (selectedType){
      case SelectedType.random:
        getData(`${BACKEND_URL}/api/Article/RecommendedArticles/${3}`)
        break
      case SelectedType.newest:
        getData(`${BACKEND_URL}/api/Article/GetArticles/${3}/${1}`)
        break
      default:
        getData(`${BACKEND_URL}/api/Article/RecommendedArticles/${3}`)
        break
    }
  }, [selectedType]);

  const handleSetSelectType = (type) => {
    switch (type){
      case SelectedType.random:
        setSelectedType(SelectedType.random)
        break
      case SelectedType.newest:
        setSelectedType(SelectedType.newest)
        break
      default:
        setSelectedType(SelectedType.random)
        break
    }
  }

  return (
    <Panel>
      <div className={style.root}>
        <div className={style.type}>
          <div
            className={`${style.link} ${selectedType === SelectedType.random? style.selected : ""}`}
            onClick={()=>handleSetSelectType(SelectedType.random)}
          >
            {intl.formatMessage({id:"articleNav.random"})}
          </div>
          <div
            className={`${style.link} ${selectedType === SelectedType.newest? style.selected : ""}`}
            onClick={()=>handleSetSelectType(SelectedType.newest)}
          >
            {intl.formatMessage({id:"articleNav.newest"})}
          </div>
        </div>


        {data ? (
          <Items data={data}/>
        ): (<Skeleton />)}
      </div>
    </Panel>
  )
}

export default ArticleNav