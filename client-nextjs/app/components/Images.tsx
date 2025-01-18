
'use client'

//types
import { ImageProps } from "@/app/types/props"
import Image from "next/image"

const Images : React.FC<ImageProps> = ({ imgs }) => {

  return (
    <>
      <div id="images">
        {/*view image */}
        <Image className="img-fluid" src={imgs[0]} alt="" width={500} height={500} />
        {/*thumbnails image */}
        <div className="thumbnails">
          <Image className="thumb-img img-fluid" src={imgs[0]} alt="" width={500} height={500} />
        </div>
      </div>
    </>
  )
}

export default Images