import React, { useState } from 'react';

function TimeInput(props) {
    const { value, onChange, placeholder } = props;
  
    const hours = [...Array(24).keys()];
    const minutes = ['00', '30'];
    const options = [];
  
    hours.forEach((hour) => {
      minutes.forEach((minute) => {
        const time = `${hour.toString().padStart(2, '0')}:${minute}:00`;
        options.push(time);
      });
    });
  
    return (
      
      <select
        className="form-select"
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        aria-label={placeholder}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    );
}

export default TimeInput;