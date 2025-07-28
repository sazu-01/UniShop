

import { Metadata } from 'next';
import ProductClient from "./ProductClient";

// This is a server component that handles metadata
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  try {
    // Await the params since it's now a Promise in Next.js 15
    const resolvedParams = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/${resolvedParams.slug}`);
    const data = await res.json();
    const product = data?.payload?.singleProduct;
    
    if (!product) {
      return {
        title: 'Product Not Found - Unishop',
        description: 'The requested product could not be found.',
      };
    }
    
    return {
      title: `${product.title} - Unishop`,
      description: `Buy ${product.title} at the best price. ${product.category?.name || 'Quality clothing'} from Unishop - Best Clothing Shop in Bangladesh.`,
      openGraph: {
        title: product.title,
        description: `Buy ${product.title} at the best price`,
        images: product.images?.[0] ? [product.images[0]] : [],
      },
    };
  } catch (error) {
    console.log(error);
    return {
      title: 'Product - Unishop',
      description: 'Quality clothing from Unishop - Best Clothing Shop in Bangladesh.',
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
  return <ProductClient slug={resolvedParams.slug} />;
}