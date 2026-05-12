"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import type { ApiProduct } from "@/types/api";

interface ProductCarouselProps {
  title: string;
  products: ApiProduct[];
  loading?: boolean;
  error?: string | null;
}

export function ProductCarousel({
  title,
  products,
  loading,
  error,
}: ProductCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!api) return;
    const update = () => {
      setCanPrev(api.canScrollPrev());
      setCanNext(api.canScrollNext());
    };
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  const showControls = !loading && !error && products.length > 0;

  return (
    <div className="py-5">
      <div className="relative mb-6 px-4">
        <h2 className="text-2xl uppercase font-bold text-zinc-900 dark:text-white text-start">
          {title}
        </h2>

        {showControls && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:inline-flex items-stretch rounded-full border border-zinc-300 dark:border-zinc-700 overflow-hidden bg-white dark:bg-zinc-900 shadow-sm">
            <button
              type="button"
              onClick={() => api?.scrollPrev()}
              disabled={!canPrev}
              aria-label="Previous"
              className="flex items-center justify-center h-10 w-12 text-zinc-700 dark:text-zinc-200 hover:bg-brand-primary hover:text-white disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-zinc-700 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span
              aria-hidden
              className="self-center block w-px h-6 bg-zinc-300 dark:bg-zinc-700"
            />
            <button
              type="button"
              onClick={() => api?.scrollNext()}
              disabled={!canNext}
              aria-label="Next"
              className="flex items-center justify-center h-10 w-12 text-zinc-700 dark:text-zinc-200 hover:bg-brand-primary hover:text-white disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-zinc-700 transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {loading && (
        <p className="text-center text-sm text-zinc-500">Loading products…</p>
      )}
      {error && !loading && (
        <p className="text-center text-sm text-red-600">{error}</p>
      )}
      {!loading && !error && products.length === 0 && (
        <p className="text-center text-sm text-zinc-500">No products found.</p>
      )}

      {showControls && (
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {products.map((product) => (
              <CarouselItem
                key={product.ProductCode}
                className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
              >
                <ProductCard product={product} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </div>
  );
}
