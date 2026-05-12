import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productCode: string;
  variantId: number | null;
  name: string;
  sku: string | null;
  price: number;
  quantity: number;
  image?: string;
  color?: string | null;
  size?: string | null;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productCode: string, variantId: number | null) => void;
  updateQuantity: (
    productCode: string,
    variantId: number | null,
    change: number,
  ) => void;
  setQuantity: (
    productCode: string,
    variantId: number | null,
    quantity: number,
  ) => void;
  clear: () => void;
  totalItems: () => number;
  subtotal: () => number;
}

const matchesKey = (
  item: CartItem,
  productCode: string,
  variantId: number | null,
) => item.productCode === productCode && item.variantId === variantId;

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item, quantity = 1) => {
        set((state) => {
          const existing = state.items.find((i) =>
            matchesKey(i, item.productCode, item.variantId),
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                matchesKey(i, item.productCode, item.variantId)
                  ? { ...i, quantity: i.quantity + quantity }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity }] };
        });
      },
      removeItem: (productCode, variantId) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !matchesKey(i, productCode, variantId),
          ),
        }));
      },
      updateQuantity: (productCode, variantId, change) => {
        set((state) => ({
          items: state.items.map((i) =>
            matchesKey(i, productCode, variantId)
              ? { ...i, quantity: Math.max(1, i.quantity + change) }
              : i,
          ),
        }));
      },
      setQuantity: (productCode, variantId, quantity) => {
        set((state) => ({
          items: state.items.map((i) =>
            matchesKey(i, productCode, variantId)
              ? { ...i, quantity: Math.max(1, quantity) }
              : i,
          ),
        }));
      },
      clear: () => set({ items: [] }),
      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    }),
    {
      name: "happy-mart-cart",
      partialize: (state) => ({ items: state.items }),
    },
  ),
);
