
import { Suspense } from "react";
import FeaturedProduct from "./layouts/FeaturedProduct";
import FlashSale from "./layouts/FlashSale";
import HomeCarousel from "./layouts/HomeCarousel";
import PopularCategories from "./layouts/PopularCategories";
import Skeleton from "./components/Skeleton";
import { ProductType } from "./types/SliceTypes";

interface MediaItem {
  carouselImages: string[];
}

async function getProducts(): Promise<ProductType[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/all-product`, {
    next: {revalidate: 600}, // 5 min  
  });
  const data = await res.json();
  return data.payload.products;
}

async function getMedia() : Promise<MediaItem[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/media/all-media`,{
      next: {revalidate: 600}, //5 min 
  });
  const data = await res.json();
  return data.payload.allMedia;
}


export default function Home() {
  return (
    <>
      <Suspense fallback={<Skeleton width="100%" height="400px" className="container mt-5"  />}>
        <HomeCarouselWrapper />
      </Suspense>

      <PopularCategories />

      <Suspense fallback={<Skeleton width="100%" height="400px" className="container mb-5" />}>
        <FeaturedProductWrapper />
      </Suspense>

      <Suspense fallback={<Skeleton width="100%" height="400px" className="container mb-5" />}>
        <FlashSaleWrapper />
      </Suspense>
    </>
  );
}

// Wrappers fetch their own data
async function HomeCarouselWrapper() {
  const media = await getMedia();
  return <HomeCarousel media={media} />;
}

async function FeaturedProductWrapper() {
  const products = await getProducts();
  return <FeaturedProduct products={products} />;
}

async function FlashSaleWrapper() {
  const products = await getProducts();
  return <FlashSale products={products} />;
}
