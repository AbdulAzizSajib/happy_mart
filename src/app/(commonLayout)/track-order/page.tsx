"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { OrderStatusStepper } from "@/components/layout/OrderStatusStepper";
import { useOrderStore } from "@/store/order-store";

const STATUS_BADGE_CLASSES: Record<string, string> = {
  Pending:
    "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  Confirmed:
    "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  Processing:
    "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  Packed:
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300",
  Shipped:
    "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  "Out for Delivery":
    "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  Delivered:
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  Cancelled: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
  Returned:
    "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
  Refunded:
    "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
};

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialCode = searchParams.get("sale_code") ?? "";

  const { tracking, trackError, trackedOrder, fetchTracking } =
    useOrderStore();
  const [saleCode, setSaleCode] = useState(initialCode);

  useEffect(() => {
    if (initialCode) fetchTracking(initialCode);
  }, [initialCode, fetchTracking]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = saleCode.trim();
    if (trimmed) fetchTracking(trimmed);
  };

  return (
    <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 min-h-screen">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-4 sm:mb-6">
        Track Your Order
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-900 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6 max-w-2xl"
      >
        <Label htmlFor="saleCode">Order Number</Label>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-2">
          <Input
            id="saleCode"
            value={saleCode}
            onChange={(e) => setSaleCode(e.target.value)}
            placeholder="e.g. I2600000004"
          />
          <Button
            type="submit"
            disabled={tracking || !saleCode.trim()}
            className="bg-brand-primary hover:bg-brand-primary-hover text-white sm:w-auto w-full"
          >
            {tracking ? "Tracking…" : "Track"}
          </Button>
        </div>
        {trackError && (
          <p className="text-sm text-red-600 mt-3">{trackError}</p>
        )}
      </form>

      {trackedOrder && (
        <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 sm:p-6 max-w-4xl">
          <div className="flex flex-wrap items-start sm:items-center justify-between gap-3 mb-5 sm:mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-700">
            <div className="min-w-0">
              <p className="text-sm text-zinc-500">Order #</p>
              <p className="text-lg sm:text-xl font-semibold text-zinc-900 dark:text-white break-all">
                {trackedOrder.IssueNo}
              </p>
              <p className="text-xs text-zinc-500 mt-1">
                Placed on{" "}
                {new Date(trackedOrder.IssueDate).toLocaleDateString()}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                STATUS_BADGE_CLASSES[trackedOrder.OrderStatus] ??
                "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
              }`}
            >
              {trackedOrder.OrderStatus}
            </span>
          </div>

          <div className="mb-8">
            <OrderStatusStepper status={trackedOrder.OrderStatus} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                Billing Address
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {trackedOrder.BillingAddress.full_name}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {trackedOrder.BillingAddress.mobile}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {trackedOrder.BillingAddress.address}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-2">
                Customer
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {trackedOrder.CustomerCode}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">
                Shipping cost: ৳{trackedOrder.ShippingCost}
              </p>
            </div>
          </div>

          <h3 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">
            Items
          </h3>
          <div className="space-y-2">
            {trackedOrder.Items.map((item, idx) => (
              <div
                key={`${item.ProductCode}-${item.VariantId ?? idx}`}
                className="flex items-center justify-between py-2 border-b border-zinc-100 dark:border-zinc-800 last:border-0"
              >
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">
                    {item.ProductName}
                  </p>
                  <p className="text-xs text-zinc-500">
                    {item.SKU ?? item.ProductCode} · ৳{item.UnitPrice}
                  </p>
                </div>
                <p className="text-sm font-semibold text-brand-primary">
                  ৳{item.Net}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrackOrder() {
  return (
    <Suspense fallback={null}>
      <TrackOrderContent />
    </Suspense>
  );
}
