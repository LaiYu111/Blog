import s from './index.module.scss'
import PropTypes from "prop-types";
function Tag({name, bgColor, textColor}){
  return(
    <div
      className={s.tag}
      style={{
        backgroundColor: bgColor,
        color: textColor
      }}
    >
      {name}
    </div>
  )
}

Tag.propTypes = {
  name: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string
}

export default Tag