
'use client'

import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
import Image from 'next/image';
import { useState } from 'react';
import { ImageProps } from '../types/props';




const Images: React.FC<ImageProps>= ({images, selectedColor }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const selectedSet = images.find(i => i.color === selectedColor) || { url: [] };

  return (
    <div id='images'>
      <div  className="container-fluid p-0 product-card" style={{ maxWidth: '100%', overflowX: 'auto' }}>
      {selectedSet.url.length > 0 && (
        <InnerImageZoom
          src={selectedSet.url[imageIndex]}
          zoomSrc={selectedSet.url[imageIndex]}
          zoomType="hover"
        />
      )}

      </div>
      <div className="thumbnails">
        {selectedSet.url.map((img, idx) => (
          <Image
            key={img}
            src={img}
            alt=""
            width={100}
            height={100}
            onMouseOver={() => setImageIndex(idx)}
            className={imageIndex === idx ? "active" : ""}
          />
        ))}
      </div>
    </div>
  );
};


export default Images;
