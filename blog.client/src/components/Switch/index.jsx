import PropTypes from "prop-types";
import s from './index.module.scss'

function Switch({value, onChange, disabled=false}){
  const handleClick = () => {
    if (!disabled && onChange) {
      onChange(!value);
    }
  };

  return (
    <div className={`${s.switch} ${value ? s.switchOn : s.switchOff} ${disabled ? s.switchDisabled : ''}`} onClick={handleClick}>
      <div className={` ${value ? s.switchToggle : s.switchToggleActive} `} />
    </div>
  );

}

Switch.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
}
export default Switch