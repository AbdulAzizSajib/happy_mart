"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { ProductCard } from "@/components/layout/ProductCard";
import { Button } from "@/components/ui/button";
import { useProductStore } from "@/store/product-store";

const PAGE_SIZE = 100;

function ProductsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("search")?.trim() ?? "";
  const categoryCodeParam = searchParams.get("categoryCode");
  const categoryCode = categoryCodeParam ? Number(categoryCodeParam) : null;
  const validCategoryCode =
    categoryCode != null && Number.isFinite(categoryCode) ? categoryCode : null;

  const {
    products,
    pagination,
    loading,
    error,
    searchQuery,
    categoryCode: storeCategoryCode,
    loadProducts,
  } = useProductStore();

  useEffect(() => {
    const filtersChanged =
      searchQuery !== query || storeCategoryCode !== validCategoryCode;

    if (filtersChanged || products.length === 0) {
      loadProducts({
        page: 1,
        paginate: PAGE_SIZE,
        search: query || undefined,
        categoryCode: validCategoryCode ?? undefined,
      });
    }
  }, [
    query,
    searchQuery,
    validCategoryCode,
    storeCategoryCode,
    products.length,
    loadProducts,
  ]);

  const isSearching = query.length > 0;
  const isCategoryFiltered = validCategoryCode != null;

  const canLoadMore =
    !!pagination && pagination.page < pagination.totalPage && !loading;

  const handleLoadMore = () => {
    if (!pagination) return;
    loadProducts({
      page: pagination.page + 1,
      paginate: pagination.limit,
      search: query || undefined,
      categoryCode: validCategoryCode ?? undefined,
    });
  };

  // Title pulled from the first product's CategoryName if we filtered by
  // category — gives a nicer header than just "Category 12".
  const categoryName =
    isCategoryFiltered && products[0]?.CategoryName
      ? products[0].CategoryName
      : null;

  let heading = "All Products";
  if (isSearching) heading = "Search Results";
  else if (isCategoryFiltered) heading = categoryName ?? "Category";

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
            {heading}
          </h1>
          {isSearching && (
            <p className="text-sm text-zinc-500 mt-1 flex items-center gap-2">
              <span>
                Showing results for{" "}
                <span className="font-medium text-zinc-700 dark:text-zinc-300">
                  &ldquo;{query}&rdquo;
                </span>
              </span>
              <Link
                href="/products"
                className="inline-flex items-center gap-1 text-xs text-brand-primary hover:underline"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </Link>
            </p>
          )}
          {!isSearching && isCategoryFiltered && (
            <p className="text-sm text-zinc-500 mt-1 flex items-center gap-2">
              <span>Filtered by category</span>
              <Link
                href="/products"
                className="inline-flex items-center gap-1 text-xs text-brand-primary hover:underline"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </Link>
            </p>
          )}
        </div>
        {pagination && (
          <p className="text-sm text-zinc-500">
            Showing {products.length} of {pagination.total}
          </p>
        )}
      </div>

      {error && !loading && (
        <p className="text-center text-sm text-red-600 py-12">{error}</p>
      )}

      {!error && products.length === 0 && loading && (
        <p className="text-center text-sm text-zinc-500 py-12">
          {isSearching ? "Searching…" : "Loading products…"}
        </p>
      )}

      {!error && !loading && products.length === 0 && (isSearching || isCategoryFiltered) && (
        <div className="text-center py-12">
          <p className="text-sm text-zinc-500 mb-4">
            {isSearching
              ? `No products matched “${query}”.`
              : "No products found in this category."}
          </p>
          <Link href="/products">
            <Button
              variant="outline"
              className="rounded-full border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
            >
              Browse all products
            </Button>
          </Link>
        </div>
      )}

      {products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
          {products.map((product) => (
            <ProductCard key={product.ProductCode} product={product} />
          ))}
        </div>
      )}

      {canLoadMore && (
        <div className="flex justify-center mt-10">
          <Button
            onClick={handleLoadMore}
            variant="outline"
            className="rounded-full h-11 px-8 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
          >
            Load more
          </Button>
        </div>
      )}

      {loading && products.length > 0 && (
        <p className="text-center text-sm text-zinc-500 mt-6">Loading…</p>
      )}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsContent />
    </Suspense>
  );
}
