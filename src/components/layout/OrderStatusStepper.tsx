"use client";

import {
  Check,
  Clock,
  ClipboardCheck,
  Package,
  PackageCheck,
  Truck,
  Bike,
  Home,
  XCircle,
  Undo2,
  Banknote,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const HAPPY_PATH = [
  { id: 1, label: "Pending", icon: Clock },
  { id: 2, label: "Confirmed", icon: ClipboardCheck },
  { id: 3, label: "Processing", icon: Package },
  { id: 4, label: "Packed", icon: PackageCheck },
  { id: 5, label: "Shipped", icon: Truck },
  { id: 6, label: "Out for Delivery", icon: Bike },
  { id: 7, label: "Delivered", icon: Home },
] as const;

const EXCEPTION_META: Record<
  string,
  { label: string; icon: LucideIcon; tone: "danger" | "warning" }
> = {
  Cancelled: { label: "Cancelled", icon: XCircle, tone: "danger" },
  Returned: { label: "Returned", icon: Undo2, tone: "warning" },
  Refunded: { label: "Refunded", icon: Banknote, tone: "warning" },
};

interface OrderStatusStepperProps {
  status: string;
}

export function OrderStatusStepper({ status }: OrderStatusStepperProps) {
  const exception = EXCEPTION_META[status];

  if (exception) {
    const Icon = exception.icon;
    const tone =
      exception.tone === "danger"
        ? "bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-900/40 dark:text-red-300"
        : "bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-900/40 dark:text-amber-300";

    return (
      <div className={cn("rounded-lg border p-4 flex items-center gap-3", tone)}>
        <Icon className="w-6 h-6 shrink-0" />
        <div>
          <p className="text-sm font-semibold">Order {exception.label}</p>
          <p className="text-xs opacity-80">
            This order is no longer in active fulfillment.
          </p>
        </div>
      </div>
    );
  }

  const currentIndex = Math.max(
    0,
    HAPPY_PATH.findIndex((s) => s.label === status),
  );
  const progressPct =
    HAPPY_PATH.length > 1
      ? (currentIndex / (HAPPY_PATH.length - 1)) * 100
      : 0;

  return (
    <div className="w-full">
      {/* Desktop / tablet: horizontal stepper */}
      <div className="hidden sm:block">
        <div className="relative px-4 pt-2 pb-4">
          {/* Track */}
          <div className="absolute left-4 right-4 top-7 h-1 bg-zinc-200 dark:bg-zinc-700 rounded-full" />
          {/* Progress fill */}
          <div
            className="absolute left-4 top-7 h-1 bg-brand-success rounded-full transition-all duration-500"
            style={{
              width: `calc((100% - 2rem) * ${progressPct / 100})`,
            }}
          />

          <ol className="relative grid grid-cols-7 gap-2">
            {HAPPY_PATH.map((step, idx) => {
              const isComplete = idx < currentIndex;
              const isCurrent = idx === currentIndex;
              const Icon = step.icon;

              return (
                <li
                  key={step.id}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className={cn(
                      "relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors",
                      isComplete &&
                        "bg-brand-success border-brand-success text-white",
                      isCurrent &&
                        "bg-white dark:bg-zinc-900 border-brand-success text-brand-success ring-4 ring-brand-success/20",
                      !isComplete &&
                        !isCurrent &&
                        "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-600 text-zinc-400",
                    )}
                  >
                    {isComplete ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <span
                    className={cn(
                      "mt-2 text-xs font-medium leading-tight",
                      (isComplete || isCurrent)
                        ? "text-zinc-900 dark:text-white"
                        : "text-zinc-400 dark:text-zinc-500",
                    )}
                  >
                    {step.label}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      {/* Mobile: vertical stepper */}
      <ol className="sm:hidden space-y-0">
        {HAPPY_PATH.map((step, idx) => {
          const isComplete = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const isLast = idx === HAPPY_PATH.length - 1;
          const Icon = step.icon;

          return (
            <li key={step.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex items-center justify-center w-9 h-9 rounded-full border-2 transition-colors shrink-0",
                    isComplete &&
                      "bg-brand-success border-brand-success text-white",
                    isCurrent &&
                      "bg-white dark:bg-zinc-900 border-brand-success text-brand-success ring-4 ring-brand-success/20",
                    !isComplete &&
                      !isCurrent &&
                      "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-600 text-zinc-400",
                  )}
                >
                  {isComplete ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                {!isLast && (
                  <div
                    className={cn(
                      "w-0.5 flex-1 min-h-6 my-1",
                      isComplete ? "bg-brand-success" : "bg-zinc-200 dark:bg-zinc-700",
                    )}
                  />
                )}
              </div>
              <div className="pb-5 pt-1.5">
                <p
                  className={cn(
                    "text-sm font-medium",
                    (isComplete || isCurrent)
                      ? "text-zinc-900 dark:text-white"
                      : "text-zinc-400 dark:text-zinc-500",
                  )}
                >
                  {step.label}
                </p>
                {isCurrent && (
                  <p className="text-xs text-brand-success mt-0.5">
                    Current status
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
