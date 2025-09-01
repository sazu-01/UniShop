"use client";

//packages
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";

//type
import { ProductType } from "@/app/types/SliceTypes";


//component
import Skeleton from "./Skeleton";

//css
import "@/css/HomePageProducts.css";


type Props = {
  products: ProductType[];
}

const HomePageProducts = ({ products }: Props) => {


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
    ([, categoryData]) => categoryData.products.length >= 2
  );

  if (!products) {
    return (
      <>
        <div className="slide-header">
          <Skeleton width="10rem" height="1.5rem" className="me-3" />
          <Skeleton width="5rem" height="1.5rem" />
        </div>
        <div id="home-page-products">
          <div className="products-grid">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="product">
                <div className="product-img">
                  <Skeleton
                    width="100%"
                    height="100%"
                    className="home-pro-img skeleton-img"
                  />
                </div>
                <div className="pro-content">
                  <Skeleton width="80%" height="1.5rem" className="mb-3" />
                  <Skeleton width="50%" height="1rem" className="mb-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
  const placeholder = "/placeholder.jpg";



  return (
    <>

      {filteredCategories.map(([categorySlug, categoryData]: any) => {
        // Sort products so featured ones come first
        const sortedProducts = [...categoryData.products].sort((a, b) => {
          return (b.featured === true ? 1 : 0) - (a.featured === true ? 1 : 0);
        });

        return (


          <div key={categorySlug} id="home-page-products">
            <div className="slide-header">
              <p>{categoryData.name}</p>
              <Link href={`/${categorySlug}`}>See all</Link>
            </div>
            
            <Swiper
              modules={[Navigation, FreeMode]}
              navigation
              freeMode={true}
              spaceBetween={20}
              slidesPerView={4}
              slidesPerGroup={4}
              speed={400}
              breakpoints={{
                1200: {
                  slidesPerView: 4,
                  slidesPerGroup: 4,
                },
                768: {
                  slidesPerView: 3,
                  slidesPerGroup: 3,
                },
                481: {
                  slidesPerView: 2,
                  slidesPerGroup: 1,
                },
                0: {
                  slidesPerView: 1.5,
                  slidesPerGroup: 1,
                  spaceBetween: 15
                },
              }}
            >
              {sortedProducts.map((pro: ProductType, index: number) => {
                const { title, slug, images, salePrice, discountPrice } = pro;
                return (
                  <SwiperSlide key={index}>
                    <div className="product">
                      <Link href={`/product/${slug}`}>
                        <div className="product-img">
                          <Image
                            src={
                              Array.isArray(images) &&
                                images.length > 0 &&
                                Array.isArray(images[0].url) &&
                                images[0].url.length > 0
                                ? images[0].url[0]
                                : placeholder
                            }
                            alt={title}
                            width={300}
                            height={300}
                            className="home-pro-img"
                            priority={index === 0}
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "auto",
                            }}
                          />
                        </div>
                        <div className="pro-content">
                          {title.length > 32 ? (
                            <p className="title">{title.slice(0, 32)}...</p>
                          ) : (
                            <p className="title">{title}</p>
                          )}
                          <p className="price">
                            TK. {discountPrice}{" "}
                            <span className="sale-price">
                              <del>{salePrice}</del>
                            </span>
                          </p>
                        </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        );
      })}

    </>
  );
};

export default HomePageProducts;