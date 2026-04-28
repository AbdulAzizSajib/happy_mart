import { HeroBanner } from "@/components/layout/HeroBanner";
import { CategoryCarousel } from "@/components/layout/CategoryCarousel";
import { Features } from "@/components/layout/Features";
import { ProductCarousel } from "@/components/layout/ProductCarousel";
import productsData from "@/data/products.json";

// Banner data with Unsplash images
const bannerSlides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=1600&h=500&fit=crop",
    alt: "Grocery shopping deals",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&h=500&fit=crop",
    alt: "Fresh vegetables and fruits",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=1600&h=500&fit=crop",
    alt: "Special offers on groceries",
  },
];

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
      <div className="container mx-auto px-4 ">
        {/* Main Hero Section with Sidebar */}
        <div className="flex gap-4">
          {/* Hero Banner */}
          <div className="flex-1">
            <HeroBanner slides={bannerSlides} />
          </div>
        </div>
        {/* Category Carousel */}
        <section className="mt-3">
          <CategoryCarousel categories={categories} />
        </section>
        {/* Features Section */}
        <section className="mt-8">
          <Features />
        </section>
        {/* Recommended Products */}
        <section>
          <ProductCarousel
            title="RECOMMENDED FOR YOU"
            products={productsData}
          />
        </section>
        {/* Recommended Products */}
        <section>
          <ProductCarousel
            title="Hot & Trending Right Now 🔥"
            products={productsData}
          />
        </section>
        <section>{/* Additional content can go here */}</section>
      </div>
    </div>
  );
}
