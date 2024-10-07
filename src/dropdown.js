import React from 'react';

function Dropdown({ label, options, onSelect }) {
  return (
    <div className="dropdown-container">
      <label>{label}</label>
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="" disabled selected>Select</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
