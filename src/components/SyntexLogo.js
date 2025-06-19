import React, { useEffect, useState } from 'react';
import MetallicPaint, { parseLogoImage } from './MetallicPaint';

const SyntexLogo = () => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    const svgString = `
      <svg width="1000" height="1000" xmlns="http://www.w3.org/2000/svg">
        <style>
          .heavy {
            font-family: 'Helvetica Neue', sans-serif;
            font-weight: 900;
            font-size: 200px;
          }
        </style>
        <rect width="100%" height="100%" fill="white"/>
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" class="heavy" fill="black">SYNTEX</text>
      </svg>
    `;

    const blob = new Blob([svgString], { type: 'image/svg+xml' });

    parseLogoImage(blob)
      .then(result => {
        setImageData(result.imageData);
      })
      .catch(error => {
        console.error('Error parsing logo image:', error);
      });
  }, []);

  if (!imageData) {
    return null; // Render nothing while the image is processing
  }

  return <MetallicPaint imageData={imageData} />;
};

export default SyntexLogo;
