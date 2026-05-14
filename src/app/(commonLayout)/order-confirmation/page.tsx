"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Package, Home, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const issueNo = searchParams.get("issue") ?? "";
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (!issueNo) return;
    try {
      await navigator.clipboard.writeText(issueNo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard may be unavailable; ignore silently
    }
  };

  if (!issueNo) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-white dark:bg-zinc-900 rounded-lg p-8 text-center border border-zinc-200 dark:border-zinc-800">
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
            No order found
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
            We couldn&apos;t find an order to confirm. Please place an order
            first.
          </p>
          <Link href="/">
            <Button className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white rounded-full h-11">
              Back to home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-10 md:py-16 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-8 md:p-12 text-center border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-green-100 dark:bg-green-900/30 rounded-full blur-xl" />
              <div className="relative w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Thank you for your order!
          </h1>
          <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 mb-8">
            Your order has been placed successfully. We&apos;ll send updates as
            it ships.
          </p>

          <div className="bg-zinc-50 dark:bg-zinc-800/60 rounded-xl p-5 mb-8">
            <p className="text-xs uppercase tracking-wide text-zinc-500 mb-1">
              Order Number
            </p>
            <div className="flex items-center justify-center gap-2">
              <p className="text-lg sm:text-xl md:text-2xl font-semibold text-brand-primary break-all">
                {issueNo}
              </p>
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-700 dark:hover:text-white transition-colors"
                aria-label="Copy order number"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            {copied && (
              <p className="text-xs text-green-600 mt-2">Copied!</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href={`/track-order?sale_code=${issueNo}`}>
              <Button className="w-full bg-brand-primary hover:bg-brand-primary-hover text-white rounded-full h-12">
                <Package className="w-4 h-4 mr-2" />
                Track Order
              </Button>
            </Link>
            <Link href="/">
              <Button
                variant="outline"
                className="w-full rounded-full h-12 border-zinc-300 dark:border-zinc-700"
              >
                <Home className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

        <p className="text-xs text-zinc-500 text-center mt-6">
          A confirmation has been recorded against your phone number. Keep your
          order number handy for tracking.
        </p>
      </div>
    </div>
  );
}

export default function OrderConfirmation() {
  return (
    <Suspense fallback={null}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
