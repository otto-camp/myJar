import React, { useState } from 'react';
import './style.css';

function Image({ src, width, height, alt, onClick, className }: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [loading, setLoading] = useState(true);

  function onLoad() {
    setLoading(false);
  }

  const img = (
    <img
      className={className}
      alt={alt}
      src={src}
      width={width}
      height={height}
      onLoad={() => onLoad()}
      onClick={onClick}
      style={{ display: loading ? 'none' : 'block' }}
    />
  );

  return (
    <>
      <div className="image-placeholder" style={{ display: loading ? 'block' : 'none' }} />
      {img}
    </>
  );
}

export default Image;
