import PropTypes from "prop-types";
import s from './index.module.scss'
import {useEffect, useState} from "react";

function ListItemButton({
      children,
      className,
      icon,
      onClick,
      onMouseLeave,
      onMouseEnter,
      isSelected = false
          }) {
  return (
    <div
      className={`${className} ${s.listButton} ${isSelected ? s.selected : ''}`}
      onClick={onClick}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
    >
      <div className={`${s.icon}`}>
        {icon}
      </div>
      <div>
        {children}
      </div>
    </div>
  );
}

ListItemButton.propTypes = {
  children: PropTypes.node,
  icon: PropTypes.node,
  onClick: PropTypes.func,
  onMouseLeave: PropTypes.func,
  onMouseEnter: PropTypes.func,
  className: PropTypes.string,
  isSelected: PropTypes.bool,
}

export default ListItemButton