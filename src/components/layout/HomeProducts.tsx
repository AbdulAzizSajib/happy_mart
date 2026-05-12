"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { Button } from "@/components/ui/button";
import { useProductStore } from "@/store/product-store";

const HOME_PAGINATE = 100;

export function HomeProducts() {
  const { products, pagination, loading, error, searchQuery, loadProducts } =
    useProductStore();

  useEffect(() => {
    const needsReload =
      searchQuery !== "" ||
      products.length === 0 ||
      (pagination && pagination.limit < HOME_PAGINATE);

    if (needsReload && !loading) {
      loadProducts({ page: 1, paginate: HOME_PAGINATE });
    }
  }, [searchQuery, products.length, pagination, loading, loadProducts]);

  const hasMore = pagination ? pagination.total > products.length : false;

  return (
    <section className="mt-8 py-5">
      <div className="flex items-end justify-between mb-6 px-4">
        <h2 className="text-2xl uppercase font-bold text-zinc-900 dark:text-white">
          Trending Right Now
        </h2>
        {hasMore && !loading && !error && (
          <Link
            href="/products"
            className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-brand-primary hover:underline"
          >
            See more
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {loading && products.length === 0 && (
        <p className="text-center text-sm text-zinc-500">Loading products…</p>
      )}
      {error && !loading && (
        <p className="text-center text-sm text-red-600">{error}</p>
      )}
      {!loading && !error && products.length === 0 && (
        <p className="text-center text-sm text-zinc-500">No products found.</p>
      )}

      {!error && products.length > 0 && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 px-4">
            {products.map((product) => (
              <ProductCard key={product.ProductCode} product={product} />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-8 px-4">
              <Link href="/products">
                <Button
                  variant="outline"
                  className="rounded-full h-11 px-8 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                >
                  See More Products
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          )}
        </>
      )}
    </section>
  );
}
