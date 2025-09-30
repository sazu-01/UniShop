
"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import { ProductType } from '../types/SliceTypes';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';

//css
import "@/css/HomePageProducts.css";

interface FeaturedProductProps {
  products: ProductType[];
}

// Placeholder image - adjust path as needed
const placeholder = '/placeholder-image.jpg';

export default function FeaturedProduct({ products }: FeaturedProductProps) {
  // Filter products where Featured is true
  const featuredProducts = products.filter(product => product.discount >= 10);

  // If no featured products, don't render anything
  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <div id="home-page-products">
      <div className="slide-header">
        <p>Flash Sale</p>
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
        {featuredProducts.map((pro: ProductType, index: number) => {
          const { title, slug, images, salePrice, discountPrice } = pro;
          return (
            <SwiperSlide key={index}>
              <div className="product">
                <Link href={`/product/${slug}`}  prefetch={true}>
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
}