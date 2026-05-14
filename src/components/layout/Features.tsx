import { Package, ShieldCheck, Headphones, CreditCard } from "lucide-react";

interface Feature {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    id: 1,
    icon: <Package className="w-8 h-8" />,
    title: "60 Mins Delivery",
    description: "Free shipping over 1500Tk",
  },
  {
    id: 2,
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Authorized Products",
    description: "within 30 days for an exchange",
  },
  {
    id: 3,
    icon: <Headphones className="w-8 h-8" />,
    title: "Customer Service Support",
    description: "8am to 10pm",
  },
  {
    id: 4,
    icon: <CreditCard className="w-8 h-8" />,
    title: "Flexible Payments",
    description: "Pay with multiple credit cards",
  },
];

export function Features() {
  return (
    <section className="bg-zinc-50 dark:bg-zinc-900">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg shadow bg-white dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-colors min-h-20"
            >
              <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full border-2 border-red-500 text-red-500">
                <span className="[&_svg]:w-6 [&_svg]:h-6 sm:[&_svg]:w-8 sm:[&_svg]:h-8">
                  {feature.icon}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-zinc-900 dark:text-white text-xs sm:text-sm mb-0.5 sm:mb-1">
                  {feature.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
