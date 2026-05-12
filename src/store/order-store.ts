import { create } from "zustand";
import { placeOrder, trackOrder } from "@/lib/api";
import type { OrderPayload, OrderTrackingData } from "@/types/api";

interface OrderState {
  placing: boolean;
  placeError: string | null;
  lastIssueNo: string | null;

  tracking: boolean;
  trackError: string | null;
  trackedOrder: OrderTrackingData | null;

  submitOrder: (payload: OrderPayload) => Promise<string | null>;
  fetchTracking: (saleCode: string) => Promise<void>;
  resetTracking: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  placing: false,
  placeError: null,
  lastIssueNo: null,

  tracking: false,
  trackError: null,
  trackedOrder: null,

  submitOrder: async (payload) => {
    set({ placing: true, placeError: null });
    try {
      const res = await placeOrder(payload);
      const issueNo = res.IssueNo ?? null;
      set({ placing: false, lastIssueNo: issueNo });
      return issueNo;
    } catch (err) {
      set({
        placing: false,
        placeError:
          err instanceof Error ? err.message : "Failed to place order",
      });
      return null;
    }
  },

  fetchTracking: async (saleCode) => {
    set({ tracking: true, trackError: null, trackedOrder: null });
    try {
      const res = await trackOrder(saleCode);
      set({ tracking: false, trackedOrder: res.data });
    } catch (err) {
      set({
        tracking: false,
        trackError:
          err instanceof Error ? err.message : "Failed to fetch tracking info",
      });
    }
  },

  resetTracking: () =>
    set({ tracking: false, trackError: null, trackedOrder: null }),
}));
