

import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.CLIENT_URL || "https://example.com";

  try {
    // Fetch categories
    const catRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/all-category`, {
      next: { revalidate: 60 }, // cache for 1 min
    });
    const catData = await catRes.json();
    const categories: { slug: string; updatedAt?: string }[] =
      catData?.payload?.categories || [];

    // Fetch products
    const prodRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/all-product`, {
      next: { revalidate: 60 },
    });
    const prodData = await prodRes.json();
    const products: { slug: string; updatedAt?: string }[] =
      prodData?.payload?.products || [];

    // Category URLs
    const categoryUrls: MetadataRoute.Sitemap = categories.map((cat) => ({
      url: `${baseUrl}/categories/${cat.slug}`,
      lastModified: cat.updatedAt ? new Date(cat.updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    // Product URLs
    const productUrls: MetadataRoute.Sitemap = products.map((prod) => ({
      url: `${baseUrl}/products/${prod.slug}`,
      lastModified: prod.updatedAt ? new Date(prod.updatedAt) : new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    // Combine all
    return [
      {
        url: `${baseUrl}/`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      ...categoryUrls,
      ...productUrls,
    ];
  } catch (error) {
    console.error("Sitemap generation failed:", error);

    // Fallback (just homepage)
    return [
      {
        url: `${baseUrl}/`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
    ];
  }
}
