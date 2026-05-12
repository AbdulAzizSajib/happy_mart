import { create } from "zustand";
import { fetchProducts } from "@/lib/api";
import type { ApiProduct, Pagination } from "@/types/api";

interface ProductState {
  products: ApiProduct[];
  pagination: Pagination | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  categoryCode: number | null;
  loadProducts: (params?: {
    page?: number;
    paginate?: number;
    search?: string;
    categoryCode?: number;
  }) => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  pagination: null,
  loading: false,
  error: null,
  searchQuery: "",
  categoryCode: null,
  loadProducts: async (params) => {
    const search = params?.search?.trim() ?? "";
    const categoryCode = params?.categoryCode ?? null;
    set({ loading: true, error: null, searchQuery: search, categoryCode });
    try {
      const res = await fetchProducts(params);
      set({
        products: res.data ?? [],
        pagination: res.pagination ?? null,
        loading: false,
      });
    } catch (err) {
      set({
        loading: false,
        error: err instanceof Error ? err.message : "Failed to load products",
      });
    }
  },
}));
