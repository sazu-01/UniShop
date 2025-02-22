'use client'

//packages
import Image from 'next/image';
import { Carousel } from 'react-bootstrap';

//css
import "@/css/FashionCover.css"

const HomeCover = () => {
  return (
    <>
  <Carousel data-bs-theme="dark" className=''>
      <Carousel.Item>
        <Image
          className="d-block w-100"
          src="/fashion-slide1.jpg"
          alt="First slide"
          width={1920}
          height={1080}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        />
      </Carousel.Item>

      <Carousel.Item>
        <Image
          className="d-block w-100"
          src="/fashion-slide2.jpg"
          alt="Second slide"
          width={1920}
          height={1080}
          style={{
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
          }}
        />
      </Carousel.Item>
    </Carousel>
    </>
  )
}

export default HomeCover