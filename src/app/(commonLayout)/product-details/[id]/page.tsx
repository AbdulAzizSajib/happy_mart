import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/layout/ProductCard";
import {
  Minus,
  Plus,
  Heart,
  Share2,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
} from "lucide-react";

// Static product data
const product = {
  id: 1,
  name: "Fresh Hilsha Fish (Padma) - Premium Quality",
  image:
    "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&h=500",
  images: [
    "https://picsum.photos/seed/hilsha/600/600",
    "https://picsum.photos/seed/hilsha2/600/600",
    "https://picsum.photos/seed/hilsha3/600/600",
  ],
  price: 1200,
  originalPrice: 1500,
  discount: 300,
  unit: "per kg",
  minOrder: 1,
  deliveryTime: "Today in 2 hours",
  category: "Fish & Seafood",
  sku: "FSH-HLS-001",
  stock: 25,
  rating: 4.5,
  reviewCount: 128,
  description:
    "Premium quality Hilsha fish sourced directly from the Padma river. Known for its rich, oily texture and distinctive taste, this is the king of fish in Bengali cuisine. Perfect for traditional preparations like Shorshe Ilish or simply fried with minimal spices.",
  specifications: [
    { label: "Weight", value: "800g - 1kg per piece" },
    { label: "Origin", value: "Padma River, Bangladesh" },
    { label: "Type", value: "Fresh, Whole Fish" },
    { label: "Storage", value: "Keep refrigerated at 0-4°C" },
    { label: "Shelf Life", value: "2-3 days when refrigerated" },
  ],
};

// Static reviews data
const reviews = [
  {
    id: 1,
    name: "Rahim Ahmed",
    avatar: "https://picsum.photos/seed/user1/100/100",
    rating: 5,
    date: "2 days ago",
    comment:
      "Excellent quality fish! Very fresh and the taste was amazing. Will definitely order again.",
    helpful: 12,
  },
  {
    id: 2,
    name: "Fatima Begum",
    avatar: "https://picsum.photos/seed/user2/100/100",
    rating: 4,
    date: "1 week ago",
    comment:
      "Good quality hilsha. Delivery was on time. The fish was fresh but slightly smaller than expected.",
    helpful: 8,
  },
  {
    id: 3,
    name: "Karim Uddin",
    avatar: "https://picsum.photos/seed/user3/100/100",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Best hilsha I have bought online. Properly cleaned and packed. Highly recommended!",
    helpful: 15,
  },
];

