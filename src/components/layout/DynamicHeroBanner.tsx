"use client";

import { useEffect, useState } from "react";

import { HeroBanner } from "@/components/layout/HeroBanner";
import { fetchBanners, resolveImageUrl } from "@/lib/api";
import { withBasePath } from "@/lib/utils";
import type { Banner } from "@/types/api";

interface DynamicHeroBannerProps {
  fallbackImage?: string;
  className?: string;
}

interface Slide {
  id: number;
  image: string;
  alt: string;
}

const isActive = (b: Banner) => b.Active === "1";

export function DynamicHeroBanner({
  fallbackImage = withBasePath("/ban2.jpg"),
  className,
}: DynamicHeroBannerProps) {
  const fallback: Slide[] = [
    { id: 0, image: fallbackImage, alt: "Featured banner" },
  ];

  const [slides, setSlides] = useState<Slide[]>(fallback);

  useEffect(() => {
    let cancelled = false;
    fetchBanners()
      .then((banners) => {
        if (cancelled) return;
        const mapped = banners
          .filter(isActive)
          .map<Slide>((b) => ({
            id: b.BannerId,
            image: resolveImageUrl(b.Path),
            alt: `Banner ${b.BannerId}`,
          }));
        if (mapped.length > 0) setSlides(mapped);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return <HeroBanner slides={slides} className={className} />;
}
