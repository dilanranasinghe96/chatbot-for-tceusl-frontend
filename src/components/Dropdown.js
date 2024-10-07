import React from 'react';

function Dropdown({ options, onSelect, placeholder, value }) {
  return (
    <div>
      <select
        onChange={(e) => onSelect(e.target.value)}
        value={value} // Show the selected value in the dropdown
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '5px',
          margin: '5px 0',
          borderColor: '#2d9cdb',
          backgroundColor: 'white',
        }}
      >
        <option disabled value="">
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
