"use client";

import { ChevronRight } from "lucide-react";
import {
  Baby,
  Dog,
  Gamepad2,
  Heart,
  Home as HomeIcon,
  LucideBriefcaseMedical,
  Pencil,
  Shirt,
  ShoppingBasket,
  Smartphone,
  UtensilsCrossed,
} from "lucide-react";
import Link from "next/link";

const categories = [
  { title: "Food", icon: ShoppingBasket, url: "#" },
  { title: "Baby Food & Care", icon: Baby, url: "#" },
  { title: "Home Cleaning", icon: HomeIcon, url: "#" },
  { title: "Pet Care", icon: Dog, url: "#" },
  { title: "Beauty & Health", icon: Heart, url: "#" },
  { title: "Fashion & Lifestyle", icon: Shirt, url: "#" },
  { title: "Home & Kitchen", icon: UtensilsCrossed, url: "#" },
  { title: "Stationeries", icon: Pencil, url: "#" },
  { title: "Toys & Sports", icon: Gamepad2, url: "#" },
  { title: "Gadget", icon: Smartphone, url: "#" },
  { title: "Medicine", icon: LucideBriefcaseMedical, url: "#" },
];

export function CategorySidebar() {
  return (
    <aside className="hidden md:block w-72 shrink-0">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="px-4 py-3 bg-brand-accent text-white">
          <h3 className="text-sm font-semibold uppercase tracking-wider">
            Shop by Category
          </h3>
        </div>
        <nav className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.url}
              className="flex items-center justify-between px-4 py-2.5 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <category.icon className="w-4 h-4 text-zinc-500 group-hover:text-brand-primary transition-colors" />
                <span className="text-sm text-zinc-700 dark:text-zinc-200 group-hover:text-brand-primary transition-colors">
                  {category.title}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-brand-primary transition-colors" />
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
