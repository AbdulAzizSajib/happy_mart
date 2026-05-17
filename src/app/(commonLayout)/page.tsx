import { DynamicHeroBanner } from "@/components/layout/DynamicHeroBanner";
import { CategoryCarousel } from "@/components/layout/CategoryCarousel";
import { Features } from "@/components/layout/Features";
import { HomeProducts } from "@/components/layout/HomeProducts";

// Category data with Unsplash images
const categories = [
  {
    id: 1,
    name: "Food",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    href: "/category/food",
  },
  {
    id: 2,
    name: "Baby Food & Care",
    image:
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop",
    href: "/category/baby-food-care",
  },
  {
    id: 3,
    name: "Home Cleaning",
    image:
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=400&fit=crop",
    href: "/category/home-cleaning",
  },
  {
    id: 4,
    name: "Pet Care",
    image:
      "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=400&fit=crop",
    href: "/category/pet-care",
  },
  {
    id: 5,
    name: "Beauty & Health",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop",
    href: "/category/beauty-health",
  },
  {
    id: 6,
    name: "Fashion & Lifestyle",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=400&fit=crop",
    href: "/category/fashion-lifestyle",
  },
  {
    id: 7,
    name: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    href: "/category/home-kitchen",
  },
  {
    id: 8,
    name: "Stationeries",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=400&fit=crop",
    href: "/category/stationeries",
  },
  {
    id: 9,
    name: "Toys & Sports",
    image:
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=400&fit=crop",
    href: "/category/toys-sports",
  },
  {
    id: 10,
    name: "Gadget",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    href: "/category/gadget",
  },
  {
    id: 11,
    name: "Medicine",
    image:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop",
    href: "/category/medicine",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      {/* Full-width hero, edge-to-edge */}
      <DynamicHeroBanner />

      {/* Full-width category carousel, edge-to-edge */}
      {/* <section className="mt-3">
        <CategoryCarousel categories={categories} />
      </section> */}

      <div className="container mx-auto px-4">
        {/* Features Section */}
        <section className="mt-8">
          <Features />
        </section>
        {/* Products from API via Zustand store */}
        <HomeProducts />
        <section>{/* Additional content can go here */}</section>
      </div>
    </div>
  );
}
