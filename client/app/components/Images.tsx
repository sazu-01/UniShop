
'use client'

//packages
import InnerImageZoom from 'react-inner-image-zoom';

//css
import 'react-inner-image-zoom/lib/styles.min.css';


//types
import { ImageProps } from "@/app/types/props"
import Image from "next/image"
import { useState } from "react"


const Images: React.FC<ImageProps> = ({ imgs }) => {

  const [viewImage, setViewImage] = useState(0)

  const handleImageChange = (index: any) => {
    setViewImage(index)
  }

  return (
    <>
      <div id="images">
        {/*view image */}
        <div className="container-fluid p-0" style={{ maxWidth: '100%', overflowX: 'auto' }}>
          <InnerImageZoom
            src={imgs[viewImage]}
            zoomSrc={imgs[viewImage]}
            zoomPreload={true}
            zoomType="hover"
            className="img-fluid w-100"
            imgAttributes={{ alt: `${imgs[viewImage]}` }} 
          />
        </div>

        {/*thumbnails image */}
        <div className="thumbnails">
          {imgs.map((img, index) => (
            <Image key={img} className="thumb-img img-fluid"
              onMouseOver={() => handleImageChange(index)}
              src={imgs[index]} alt="" width={500} height={500}
            />
          ))}

        </div>
      </div>

    </>
  )
}

export default Images