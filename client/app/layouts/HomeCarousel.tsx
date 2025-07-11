"use client";

//packages
import { useEffect, useState } from "react";
import Image from "next/image";
import { Carousel } from "react-bootstrap";
import Skeleton from "../components/Skeleton";
//css
import "@/css/HomeCarousel.css";

interface MediaItem {
  carouselImages: string[];
}

const HomeCarousel = () => {
  const [media, setAllMedia] = useState<MediaItem[]>([]);

  //handle get carousel
  const handleGetAllCarousel = async () => {
    try {
      const  res  = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/media/all-media`);
      const data = await res.json();
      setAllMedia(data.payload.allMedia);
    } catch (error) {
      console.log(`error in get carousel`, error);
    }
  };


  useEffect(() => {
    handleGetAllCarousel();
  }, []);

  if (!media[0]) {
    return (
      <Carousel>
        <Carousel.Item>
          <Skeleton width="100%" height="50rem" className=""></Skeleton>
        </Carousel.Item>
      </Carousel>
    );
  }
  return (
    <>
      <Carousel data-bs-theme="dark" className="">
        {media[0].carouselImages.map((img, index) => {
          return (
            <Carousel.Item key={index}>
              <Image
                className="d-block w-100"
                src={img}
                alt="First slide"
                width={1920}
                height={1080}
                priority={index === 0}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </>
  );
};

export default HomeCarousel;
