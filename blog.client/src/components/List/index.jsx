import PropTypes from "prop-types";
import s from './index.module.scss'
function List({
  children,
  className,
  onClick
              }){
  return (
    <div className={`${className} ${s.list}`} onClick={onClick}>
      {children}
    </div>
  )
}

List.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func
}

export default List