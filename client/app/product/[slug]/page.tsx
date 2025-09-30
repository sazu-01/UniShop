

import { Metadata } from 'next';
import ProductClient from "./ProductClient";
import { singleProductType } from '@/app/types/productTypes';
import Skeleton from '@/app/components/Skeleton';

// Helper function to fetch product (reusable)
async function fetchProduct(slug: string): Promise<singleProductType | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/products/${slug}`,
      {
         next: { revalidate: 3600 }, // refresh in 1 hour
      }
    );
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();
    return data?.payload?.singleProduct || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}



// This is a server component that handles metadata
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  try {
    // Await the params since it's now a Promise in Next.js 15
    const resolvedParams = await params;
    const product = await fetchProduct(resolvedParams.slug);
    
    if (!product) {
      return {
        title: 'Product Not Found - Pacyfic',
        description: 'The requested product could not be found.',
      };
    }
    
    return {
      title: `${product.title} - Pacyfic`,
      description: `Buy ${product.title} at the best price. ${product.category?.name || 'Quality clothing'} from Pacyfic - Best Clothing Shop in Bangladesh.`,
      openGraph: {
        title: product.title,
        description: `Buy ${product.title} at the best price`,
        images: product.images?.[0]?.url ? [product.images[0].url[0]] : [],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      title: 'Product - Pacyfic',
      description: 'Quality clothing from Pacyfic - Best Clothing Shop in Bangladesh.',
    };
  }
}

export default async function ProductPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // Await the params since it's now a Promise in Next.js 15
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // Fetch product data on server-side
  const product = await fetchProduct(slug);

    if (!product) {
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

  return <ProductClient product={product} />;
}

