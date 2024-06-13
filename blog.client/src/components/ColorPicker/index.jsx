import  { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import PropTypes from 'prop-types';
import s from './index.module.scss'

function ColorPicker({ color, onChange }) {
  const [currentColor, setCurrentColor] = useState(color);
  const [pickerVisible, setPickerVisible] = useState(false);

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
        <div className={s.pickerOverlay}>
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
