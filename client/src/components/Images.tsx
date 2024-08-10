
//types
import { ImageProps } from "../types/props"

const Images : React.FC<ImageProps> = ({ imgs }) => {

  return (
    <>
      <div id="images">
        {/*view image */}
        <img className="img-fluid" src={imgs[0]} alt="" />
        {/*thumbnails image */}
        <div className="thumbnails">
          <img className="thumb-img img-fluid" src={imgs[0]} alt="" />
        </div>
      </div>
    </>
  )
}

export default Images