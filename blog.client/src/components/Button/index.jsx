import PropTypes from "prop-types";
import s from './index.module.scss'

function Button({children, onClick, className, disabled}){
  return (
    <div
      onClick={onClick}
      className={`${className} ${s.customButton} ${disabled ? s.disabled :"" }`}
    >
      {children}
    </div>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool
}

export default Button