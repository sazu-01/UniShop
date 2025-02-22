'use client'

//packages
import { useEffect, useState } from 'react';
import { api } from '../utili/axiosConfig';
import Image from 'next/image';
import { Carousel } from 'react-bootstrap';
import Skeleton from '../components/Skeleton';
//css
import "@/css/FashionCover.css"
interface MediaItem {
  carouselImages: string[];
}

const HomeCover = () => {
  
  const [media, setAllMedia] = useState<MediaItem[]>([]);
  
  //handle get carousel
    const handleGetAllCarousel = async () => {
      try {
        const { data } = await api.get("/media/all-media");
  
        setAllMedia(data.payload.allMedia);
      } catch (error) {
        console.log(`error in get carousel`, error);
      }
    };


  
  useEffect(() => {
      handleGetAllCarousel();
    }, []);

    if(!media[0]) {
      return <Carousel>
         <Carousel.Item>
           <Skeleton width='100%' height='50rem' className='' ></Skeleton>
         </Carousel.Item>
      </Carousel>
    }
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