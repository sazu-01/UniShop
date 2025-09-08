

import HomePageProducts from "./components/HomePageProducts";
import HomeCarousel  from "./layouts/HomeCarousel";
import PopularCategories from "./layouts/PopularCategories";
import { ProductType } from "./types/SliceTypes";

interface MediaItem {
  carouselImages: string[];
}

async function getProducts(): Promise<ProductType[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/all-product`, {
    cache: "no-store", // ensures fresh data each request
  });
  const data = await res.json();
  return data.payload.products;
}

async function getMedia() : Promise<MediaItem[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/media/all-media`,{
    cache : "no-store"
  });
  const data = await res.json();
  return data.payload.allMedia;
}

export default async function Home() {

  const products = await getProducts();
  const media = await getMedia();

  return (
    <>
   <HomeCarousel media={media} /> 
   <PopularCategories />
   <HomePageProducts products={products} />
    </>

  );
}
