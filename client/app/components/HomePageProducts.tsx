"use client";

//packages
import Link from "next/link";
import Slider from "react-slick";
import Image from "next/image";

//hook
import { useAppSelector, useAppDispatch } from "../lib/hook";

//type
import { ProductType } from "@/app/types/SliceTypes";
import Skeleton from "./Skeleton";

//css
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "@/css/HomePageProducts.css";

import { AddToCart } from "../lib/features/cartSlice";

//icons
import { BsArrowRightShort, BsArrowLeftShort } from "react-icons/bs";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const HomePageProducts = () => {
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
        breakpoint: 1366,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: true,
          centerMode: true,
          centerPadding: "20px",
        },
      },
    ],
  };

  const dispatch = useAppDispatch();

  //get products from product reducer
  const { products } = useAppSelector((state) => state.products);
  const { cart } = useAppSelector((state) => state.cart);

  const isProductInCart = (productId: string) => {
    return cart.some((item) => item._id === productId);
  };

  // Group products by category and filter those that have at least 5 products
  const categorizedProducts =
    products?.reduce(
      (
        acc: Record<string, { name: string; products: ProductType[] }>,
        product
      ) => {
        const { category } = product;
        if (!acc[category?.slug]) {
          acc[category?.slug] = {
            name: category?.name || "Unknown",
            products: [],
          };
        }
        acc[category?.slug].products.push(product);
        return acc;
      },
      {}
    ) || {};

  const filteredCategories = Object.entries(categorizedProducts).filter(
    ([, categoryData]) => categoryData.products.length >= 5
  );

  if (!products) {
    return (
      <>
        <div className="slide-header">
          <Skeleton width="10rem" height="1.5rem" className="me-3" />
          <Skeleton width="5rem" height="1.5rem" />
        </div>

        <div className="slick-slider">
          <div className="slick-list">
            <div className="slick-track d-flex m-4">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="product m-5">
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
                    <Skeleton width="4rem" height="10rem" />
                    <Skeleton width="3rem" height="10rem" />
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
      {filteredCategories.map(([categorySlug, categoryData]: any) => (
        <div key={categorySlug}>
          {/* Slide header part */}
          <div className="slide-header">
            <p>{categoryData.name}</p>
            <Link href={`/${categorySlug}`}>See all</Link>
          </div>

          {/* Slider part */}
          <Slider {...settings}>
            {categoryData.products.map((pro: ProductType) => {
              const { _id, title, slug, images, price, quantity = 1 } = pro;
              const inCart = isProductInCart(_id);
              return (
                <div key={_id} className="product">
                  <Link href={`/product/${slug}`}>
                    <div className="product-img">
                      <Image
                        src={`${images[0]}`}
                        alt={title}
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

                  {/* Product price & button part */}
                  <div className="addcart">
                    <p className="price">${price}</p>
                    {inCart ? (
                      <button className="home-page-addcart added">Added</button>
                    ) : (
                      <button
                        className="home-page-addcart"
                        onClick={() =>
                          dispatch(
                            AddToCart({
                              _id,
                              price,
                              productQuantity: 1,
                              title,
                              slug,
                              images,
                              quantity,
                            })
                          )
                        }
                      >
                        +Add
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      ))}
    </>
  );
};

export default HomePageProducts;
