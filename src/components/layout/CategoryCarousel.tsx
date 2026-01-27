"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface Category {
  id: number;
  name: string;
  image: string;
  href: string;
}

interface CategoryCarouselProps {
  categories: Category[];
  className?: string;
}

export function CategoryCarousel({
  categories,
  className,
}: CategoryCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    const updateScrollState = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    updateScrollState();
    api.on("select", updateScrollState);
    api.on("reInit", updateScrollState);

    return () => {
      api.off("select", updateScrollState);
      api.off("reInit", updateScrollState);
    };
  }, [api]);

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  return (
    <div className={cn("relative w-full", className)}>
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          slidesToScroll: 1,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {categories.map((category) => (
            <CarouselItem key={category.id} className="pl-4 basis-auto">
              <Link href={category.href} className="group block">
                <div className="relative w-[227.39px] h-[227.39px] overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={227.39}
                    height={227.39}
                    className="object-cover transition-transform duration-300 group-hover:scale-105 w-full h-full"
                  />
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-block rounded-full bg-yellow-400 px-8 py-2 text-sm font-semibold text-black transition-colors group-hover:bg-yellow-500 whitespace-nowrap">
                      {category.name}
                    </span>
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Navigation Arrows */}
      <button
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className={cn(
          "absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-sm bg-yellow-400 text-black shadow-md transition-all hover:bg-yellow-500",
          !canScrollPrev && "opacity-50 cursor-not-allowed",
        )}
        aria-label="Previous categories"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={scrollNext}
        disabled={!canScrollNext}
        className={cn(
          "absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-sm bg-yellow-400 text-black shadow-md transition-all hover:bg-yellow-500",
          !canScrollNext && "opacity-50 cursor-not-allowed",
        )}
        aria-label="Next categories"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
