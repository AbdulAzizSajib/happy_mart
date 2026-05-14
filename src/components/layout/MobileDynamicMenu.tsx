"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  fetchCategoriesBySuper,
  fetchSuperCategories,
} from "@/lib/api";
import type { Category, SuperCategory } from "@/types/api";
import { cn } from "@/lib/utils";

interface MobileDynamicMenuProps {
  onNavigate?: () => void;
}

export function MobileDynamicMenu({ onNavigate }: MobileDynamicMenuProps) {
  const [superCategories, setSuperCategories] = useState<SuperCategory[]>([]);
  const [loadingSupers, setLoadingSupers] = useState(true);
  const [openCode, setOpenCode] = useState<number | null>(null);
  const [categoriesByCode, setCategoriesByCode] = useState<
    Record<number, Category[] | "loading" | "error">
  >({});

  useEffect(() => {
    let cancelled = false;
    fetchSuperCategories()
      .then((res) => {
        if (cancelled) return;
        setSuperCategories(res.filter((s) => s.Active === "Y"));
        setLoadingSupers(false);
      })
      .catch(() => {
        if (cancelled) return;
        setSuperCategories([]);
        setLoadingSupers(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleToggle = (code: number) => {
    const next = openCode === code ? null : code;
    setOpenCode(next);
    if (next !== null && !categoriesByCode[code]) {
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
    }
  };

  if (loadingSupers) {
    return (
      <div className="space-y-2 py-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-10 rounded-md bg-zinc-100 dark:bg-zinc-800 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (superCategories.length === 0) return null;

  return (
    <div className="space-y-1">
      {superCategories.map((sc) => {
        const open = openCode === sc.SuperCategoryCode;
        const entry = categoriesByCode[sc.SuperCategoryCode];
        return (
          <div
            key={sc.SuperCategoryCode}
            className="rounded-md overflow-hidden border border-zinc-200 dark:border-zinc-800"
          >
            <button
              type="button"
              onClick={() => handleToggle(sc.SuperCategoryCode)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-zinc-900 dark:text-zinc-100 transition-colors",
                open
                  ? "bg-zinc-100 dark:bg-zinc-800"
                  : "hover:bg-zinc-50 dark:hover:bg-zinc-900",
              )}
              aria-expanded={open}
            >
              <span className="uppercase tracking-wide">
                {sc.SuperCategoryName}
              </span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 text-zinc-500 transition-transform",
                  open && "rotate-180",
                )}
              />
            </button>

            {open && (
              <div className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
                {entry === "loading" && (
                  <p className="px-3 py-2 text-sm text-zinc-500">Loading…</p>
                )}
                {entry === "error" && (
                  <p className="px-3 py-2 text-sm text-red-600">
                    Failed to load.
                  </p>
                )}
                {Array.isArray(entry) && entry.length === 0 && (
                  <p className="px-3 py-2 text-sm text-zinc-500">
                    No categories.
                  </p>
                )}
                {Array.isArray(entry) && entry.length > 0 && (
                  <ul className="py-1">
                    {entry.map((cat) => (
                      <li key={cat.CategoryCode}>
                        <Link
                          href={`/products?categoryCode=${cat.CategoryCode}`}
                          onClick={onNavigate}
                          className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:text-brand-primary transition-colors"
                        >
                          {cat.CategoryName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
