import PropTypes from "prop-types";
import s from './index.module.scss'
import {useState} from "react";

function ListItemButton({
  children,
  className,
  icon,
  onClick: externalOnClick,
  isSelected=false
                    }) {
  const [selected, setSelected] = useState(isSelected)

  const handleInternalClick = () => {
    setSelected(!selected);
  };

  const handleClick = (event) => {
    // Call both external and internal onClick handlers (if defined)
    externalOnClick?.(event); // Optional chaining for safety
    handleInternalClick();
  };

  return (
    <div
      className={`${className} ${s.listButton} ${selected ? s.selected : ''}`}
      onClick={handleClick}
    >
      <div className={`${s.icon}`}>
        {icon}
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}

ListItemButton.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  className: PropTypes.string,
  isSelected: PropTypes.bool
}

export default ListItemButton