
'use client'

import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { ImageProps } from '../types/props';


const Images: React.FC<ImageProps> = ({ imgs, selectedColorIndex, colorClickCount }) => {
  const [imageIndex, setImageIndex] = useState(0); // single source of truth

  // Whenever color is clicked, update imageIndex to match
  useEffect(() => {
    if (typeof selectedColorIndex === "number" && selectedColorIndex < imgs.length) {
      setImageIndex(selectedColorIndex);
    }
  }, [colorClickCount]);

  // Handle hover
  const handleImageHover = (index: number) => {
    if (index !== imageIndex) {
      setImageIndex(index);
    }
  };

  return (
    <div id="images">
      {/* Main Image */}
      <div className="container-fluid p-0" style={{ maxWidth: '100%', overflowX: 'auto' }}>
        <InnerImageZoom
          src={imgs[imageIndex]}
          zoomSrc={imgs[imageIndex]}
          zoomPreload={true}
          zoomType="hover"
          className="img-fluid w-100"
          imgAttributes={{ alt: `${imgs[imageIndex]}` }}
        />
      </div>

      {/* Thumbnails */}
      <div className="thumbnails">
        {imgs.map((img, index) => (
          <Image
            key={img}
            className={`thumb-img img-fluid ${imageIndex === index ? 'active-thumb' : ''}`}
            onMouseOver={() => handleImageHover(index)}
            src={img}
            alt=""
            width={500}
            height={500}
          />
        ))}
      </div>
    </div>
  );
};

export default Images;
