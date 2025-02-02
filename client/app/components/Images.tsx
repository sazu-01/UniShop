
'use client'

//types
import { ImageProps } from "@/app/types/props"
import Image from "next/image"
import { useState } from "react"

const Images : React.FC<ImageProps> = ({ imgs }) => {

  const [viewImage, setViewImage] = useState(0)

  const handleImageChange = (index : any) => {
    setViewImage(index)
  }
  
  return (
    <>
      <div id="images">
        {/*view image */}
        <Image className="img-fluid" src={imgs[viewImage]} alt="" width={500} height={500} />
        <p>hello</p>
        {/*thumbnails image */}
        <div className="thumbnails">
          {imgs.map((img, index)=>(
            <Image key={img} className="thumb-img img-fluid" 
             onMouseOver={()=>handleImageChange(index)}
             src={imgs[index]} alt="" width={500} height={500} 
             />
          ))}
          
        </div>
      </div>

    </>
  )
}

export default Images