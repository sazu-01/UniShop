
"use client";

import React from 'react';
import { useParams } from "next/navigation";
import { useAppSelector } from '../lib/hook';
import Skeleton from '../components/Skeleton';
import Link from 'next/link';
import Image from 'next/image';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

import "@/css/CategoryPageLayout.css"

export default function CategoryProductLayout() {

  const { menu } = useParams();
  
  
  const { products } = useAppSelector((state)=> state.products);

  const filterProduct = products?.filter((product)=> product.category.slug === menu);

 
  if(!products) {
   return <div className='m-5'>
   <Skeleton width='100%' height='2.6rem'  />
   <Skeleton width='100%' height='2.6rem'  />
   <Skeleton width='100%' height='2.6rem'  />
   <Skeleton width='100%' height='2.6rem'  />
   <Skeleton width='100%' height='2.6rem'  />
   <Skeleton width='100%' height='2.6rem'  />
  </div> 
  }

    if(filterProduct?.length === 0) {
      return (
         <div className="no-products-container">
         <div className="no-products-message">
           <p>No products found under {menu} category</p>
         </div>
       </div>
 
      );
    }
  
  
  return (
   <div id="category-page">
   <div className="category-page-container">
     <div className="category-page-products">
       {filterProduct?.map((product, index) => {
         const { slug, images, title, price } = product;
         return (
           <div key={index} className="product-card">
             <Link href={`/product/${slug}`}>
               <div className="product-image-wrapper">
                 <Image
                  width={500}
                  height={500}
                   className="product-image"
                   src={images[0]}
                   alt={title}
                 />
               </div>
             </Link>

             <div className="product-content">
               <Link href={`/product/${slug}`}>
                 <h3 className="product-title">
                   {title.length > 40 ? title.slice(0, 40) + "..." : title}
                 </h3>
               </Link>
               <div className="product-rating">
                 <AiFillStar />
                 <AiFillStar />
                 <AiFillStar />
                 <AiFillStar />
                 <AiOutlineStar />
               </div>
               <p className="product-price">Tk. {price}</p>
             </div>
           </div>
         );
       })}
     </div>
   </div>
 </div>

  )
}
