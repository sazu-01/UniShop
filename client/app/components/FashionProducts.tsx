"use client";

//packages
import Link from "next/link";
import Slider from "react-slick";
import Image from "next/image";

//hook
import { useAppSelector } from "../lib/hook";

//type
import { ProductType } from "@/app/types/SliceTypes";
import Skeleton from "./Skeleton";
//css
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "@/css/FashionProducts.css";

//icons
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const FashionProducts = () => {
  //make custome next arrow
  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <BsArrowRightShort
        className={className}
        style={{ ...style }}
        onClick={onClick}
      />
    );
  }

  //make custome previous arrow
  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <BsArrowLeftShort
        className={className}
        style={{ ...style }}
        onClick={onClick}
      />
    );
  }
  //update settings of Slider & make responsive
  const settings = {
    dots: false,
    infinite: false,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
    responsive: [
      {
        breakpoint: 1115,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: false,
          speed: 800,
          dots: false,
        },
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          speed: 800,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 1,
          speed: 800,
          dots: false,
          infinite: false,
        },
      },
      {
        breakpoint: 670,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
          speed: 800,
          dots: false,
          infinit: false,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          speed: 800,
          dots: false,
          infinit: false,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 800,
          dots: false,
          infinit: false,
        },
      },
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          speed: 800,
          dots: false,
          infinit: false,
        },
      },
    ],
  };

  //get products from product reducer
  const { products } = useAppSelector((state: any) => state.products);

  if (!products) {
    return (
      <>
        <div className="slide-header">
          <Skeleton width="10rem" height="1.5rem" className="me-3" />
          <Skeleton width="5rem" height="1.5rem" />
        </div>

        <div className="slick-slider">
          <div className="slick-list">
            <div className="slick-track d-flex">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="product me-5">
                  <Skeleton
                    width="100%"
                    height="250px"
                    className="home-pro-img"
                  />

                  <div className="pro-content">
                    <Skeleton width="80%" height="1.5rem" className="mb-3" />
                    <Skeleton width="50%" height="1rem" className="mb-2" />
                  </div>

                  <div className="addcart d-flex justify-content-between align-items-center px-2">
                    <Skeleton width="4rem" height="1.5rem" />
                    <Skeleton width="3rem" height="1.5rem" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/*slide header part*/}
      <div className="slide-header">
        <p>categroy name</p>
        <Link href={`/`}>see all</Link>
      </div>

      {/*slider part*/}
      <Slider {...settings} className="">
        {/*if porduct is not null and length is greate than 0*/}
        {products && products.length > 0 ? (
          products.map((pro: ProductType) => {
            const { _id, title, slug, images, price } = pro;
            return (
              <div key={_id} className="product">
                {/*product img & content part*/}
                <Link href={`/product/${slug}`}>
                  <div className="product-img">
                    <Image
                      src={`${images[0]}`}
                      alt=""
                      width={300}
                      height={300}
                      className="home-pro-img"
                      priority
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  </div>

                  <div className="pro-content">
                    <p className="title">{title}</p>
                    <p className="rating">
                      <FaStar />
                      <FaStar />
                      <FaStar /> <FaStarHalfAlt />
                      <FaStarHalfAlt />
                    </p>
                  </div>
                </Link>

                {/*product price & button part*/}
                <div className="addcart">
                  <p className="price">${price}</p>
                  <button className="add-to-cart">+add</button>
                </div>
              </div>
            );
          })
        ) : (
          <div>no products loading</div>
        )}
      </Slider>
    </>
  );
};

export default FashionProducts;
