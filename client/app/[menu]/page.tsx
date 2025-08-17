
import Link from "next/link";
import Image from "next/image";
import { ProductType } from "../types/SliceTypes";
import SSRReduxWrapper from "../components/SSRReduxWrapper";


// Server-side data fetching function
async function getCategoryProducts(categorySlug: string): Promise<ProductType[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/products/all-product`,
    {
      cache: "no-store", // ensures fresh data each request
    }
  );
  
  if (res.ok) {

    const allData = await res.json();
    const allProducts: ProductType[] = allData.payload.products;
    
    // Filter products by category slug on server-side
    return allProducts.filter((product) => product.category.slug === categorySlug);
  }
  
  const data = await res.json();
  return data.payload.products || [];
}

// Server Component for category page
export default async function CategoryPage({ params }: { params: Promise<{ menu: string }> }) {
  const resolvedParams = await params;
  const categorySlug =  resolvedParams.menu;
  const products = await getCategoryProducts(categorySlug);

  if (products.length === 0) {
    return (
      <div className="no-products-container">
        <div className="no-products-message">
          <p>No products found under {categorySlug} category</p>
        </div>
      </div>
    );
  }

  
  return (
    <SSRReduxWrapper products={products}>
    <div id="category-page">
      <div className="category-page-container">
        <div className="category-page-products">
          {products.map((product, index) => {
            const { slug, images, title, salePrice, _id } = product;
            const placeholder = "/placeholder.jpg";
            
            return (
              <div key={_id} className="product-card">
                <Link href={`/product/${slug}`}>
                  <div className="product-image-wrapper">
                    <Image
                      width={500}
                      height={500}
                      priority={index === 0}
                      className="product-image"
                      src={
                        Array.isArray(images) &&
                        images.length > 0 &&
                        Array.isArray(images[0].url) &&
                        images[0].url.length > 0
                          ? images[0].url[0]
                          : placeholder
                      }
                      alt={title}
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  </div>
                </Link>
                <div className="product-content">
                  <Link href={`/product/${slug}`}>
                    <h3 className="product-title">
                      {title.length > 40 ? title.slice(0, 40) + "..." : title}
                    </h3>
                  </Link>
                  <p className="product-price">Tk. {salePrice}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
    </SSRReduxWrapper>
  );
}