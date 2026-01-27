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
    name: "Coffee",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop",
    href: "/category/coffee",
  },
  {
    id: 2,
    name: "Ice Cream",
    image:
      "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=400&fit=crop",
    href: "/category/ice-cream",
  },
  {
    id: 3,
    name: "Noodles",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=400&fit=crop",
    href: "/category/noodles",
  },
  {
    id: 4,
    name: "Biscuits",
    image:
      "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop",
    href: "/category/biscuits",
  },
  {
    id: 5,
    name: "Candy & Chocolate",
    image:
      "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400&h=400&fit=crop",
    href: "/category/candy-chocolate",
  },
  {
    id: 6,
    name: "Dairy",
    image:
      "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400&h=400&fit=crop",
    href: "/category/dairy",
  },
  {
    id: 7,
    name: "Beverages",
    image:
      "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&h=400&fit=crop",
    href: "/category/beverages",
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
