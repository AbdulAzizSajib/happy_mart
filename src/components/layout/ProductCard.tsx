import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    image: string;
    price: number;
    originalPrice?: number | null;
    discount?: number | null;
    deliveryTime: string;
    unit: string;
    minOrder?: number | null;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="relative bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-lg transition-shadow group">
      {/* Discount Badge - Ribbon Style */}
      {product.discount && (
        <div
          className="absolute top-0 left-3 z-10 bg-red-600 text-white text-[11px] font-bold leading-tight px-2 pt-1.5 pb-3 text-center"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)",
          }}
        >
          ৳{product.discount}
          <br />
          OFF
        </div>
      )}

      {/* Product Image */}
      <Link href={`/product-details/${product.id}`}>
        <div className="relative aspect-square overflow-hidden bg-white dark:bg-zinc-800">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-3 group-hover:scale-105 transition-transform duration-300 rounded-3xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>

      {/* Product Details */}
      <div className="p-4 text-center">
        {/* Delivery Time */}
        <p className="text-xs text-zinc-500 dark:text-zinc-400 italic mb-2">
          Delivery {product.deliveryTime}
        </p>

        {/* Product Name */}
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3 line-clamp-2 min-h-10">
          {product.name}
        </h3>

        {/* Price Section */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {product.originalPrice && (
            <span className="text-sm text-zinc-400 line-through">
              ৳{product.originalPrice}
            </span>
          )}
          <span className="text-lg font-bold text-red-600">
            ৳{product.price}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-400">
            {product.unit}
          </span>
          {product.minOrder && (
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              (Min. {product.minOrder})
            </span>
          )}
        </div>

        {/* Add to Bag Button */}
        <Button className="w-full bg-red-600 hover:bg-red-700 text-white rounded-full">
          <Plus className="w-4 h-4 mr-1" />
          Add to Bag
        </Button>
      </div>
    </div>
  );
}
