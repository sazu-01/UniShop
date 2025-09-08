

import HomePageProducts from "./components/HomePageProducts";
import HomeCarousel  from "./layouts/HomeCarousel";
import PopularCategories from "./layouts/PopularCategories";
import { ProductType } from "./types/SliceTypes";

async function getProducts(): Promise<ProductType[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/all-product`, {
    cache: "no-store", // ensures fresh data each request
  });
  const data = await res.json();
  return data.payload.products;
}

export default async function Home() {

  const products = await getProducts();
  return (
    <>
   <HomeCarousel  /> 
   <PopularCategories />
   <HomePageProducts products={products} />
    </>

  );
}
