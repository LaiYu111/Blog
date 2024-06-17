import {useEffect, useRef, useState} from 'react';
import { HexColorPicker } from 'react-colorful';
import PropTypes from 'prop-types';
import s from './index.module.scss'

function ColorPicker({ color, onChange }) {
  const [currentColor, setCurrentColor] = useState(color);
  const [pickerVisible, setPickerVisible] = useState(false);
  const colorPickerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setPickerVisible(false); // 点击标签列表外部，隐藏标签列表
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (newColor) => {
    setCurrentColor(newColor);
    onChange(newColor);
  };

  const handleBoxClick = () => {
    setPickerVisible(!pickerVisible);
  };

  return (
    <div>
      <div
        onClick={handleBoxClick}
       className={s.colorBox}
        style={{backgroundColor: currentColor }}
      />

      {pickerVisible && (
        <div className={s.pickerOverlay} ref={colorPickerRef}>
          <div className={s.pickerBackground}/>
          <HexColorPicker
            color={currentColor}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
}

ColorPicker.propTypes = {
  color: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default ColorPicker;
