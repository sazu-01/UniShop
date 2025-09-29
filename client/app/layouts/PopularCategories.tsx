
import Link from 'next/link';
import "@/css/PopularCategories.css"
import { Category } from '../types/SliceTypes';
import Skeleton from '../components/Skeleton';

// Server-side data fetching function
async function getCategories(): Promise<Category[]> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/categories/all-category`, {
         next: { revalidate: 3600 } //refresh in every 1 hour 
        });
        
        if (!res.ok) {
            throw new Error('Failed to fetch categories');
        }
        
        const data = await res.json();
        return data.payload.categories;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

// Function to get image path based on category slug
const getCategoryImage = (slug: string): string => {
    const imageMap: Record<string, string> = {
        'saree': '/sharee.jpg',
        'mens-panjabi': '/punjabi.png',
        'mens-shirt': '/shirt.png',
        'three-piece': '/three-piece.jpg',
        'mens-t-shirt': '/mens-t-shirt.png',
        'girls-t-shirt': '/girls-t-shirt.jpg',
        'super-store': '/superstore.jpg',
        'kids': '/kids.jpg',
        'two-piece': '/two-piece.jpg',
        'borka': '/borka.jpg',
        'lehenga-and-party-dress': '/lehenga.jpeg'
    };
    return imageMap[slug] || '/default-category.jpg';
};

// Convert to async server component
const PopularCategories = async () => {
    const categories = await getCategories();
    
    
 if (!categories) {
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
    return (

        <div id='popular-categories'>
            <div className='popular-categories-content'>
                <div className='categories'>
                    <h2>Popular Categories</h2>
                    <div className='categories-grid'>
                        {categories
                            .filter((category: Category) => category.popular)
                            .map((category: Category) => (
                                <Link
                                    key={category._id}
                                    href={`/${category.slug}`}
                                    className='category'
                                    prefetch
                                >
                                    <img
                                        src={getCategoryImage(category.slug)}
                                        alt={category.name}
                                    />
                                    <p>{category.name}</p>
                                </Link>
                            ))
                        }
                    </div>
                </div>
                <Link href='/all-categories'>See All Categories</Link>
            </div>
        </div>

    );
};

export default PopularCategories;