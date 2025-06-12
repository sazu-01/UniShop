"use client";

//packages
import Link from "next/link";

import Image from "next/image";

//hook
import { useAppSelector, useAppDispatch } from "../lib/hook";

//type
import { ProductType } from "@/app/types/SliceTypes";
import Skeleton from "./Skeleton";

//css
import "@/css/HomePageProducts.css";

import { AddToCart } from "../lib/features/cartSlice";

//icons
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const HomePageProducts = () => {


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
                <div className="addcart">
                  <Skeleton width="4rem" height="1.2rem" />
                  <Skeleton width="3rem" height="1.8rem" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <>

      {filteredCategories.map(([categorySlug, categoryData]: any) => (
        <div key={categorySlug} id="home-page-products">
          <div className="slide-header">
            <p>{categoryData.name}</p>
            <Link href={`/${categorySlug}`}>See all</Link>
          </div>
          <div className="products-grid">
            {categoryData.products.map((pro: ProductType, index: number) => {
              const { _id, title, slug, images, price, productQuantity = 1 } = pro;
              const inCart = isProductInCart(_id);
              return (
                <div key={index} className="product">
                  <Link href={`/product/${slug}`}>
                    <div className="product-img">
                      <Image
                        src={`${images[0]}`}
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
                      <p className="title">{title}</p>
                      <p className="rating">
                        <FaStar />
                        <FaStar />
                        <FaStar /> <FaStarHalfAlt />
                        <FaStarHalfAlt />
                      </p>
                    </div>
                  </Link>
                  <div className="addcart">
                    <p className="price">TK. {price}</p>
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
                              title,
                              slug,
                              images,
                              productQuantity,
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
          </div>
        </div>
      ))}
    </>
  );
};

export default HomePageProducts;
