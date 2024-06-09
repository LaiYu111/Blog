import PropTypes from "prop-types";
import s from './index.module.scss'

function Panel({
   children,
   className
   }) {
  return (
    <div className={`${s.panel} ${className}`}>
      {children}
    </div>
  )
}

Panel.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default Panel