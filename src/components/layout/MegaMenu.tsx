"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  fetchCategoriesBySuper,
  fetchSuperCategories,
} from "@/lib/api";
import type { Category, SuperCategory } from "@/types/api";

export function MegaMenu() {
  const [superCategories, setSuperCategories] = useState<SuperCategory[]>([]);
  const [activeCode, setActiveCode] = useState<number | null>(null);
  const [categoriesByCode, setCategoriesByCode] = useState<
    Record<number, Category[] | "loading" | "error">
  >({});

  useEffect(() => {
    let cancelled = false;
    fetchSuperCategories()
      .then((res) => {
        if (cancelled) return;
        setSuperCategories(res.filter((s) => s.Active === "Y"));
      })
      .catch(() => {
        if (!cancelled) setSuperCategories([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleHover = (code: number) => {
    setActiveCode(code);
    if (categoriesByCode[code]) return;

    setCategoriesByCode((prev) => ({ ...prev, [code]: "loading" }));
    fetchCategoriesBySuper(code)
      .then((cats) => {
        setCategoriesByCode((prev) => ({
          ...prev,
          [code]: cats.filter((c) => c.Active === "Y"),
        }));
      })
      .catch(() => {
        setCategoriesByCode((prev) => ({ ...prev, [code]: "error" }));
      });
  };

  if (superCategories.length === 0) {
    return <div className="h-12 bg-brand-accent" aria-hidden />;
  }

  const activeEntry =
    activeCode !== null ? categoriesByCode[activeCode] : undefined;

  return (
    <div
      className="relative bg-brand-accent text-white"
      onMouseLeave={() => setActiveCode(null)}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-center gap-1 flex-wrap">
          {superCategories.map((sc) => {
            const active = activeCode === sc.SuperCategoryCode;
            return (
              <div
                key={sc.SuperCategoryCode}
                onMouseEnter={() => handleHover(sc.SuperCategoryCode)}
              >
                <button
                  type="button"
                  className={`flex items-center px-5 py-3 text-sm font-semibold tracking-wide uppercase transition-colors border-b-2 ${
                    active
                      ? "border-white text-zinc-800"
                      : "border-transparent text-zinc-600 hover:text-zinc-800"
                  }`}
                >
                  {sc.SuperCategoryName}
                </button>
              </div>
            );
          })}
        </nav>
      </div>

      {/* Mega Panel */}
      {activeCode !== null && (
        <div
          className="absolute left-0 right-0 top-full z-40 bg-white text-zinc-900 shadow-xl border-t border-zinc-200"
          onMouseEnter={() => setActiveCode(activeCode)}
        >
          <div className="container mx-auto px-4 py-8">
            {activeEntry === "loading" && (
              <p className="text-sm text-zinc-500">Loading categories…</p>
            )}

            {activeEntry === "error" && (
              <p className="text-sm text-red-600">
                Failed to load categories. Please try again.
              </p>
            )}

            {Array.isArray(activeEntry) && activeEntry.length === 0 && (
              <p className="text-sm text-zinc-500">
                No categories under this section.
              </p>
            )}

            {Array.isArray(activeEntry) && activeEntry.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-3">
                {activeEntry.map((cat) => (
                  <Link
                    key={cat.CategoryCode}
                    href={`/products?categoryCode=${cat.CategoryCode}`}
                    onClick={() => setActiveCode(null)}
                    className="text-sm text-zinc-800 hover:text-brand-primary transition-colors"
                  >
                    {cat.CategoryName}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