// Static similar products data
const similarProducts = [
  {
    id: 2,
    name: "Rohu Fish - Fresh Cut",
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop",
    price: 350,
    originalPrice: 400,
    discount: 50,
    deliveryTime: "Today",
    unit: "per kg",
    minOrder: 1,
  },
  {
    id: 3,
    name: "Katla Fish - Whole",
    image: "https://picsum.photos/seed/katla/400/400",
    price: 380,
    originalPrice: null,
    discount: null,
    deliveryTime: "Today",
    unit: "per kg",
    minOrder: 1,
  },
  {
    id: 4,
    name: "Tilapia Fish - Fresh",
    image: "https://picsum.photos/seed/tilapia/400/400",
    price: 280,
    originalPrice: 320,
    discount: 40,
    deliveryTime: "Tomorrow",
    unit: "per kg",
    minOrder: 2,
  },
  {
    id: 5,
    name: "Pangash Fish - Cut Pieces",
    image: "https://picsum.photos/seed/pangash/400/400",
    price: 300,
    originalPrice: null,
    discount: null,
    deliveryTime: "Today",
    unit: "per kg",
    minOrder: 1,
  },
];

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log("Product ID:", id);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400 mb-6 md:mb-8">
          <Link href="/" className="hover:text-red-600 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/" className="hover:text-red-600 transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-zinc-900 dark:text-white">{product.name}</span>
        </nav>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8 md:mb-12 lg:mb-16">
          {/* Image Gallery */}
          <div className="space-y-4 lg:col-span-1 mb-6 lg:mb-0">
            <div className="relative w-full max-w-sm mx-auto aspect-square rounded-xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-4">
              {product.discount && (
                <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-lg">
                  ৳{product.discount} OFF
                </div>
              )}
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Thumbnail Gallery */}
            {/* <div className="grid grid-cols-3 gap-2 lg:gap-3">
              {product.images.map((img, index) => (
                <div
                  key={index}
                  className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all hover:scale-105 ${
                    index === 0
                      ? "border-red-600"
                      : "border-zinc-200 dark:border-zinc-800 hover:border-red-400"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} - ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, (max-width: 1024px) 20vw, 12vw"
                  />
                </div>
              ))}
            </div> */}
          </div>

          {/* Product Details Part 01 */}
          <div className="space-y-6 lg:col-span-1 mb-6 lg:mb-0 px-2 sm:px-0">
            <div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
                SKU: {product.sku}
              </p>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-white mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-zinc-300 dark:text-zinc-600"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {product.rating}
                </span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-red-600">
                  ৳{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg sm:text-xl text-zinc-400 line-through">
                    ৳{product.originalPrice}
                  </span>
                )}
                <span className="text-sm text-zinc-500 dark:text-zinc-400">
                  {product.unit}
                </span>
              </div>
              {product.discount && (
                <p className="text-sm text-green-600 font-medium">
                  You save ৳{product.discount} on this order!
                </p>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-600 font-medium">
                In Stock ({product.stock} available)
              </span>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Quantity:
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-zinc-300 dark:border-zinc-700 rounded-lg">
                  <button className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rounded-l-lg">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-6 py-2 font-medium text-zinc-900 dark:text-white">
                    1
                  </span>
                  <button className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors rounded-r-lg">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {product.minOrder && (
                  <span className="text-sm text-zinc-500 dark:text-zinc-400">
                    Min. order: {product.minOrder} {product.unit}
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-full py-5 sm:py-6 text-base sm:text-lg font-semibold transition-all hover:scale-105">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Bag
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 sm:w-14 sm:h-14 border-zinc-300 dark:border-zinc-700 hover:border-red-600 hover:text-red-600 transition-all"
              >
                <Heart className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 sm:w-14 sm:h-14 border-zinc-300 dark:border-zinc-700 hover:border-red-600 hover:text-red-600 transition-all"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Delivery Info */}
            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl p-4 md:p-5 mt-4">
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-medium text-green-700 dark:text-green-400">
                    Express Delivery Available
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-500">
                    Get it {product.deliveryTime}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Part 02 - Specifications & Guarantees */}
          <div className="space-y-6 lg:col-span-1 px-2 sm:px-0">
            {/* Guarantees */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 md:p-6 lg:p-7 space-y-4">
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                Shwapno Guarantee
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-white text-sm">
                      100% Fresh Guarantee
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Quality checked before delivery
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                    <RotateCcw className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-white text-sm">
                      Easy Returns
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Not satisfied? Get full refund
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                    <Truck className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-white text-sm">
                      Fast Delivery
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Free delivery over ৳500
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 md:p-6 lg:p-7">
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">
                Specifications
              </h3>
              <div className="space-y-3">
                {product.specifications.map((spec, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-0"
                  >
                    <span className="text-zinc-500 dark:text-zinc-400">
                      {spec.label}
                    </span>
                    <span className="font-medium text-zinc-900 dark:text-white">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 md:p-6 lg:p-7">
              <h3 className="font-semibold text-zinc-900 dark:text-white mb-3">
                Description
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 md:p-6 lg:p-8 mb-8 md:mb-12 lg:mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              Customer Reviews ({product.reviewCount})
            </h2>
            <Button variant="outline" className="rounded-full">
              Write a Review
            </Button>
          </div>

          {/* Rating Summary */}
          <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-6 md:pb-8 border-b border-zinc-200 dark:border-zinc-800">
            <div className="text-center">
              <p className="text-5xl font-bold text-zinc-900 dark:text-white">
                {product.rating}
              </p>
              <div className="flex items-center justify-center my-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-zinc-300 dark:text-zinc-600"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Based on {product.reviewCount} reviews
              </p>
            </div>
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="text-sm text-zinc-600 dark:text-zinc-400 w-3">
                    {star}
                  </span>
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <div className="flex-1 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 rounded-full"
                      style={{
                        width: `${star === 5 ? 65 : star === 4 ? 25 : star === 3 ? 7 : star === 2 ? 2 : 1}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-zinc-500 dark:text-zinc-400 w-10">
                    {star === 5
                      ? "65%"
                      : star === 4
                        ? "25%"
                        : star === 3
                          ? "7%"
                          : star === 2
                            ? "2%"
                            : "1%"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Review List */}
          <div className="space-y-6 md:space-y-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="pb-6 border-b border-zinc-200 dark:border-zinc-800 last:border-0"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-700 flex-shrink-0">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      width={48}
                      height={48}
                      className="object-cover rounded-full"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-zinc-900 dark:text-white">
                        {review.name}
                      </h4>
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        {review.date}
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-zinc-300 dark:text-zinc-600"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                      {review.comment}
                    </p>
                    <button className="text-sm text-zinc-500 hover:text-red-600 transition-colors">
                      Helpful ({review.helpful})
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 md:mt-8 text-center">
            <Button variant="outline" className="rounded-full">
              Load More Reviews
            </Button>
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center justify-between mb-6 md:mb-8 px-2 sm:px-0">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              Similar Products
            </h2>
            <Link
              href="/"
              className="text-red-600 hover:text-red-700 font-medium text-sm flex items-center gap-1"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {similarProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
