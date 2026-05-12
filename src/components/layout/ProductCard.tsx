"use client";

import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useCartStore } from "@/store/cart-store";
import { resolveImageUrl } from "@/lib/api";
import type { ApiProduct } from "@/types/api";

interface ProductCardProps {
  product: ApiProduct;
}

const fallbackImage =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop";

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const defaultVariant = product.Variants?.[0] ?? null;
  const price = defaultVariant?.SellingPrice ?? null;
  const image = resolveImageUrl(defaultVariant?.Images?.[0]) || fallbackImage;
  const inStock = defaultVariant ? defaultVariant.Stock > 0 : false;
  const hasPrice = price !== null;

  const handleAdd = () => {
    if (!defaultVariant || !hasPrice) {
      toast.error("This product is unavailable.");
      return;
    }
    addItem({
      productCode: product.ProductCode,
      variantId: defaultVariant.VariantId,
      name: product.ProductName,
      sku: defaultVariant.SKU,
      price: defaultVariant.SellingPrice,
      image,
      color: defaultVariant.Color,
      size: defaultVariant.Size,
    });
    toast.success(`${product.ProductName} added to bag`);
  };

  return (
    <div className="group relative flex flex-col h-full overflow-hidden rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/70 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <Link
        href={`/product-details/${product.ProductCode}`}
        className="relative block"
      >
        <div className="relative w-60 h-80 mx-auto  overflow-hidden bg-zinc-50 dark:bg-zinc-800">
          <Image
            src={image}
            alt={product.ProductName}
            fill
            className="object-cover  transition-transform duration-500 group-hover:scale-110 "
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* Floating wishlist button on hover */}
          <button
            type="button"
            aria-label="Add to wishlist"
            onClick={(e) => e.preventDefault()}
            className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur text-zinc-700 dark:text-zinc-200 shadow-md opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:text-brand-primary"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <Link
          href={`/product-details/${product.ProductCode}`}
          className="block"
        >
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-white line-clamp-2 min-h-10 group-hover:text-brand-primary transition-colors">
            {product.ProductName}
          </h3>
        </Link>

        {/* Variant meta */}
        {(defaultVariant?.Color || defaultVariant?.Size) && (
          <div className="mt-2 flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400">
            {defaultVariant?.Color && (
              <span className="inline-flex items-center gap-1.5">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full border border-zinc-200 dark:border-zinc-700"
                  style={{ backgroundColor: defaultVariant.Color }}
                  aria-hidden
                />
                <span className="uppercase tracking-wide">
                  {defaultVariant.Color}
                </span>
              </span>
            )}
            {defaultVariant?.Color && defaultVariant?.Size && (
              <span className="text-zinc-300">·</span>
            )}
            {defaultVariant?.Size && (
              <span className="uppercase tracking-wide">
                Size {defaultVariant.Size}
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-2">
          {hasPrice ? (
            <span className="text-lg font-bold text-brand-primary">
              ৳{price}
            </span>
          ) : (
            <span className="text-sm text-zinc-500">Price unavailable</span>
          )}
        </div>

        {/* CTA */}
        <Button
          onClick={handleAdd}
          disabled={!hasPrice || !inStock}
          className="mt-4 w-full h-10 rounded-full bg-brand-primary hover:bg-brand-primary-hover text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:hover:shadow-sm capitalize"
        >
          <ShoppingBag className="w-4 h-4 mr-1.5" />
          {inStock ? "Add to Cart" : "Out of stock"}
        </Button>
      </div>
    </div>
  );
}
