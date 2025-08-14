
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Images from "@/app/components/Images";
import AddToCart from "@/app/components/AddToCartButton";
import { singleProductType } from "@/app/types/productTypes";
import { useAppSelector } from "@/app/lib/hook";
import React from "react";
import Quantity from "@/app/components/Quantity";
import "@/css/SingleProduct.css";
import Skeleton from "@/app/components/Skeleton";
import Specification from "@/app/components/Specification";

interface ProductClientProps {
  slug: string;
}

export default function ProductClient({ slug }: ProductClientProps) {


  const [SingleProduct, setSingleProduct] = useState<singleProductType | null>(
    null
  );
  const [productInCart, setProductInCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);

  const { cart } = useAppSelector((state) => state.cart);
  const { productQuantity } = useAppSelector((state) => state.productQuantity);
  const { user } = useAppSelector((state) => state.auth);


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
  }, [SingleProduct, cart, selectedSize]);


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

  const { _id, title, discountPrice, category, images, suplr, size, specification, pId, ytLink } =
    SingleProduct;

  const hasSize = size && size.length > 0;
  const hasColor = images && images.length > 1 && images.some(img => img.color && img.color.trim() !== "");


  const getEmbedLink = (link: string) => {
    const match = link.match(/(?:youtu\.be\/|v=)([a-zA-Z0-9_-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}?rel=0` : link;
  };


  return (
    <>
      <div id="single-product-page">
        <div className="single-product">


          <Images
            images={images}
            selectedColor={images[selectedColorIndex]?.color}
          />

          {/*render single product details */}
          <div className="single-product-details">
            <p className="title">{title}</p>
            <p className="category">
              see more : <Link href={`/${category?.slug}`}>{category?.slug}</Link>
            </p>
            {user?.isAdmin && <p className="supplier">supplier: {suplr}</p>}
            {SingleProduct?.pId && <p>Product Id: {pId}</p>}

            {hasColor && (
              <div className="color-selection mt-3">
                <p className="size-label">
                  Select Color: {images[selectedColorIndex]?.color || "Default"}
                </p>
                <div className="d-flex flex-row gap-2 flex-wrap">
                  {images.map((imgSet, index) => (
                    <div
                      key={index}
                      className={`color-image-option ${selectedColorIndex === index ? 'selected-color-image' : ''}`}
                      onClick={() => setSelectedColorIndex(index)}
                      style={{ cursor: 'pointer' }}
                    >
                      <Image
                        width={60}
                        height={60}
                        src={imgSet.url[0]}
                        alt={imgSet.color || `Option ${index + 1}`}
                        style={{
                          objectFit: "cover",
                          borderRadius: "8px",
                          border: selectedColorIndex === index
                            ? "3px solid #007bff"
                            : "2px solid #ddd",
                          transition: "all 0.3s ease"
                        }}
                        title={imgSet.color || `Option ${index + 1}`}
                      />
                      {imgSet.color && (
                        <p
                          style={{
                            fontSize: "12px",
                            textAlign: "center",
                            margin: "4px 0 0 0",
                            color: selectedColorIndex === index ? "#007bff" : "#666"
                          }}
                        >
                          {imgSet.color}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}


            {/* Size Selection */}
            {hasSize && (
              <div className="size-selection">
                <p className="size-label">Select Size:</p>
                <div className="d-flex flex-row">
                  {size.map((s, i) => (
                    <button
                      key={i}
                      className={`size-option border ${selectedSize === s
                        ? 'selected-size'
                        : 'bg-light'
                        }`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>

              </div>
            )}
            <div className="price"><b>TK. {discountPrice}
            </b></div>
            {/*Quantity component for select quantity of product*/}
            <Quantity />
            <div className="single-product-button">
              {/*AddToCart component for add product in cart*/}
              <AddToCart
                productInCart={productInCart}
                hasSize={hasSize}
                selectedSize={selectedSize}
                data={{
                  _id,
                  discountPrice,
                  productQuantity,
                  title,
                  slug,
                  images,
                  size,
                }}
              />
            </div>

          </div>


          <Specification specification={specification} />
        </div>

        <div className="ratio ratio-16x9 mb-4">
          {ytLink && (
            <iframe
              src={getEmbedLink(ytLink)}
              width="560"
              height="315"
              allowFullScreen
              title="YouTube video player"
              frameBorder="0"
            />
          )}
        </div>
      </div>
    </>
  );
}