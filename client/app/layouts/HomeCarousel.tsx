
"use client"
//packages
import Image from "next/image";
import { Carousel } from "react-bootstrap";
import Skeleton from "../components/Skeleton";
//css
import "@/css/HomeCarousel.css";

interface MediaItem {
  carouselImages: string[];
}

interface HomeCarouselProps {
  media: MediaItem[];
}

const HomeCarousel = ({media} : HomeCarouselProps) => {


  if (!media || !media[0] || !media[0].carouselImages) {
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
