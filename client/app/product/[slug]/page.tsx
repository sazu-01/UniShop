"use client";

import { api } from "@/app/utili/axiosConfig";
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
        const response = await api.get(`/products/${slug}`);
        setSingleProduct(response.data?.payload?.singleProduct);
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

  const { _id, title, price, brand, category, images, quantity } =
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
            <div className="brand">brand : {brand}</div>
            <p>
              see more : <Link href={`/`}>{category?.slug}</Link>
            </p>
            <p>in stock : {quantity}</p>
            <div className="star">
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <div className="price">price: ${price}</div>
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
                  quantity,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
