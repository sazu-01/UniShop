"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Images from "@/app/components/Images";
import { useParams } from "next/navigation";
import AddToCart from "@/app/components/AddToCartButton";
import { singleProductType } from "@/app/types/productTypes";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { useAppSelector } from "@/app/lib/hook";
import React from "react";
import Quantity from "@/app/components/Quantity";

import "@/css/SingleProduct.css";
import Skeleton from "@/app/components/Skeleton";

export default function Slug() {
  const { slug } = useParams();

  const [SingleProduct, setSingleProduct] = useState<singleProductType | null>(
    null
  );
  const [productInCart, setProductInCart] = useState(false);

  const { cart } = useAppSelector((state) => state.cart);
  const { productQuantity } = useAppSelector((state) => state.productQuantity);

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/${slug}`);
        const data = await res.json();
        setSingleProduct(data?.payload?.singleProduct);
      } catch (error: any) {
        console.log(error.response?.data?.message);
      }
    };

    fetchSingleProduct();
  }, [slug]);

  useEffect(() => {
    if (SingleProduct) {
      const isProductInCart = cart.some(
        (item) => item._id === SingleProduct._id
      );
      setProductInCart(isProductInCart);
    }
  }, [SingleProduct, cart]);

  if (!SingleProduct) {
    return (
      <div id="single-product-page">
        <div className="single-product">
          <Skeleton width="45rem" height="30rem" className="skeleton-image" />
          <div className="single-product-details">
            <Skeleton width="60%" height="2.8rem" className="" />
            <Skeleton width="40%" height="1.6rem" className="mt-5" />
            <Skeleton width="50%" height="1.6rem" className="mt-5" />
            <Skeleton width="30%" height="1.6rem" className="mt-5" />
            <Skeleton width="75%" height="3rem" className="mt-5" />
          </div>
        </div>
      </div>
    );
  }

  const { _id, title, price, category, images } =
    SingleProduct;

  return (
    <>
      <div id="single-product-page">
        <div className="single-product">
          {/*component for images*/}
          <Images imgs={images} />

          {/*render single product details */}
          <div className="single-product-details">
            <p className="title">{title}</p>
            <p className="category">
              see more : <Link href={`/${category?.slug}`}>{category?.slug}</Link>
            </p>
            <div className="star">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <div className="price"><b>TK. {price}</b></div>
            {/*Quantity component for select quantity of product*/}
            <Quantity />
            <div className="single-product-button">
              {/*AddToCart component for add product in cart*/}
              <AddToCart
                productInCart={productInCart}
                data={{
                  _id,
                  price,
                  productQuantity,
                  title,
                  slug,
                  images,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
