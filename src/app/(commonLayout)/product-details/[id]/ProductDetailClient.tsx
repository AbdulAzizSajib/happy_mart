"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Share2,
  Truck,
  HelpCircle,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { fetchProductDetail, resolveImageUrl } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import type { ApiProduct, Variant } from "@/types/api";

const fallbackImage =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&h=600&fit=crop";

interface Props {
  productCode: string;
}

const formatPrice = (n: number) =>
  `Tk ${n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

export function ProductDetailClient({ productCode }: Props) {
  const router = useRouter();
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    null,
  );
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    let cancelled = false;
    fetchProductDetail(productCode)
      .then((res) => {
        if (cancelled) return;
        setProduct(res.data);
        setSelectedVariantId(res.data.Variants?.[0]?.VariantId ?? null);
        setActiveImage(0);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to load product");
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [productCode]);

  const selectedVariant: Variant | null = useMemo(() => {
    if (!product) return null;
    return (
      product.Variants.find((v) => v.VariantId === selectedVariantId) ??
      product.Variants[0] ??
      null
    );
  }, [product, selectedVariantId]);

  const images = useMemo(() => {
    if (!selectedVariant) return [fallbackImage];
    const list = selectedVariant.Images?.map((p) => resolveImageUrl(p)) ?? [];
    return list.length > 0 ? list : [fallbackImage];
  }, [selectedVariant]);

  // Group by color: pick the first variant per color (used for color thumbnails)
  const colorOptions = useMemo(() => {
    if (!product) return [] as { color: string; variant: Variant }[];
    const seen = new Map<string, Variant>();
    for (const v of product.Variants) {
      if (v.Color && !seen.has(v.Color)) seen.set(v.Color, v);
    }
    return Array.from(seen, ([color, variant]) => ({ color, variant }));
  }, [product]);

  // All unique sizes across all variants (the order they first appear)
  const allSizes = useMemo(() => {
    if (!product) return [] as string[];
    const seen = new Set<string>();
    const list: string[] = [];
    for (const v of product.Variants) {
      if (v.Size && !seen.has(v.Size)) {
        seen.add(v.Size);
        list.push(v.Size);
      }
    }
    return list;
  }, [product]);

  // Variants that match the currently selected color
  const variantsForCurrentColor = useMemo(() => {
    if (!product || !selectedVariant) return product?.Variants ?? [];
    if (!selectedVariant.Color) return product.Variants;
    return product.Variants.filter((v) => v.Color === selectedVariant.Color);
  }, [product, selectedVariant]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-screen">
        <p className="text-sm text-zinc-500">Loading product…</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-screen">
        <p className="text-sm text-red-600">{error ?? "Product not found."}</p>
        <Link
          href="/"
          className="text-sm text-brand-primary underline mt-3 inline-block"
        >
          Back to home
        </Link>
      </div>
    );
  }

  const inStock = (selectedVariant?.Stock ?? 0) > 0;
  const canAdd = selectedVariant !== null && inStock;
  const maxQuantity = selectedVariant?.Stock ?? 1;
  const canIncrement = inStock && quantity < maxQuantity;
  const canDecrement = quantity > 1;

  const decQuantity = () => {
    if (canDecrement) setQuantity((q) => q - 1);
  };
  const incQuantity = () => {
    if (canIncrement) setQuantity((q) => q + 1);
  };

  const handleAdd = () => {
    if (!selectedVariant) {
      toast.error("This product has no purchasable variant.");
      return;
    }
    if (!inStock) {
      toast.error("Out of stock.");
      return;
    }
    addItem(
      {
        productCode: product.ProductCode,
        variantId: selectedVariant.VariantId,
        name: product.ProductName,
        sku: selectedVariant.SKU,
        price: selectedVariant.SellingPrice,
        image: images[0],
        color: selectedVariant.Color,
        size: selectedVariant.Size,
      },
      quantity,
    );
    toast.success(
      `${product.ProductName} ×${quantity} added to bag`,
    );
  };

  const handleBuyNow = () => {
    handleAdd();
    if (canAdd) router.push("/checkout");
  };

  const pickColor = (variant: Variant) => {
    setSelectedVariantId(variant.VariantId);
    setActiveImage(0);
    setQuantity(1);
  };

  const pickSize = (size: string) => {
    if (!product) return;
    // Prefer a variant with current color + that size; fall back to any with that size.
    const currentColor = selectedVariant?.Color ?? null;
    const match =
      product.Variants.find(
        (v) => v.Size === size && v.Color === currentColor,
      ) ?? product.Variants.find((v) => v.Size === size);
    if (match) {
      setSelectedVariantId(match.VariantId);
      setQuantity(1);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-10">
        <nav className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-4 sm:mb-6">
          <Link href="/" className="hover:text-brand-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          {product.CategoryName && (
            <>
              <span className="hover:text-brand-primary transition-colors">
                {product.CategoryName}
              </span>
              <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </>
          )}
          <span className="text-zinc-900 dark:text-white line-clamp-1">
            {product.ProductName}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative w-full max-w-md mx-auto">
              <Image
                src={images[activeImage] ?? fallbackImage}
                alt={product.ProductName}
                width={800}
                height={1000}
                className="w-full h-auto rounded-xl"
                priority
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
                {images.map((img, idx) => (
                  <button
                    key={`${img}-${idx}`}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                      idx === activeImage
                        ? "border-brand-primary"
                        : "border-zinc-200 dark:border-zinc-800 hover:border-brand-primary"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.ProductName} ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="120px"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-3">
            {/* Title + Share */}
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl lg:text-3xl font-bold text-zinc-900 dark:text-white leading-tight">
                {product.ProductName}
              </h1>
              <button
                type="button"
                className="flex items-center gap-1.5 text-sm text-zinc-600 dark:text-zinc-300 hover:text-brand-primary transition-colors shrink-0"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
                <span className="underline underline-offset-2">Share</span>
              </button>
            </div>

            {/* Meta */}
            <div className="space-y-1 text-sm">
              <div className="flex gap-2">
                <span className="font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide text-xs">
                  SKU:
                </span>
                <span className="text-zinc-600 dark:text-zinc-400 uppercase tracking-wide text-xs">
                  {selectedVariant?.SKU ?? product.ProductCode}
                </span>
              </div>
              {product.CategoryName && (
                <div className="flex gap-2">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300 uppercase tracking-wide text-xs">
                    Product Type:
                  </span>
                  <span className="text-zinc-600 dark:text-zinc-400 uppercase tracking-wide text-xs">
                    {product.CategoryName}
                  </span>
                </div>
              )}
            </div>

            {/* Price */}
            {selectedVariant && (
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                {formatPrice(selectedVariant.SellingPrice)}
              </p>
            )}

            {/* Color */}
            {colorOptions.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-zinc-800 dark:text-zinc-200">
                  Color -{" "}
                  <span className="font-medium uppercase">
                    {selectedVariant?.Color ?? "—"}
                  </span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {colorOptions.map(({ color, variant }) => {
                    const active = selectedVariant?.Color === color;
                    const thumb =
                      resolveImageUrl(variant.Images?.[0]) || fallbackImage;
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => pickColor(variant)}
                        aria-label={color}
                        className={`relative w-14 h-16 overflow-hidden border-2 transition-all ${
                          active
                            ? "border-zinc-900 dark:border-white"
                            : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-400"
                        }`}
                      >
                        <Image
                          src={thumb}
                          alt={color}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size */}
            {allSizes.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <p className="text-sm text-zinc-800 dark:text-zinc-200">
                    Size
                  </p>
                  {!inStock && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-zinc-900 text-white dark:bg-white dark:text-zinc-900">
                      Out of Stock
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {allSizes.map((size) => {
                    const variantInColor = variantsForCurrentColor.find(
                      (v) => v.Size === size,
                    );
                    const exists = variantInColor !== undefined;
                    const available = exists && variantInColor!.Stock > 0;
                    const active = selectedVariant?.Size === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => exists && pickSize(size)}
                        disabled={!exists}
                        className={cn(
                          "relative w-10 h-10 flex items-center justify-center text-sm transition-all",
                          active &&
                            "rounded-full border border-zinc-900 dark:border-white",
                          available
                            ? active
                              ? "text-zinc-900 dark:text-white"
                              : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
                            : "text-zinc-400 line-through decoration-zinc-400 decoration-1 cursor-not-allowed",
                        )}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-800 dark:text-zinc-200">
                Quantity
              </span>
              <div className="flex items-center border border-zinc-300 dark:border-zinc-700 rounded-full">
                <button
                  type="button"
                  onClick={decQuantity}
                  disabled={!canDecrement}
                  className="px-3 py-1.5 text-zinc-600 hover:text-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Decrease"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-4 py-1 text-sm font-medium min-w-8 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={incQuantity}
                  disabled={!canIncrement}
                  className="px-3 py-1.5 text-zinc-600 hover:text-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Increase"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              {inStock && (
                <span className="text-xs text-zinc-500">
                  {maxQuantity} in stock
                </span>
              )}
            </div>

            {/* Size Guide accordion */}
            <div className="border-t border-zinc-200 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setShowSizeGuide((v) => !v)}
                className="flex w-full items-center justify-between py-2 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Size Guide
                <span className="text-lg text-zinc-500">
                  {showSizeGuide ? "−" : "+"}
                </span>
              </button>
              {showSizeGuide && (
                <p className="pb-3 text-sm text-zinc-600 dark:text-zinc-400">
                  Refer to our size chart on the help page for measurements.
                </p>
              )}
            </div>

            {/* Description accordion */}
            <div className="border-t border-zinc-200 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setShowDescription((v) => !v)}
                className="flex w-full items-center justify-between py-2 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Description
                <span className="text-lg text-zinc-500">
                  {showDescription ? "−" : "+"}
                </span>
              </button>
              {showDescription && (
                <p className="pb-3 text-sm text-zinc-600 dark:text-zinc-400">
                  {product.ProductName}
                  {product.CategoryName ? ` — ${product.CategoryName}.` : "."}
                </p>
              )}
              <div className="border-b border-zinc-200 dark:border-zinc-800" />
            </div>

            {/* Free shipping */}
            <div className="flex items-start gap-3">
              <Truck className="w-6 h-6 text-zinc-700 dark:text-zinc-300 shrink-0" />
              <div className="text-sm">
                <p className="flex items-center gap-1 font-semibold text-zinc-900 dark:text-zinc-100">
                  Free Shipping
                  <HelpCircle className="w-3.5 h-3.5 text-zinc-400" />
                </p>
                <Link
                  href="#"
                  className="text-zinc-600 dark:text-zinc-400 underline underline-offset-2"
                >
                  Delivery Policy
                </Link>
              </div>
            </div>

            {/* Add to cart + wishlist */}
            <div className="flex items-center gap-3">
              <Button
                onClick={handleAdd}
                disabled={!canAdd}
                className="flex-1 h-12 rounded-none bg-brand-primary hover:bg-brand-primary-hover text-white text-sm font-semibold tracking-widest uppercase disabled:opacity-50"
              >
                {canAdd ? "Add to Cart" : "Unavailable"}
              </Button>
              <Button
                variant="outline"
                size="icon"
                aria-label="Add to wishlist"
                className="h-12 w-12 rounded-full border-zinc-300 dark:border-zinc-700 hover:brand-primary-hover hover:text-zinc-900 dark:hover:text-white  bg-brand-primary hover:bg-brand-primary-hover "
              >
                <Heart className="w-5 h-5 text-white" />
              </Button>
            </div>

            {/* Buy it now */}
            <Button
              onClick={handleBuyNow}
              disabled={!canAdd}
              variant="outline"
              className="w-full h-12 rounded-none border-zinc-900 dark:border-white text-zinc-900 dark:text-white text-sm font-semibold tracking-widest uppercase hover:bg-zinc-900 hover:text-white disabled:opacity-50"
            >
              Buy It Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
