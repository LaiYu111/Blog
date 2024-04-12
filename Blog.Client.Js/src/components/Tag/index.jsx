import PropTypes from "prop-types";
import style from './index.module.scss'


function Tag({tagName, color}){
  return (
    <div className={`${style.tag} `} style={{backgroundColor: color}}>
      {tagName}
    </div>
  )
}

Tag.propTypes = {
  tagName: PropTypes.string,
  color: PropTypes.string
}

export default Tag