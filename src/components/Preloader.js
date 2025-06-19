import React from 'react';
import './Preloader.css';

const Preloader = ({ isLoading }) => {
  return (
    <div className={`preloader ${!isLoading ? 'preloader-hidden' : ''}`}>
      <div className="spinner">
        {[...Array(12)].map((_, i) => (
          <div key={i} />
        ))}
      </div>
    </div>
  );
};

export default Preloader;
