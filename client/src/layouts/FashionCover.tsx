

import { Carousel } from 'react-bootstrap';

//css
import "../css/FashionCover.css"

const FashionCover = () => {
  return (
    <>
  <Carousel data-bs-theme="dark" className=''>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="../assets/fashion-slide1.jpg"
          alt="First slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src="../assets/fashion-slide2.jpg"
          alt="Second slide"
        />
      </Carousel.Item>
    </Carousel>
    </>
  )
}

export default FashionCover