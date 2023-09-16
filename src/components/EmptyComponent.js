import React from 'react';
import './style.css';

function EmptyComponent({text='No Data'}) {
  return (
    <div className="loader-container">
      <h5>{text}</h5>
    </div>
  );
}

export default EmptyComponent;