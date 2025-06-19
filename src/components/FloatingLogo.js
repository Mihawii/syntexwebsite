import React from 'react';
import './FloatingLogo.css';

const FloatingLogo = ({ logo }) => {
  if (!logo) {
    return null;
  }

  return (
    <div className="floating-logo-container">
      <div className="floating-logo">
        <img src={logo.image} alt={logo.name} />
      </div>
    </div>
  );
};

export default FloatingLogo;
