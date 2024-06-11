import  { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import PropTypes from 'prop-types';

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
        style={{
          width: '25px',
          height: '25px',
          backgroundColor: currentColor,
          border: '1px solid #000',
          cursor: 'pointer'
        }}
      />

      {pickerVisible && (
        <div style={{ position: 'absolute', zIndex: '2' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%)',
              pointerEvents: 'none',
              borderRadius: "10px"
            }}
          />
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
