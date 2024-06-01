import s from './index.module.scss'
import PropTypes from "prop-types";
function Tag({name, bgColor}){
  return(
    <div
      className={s.tag}
      style={{
        backgroundColor: bgColor
      }}
    >
      {name}
    </div>
  )
}

Tag.propTypes = {
  name: PropTypes.string,
  bgColor: PropTypes.string
}

export default Tag