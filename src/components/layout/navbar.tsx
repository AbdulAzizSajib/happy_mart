"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Menu,
  MapPin,
  Search,
  Download,
  Package,
  ShoppingCart,
  Home,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { usePlantInfo } from "@/context/plant-info-context";
import { resolveImageUrl } from "@/lib/api";

import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MegaMenu } from "./MegaMenu";
import { MobileDynamicMenu } from "./MobileDynamicMenu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  const router = useRouter();
  const { plant } = usePlantInfo();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");

  const siteName = plant?.PlantName ?? "Happy Mart";
  const logoUrl = plant?.ImagePath ? resolveImageUrl(plant.ImagePath) : null;

  const submitSearch = (q: string, closeMobileMenu = false) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    if (closeMobileMenu) setMobileMenuOpen(false);
    router.push(`/products?search=${encodeURIComponent(trimmed)}`);
  };

  const hydrated = useSyncExternalStore(
    (cb) => useCartStore.persist.onFinishHydration(cb),
    () => useCartStore.persist.hasHydrated(),
    () => false,
  );
  const cartCount = useCartStore((s) =>
    s.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  return (
    <header className={cn("w-full sticky top-0 z-50", className)}>
      {/* Top Bar - Red Background */}
      <div className="bg-brand-primary text-white">
        <div className="container mx-auto px-4">
          {/* Row 1: hamburger (mobile) | logo | actions */}
          <div className="flex items-center justify-between gap-3 py-3">
            {/* Mobile hamburger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open menu"
                  className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-white/15 active:bg-white/25 transition-colors"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[85vw] max-w-sm p-0 flex flex-col"
              >
                <SheetHeader className="px-4 py-4 bg-brand-primary text-white border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <SheetTitle className="text-white text-lg">
                      {siteName}
                    </SheetTitle>
                  </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto">
                  <div className="p-4 space-y-5">
                    {/* Mobile location selector */}
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2 bg-brand-success hover:bg-brand-success-hover text-white border-0 h-11"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>Select delivery location</span>
                    </Button>

                    {/* Primary nav */}
                    <nav className="space-y-1">
                      <Link
                        href="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-zinc-800 dark:text-zinc-200 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <Home className="w-4 h-4" />
                        Home
                      </Link>
                      <Link
                        href="/products"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-zinc-800 dark:text-zinc-200 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <Search className="w-4 h-4" />
                        All Products
                      </Link>
                      <Link
                        href="/track-order"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-zinc-800 dark:text-zinc-200 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <Package className="w-4 h-4" />
                        Track Order
                      </Link>
                    </nav>

                    {/* Shop by category - dynamic */}
                    <div className="space-y-2">
                      <p className="px-1 text-xs font-semibold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
                        Shop by Category
                      </p>
                      <MobileDynamicMenu
                        onNavigate={() => setMobileMenuOpen(false)}
                      />
                    </div>
                  </div>
                </div>

                {/* Sheet footer */}
                <div className="p-4 border-t border-zinc-200 dark:border-zinc-800">
                  <Button
                    variant="outline"
                    className="w-full h-11 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download App
                  </Button>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center gap-2">
              {logoUrl && (
                <Image
                  src={logoUrl}
                  alt={siteName}
                  width={36}
                  height={36}
                  className="rounded-sm object-contain"
                  unoptimized
                />
              )}
              <span className="font-bold text-xl sm:text-2xl text-white">
                {siteName}
              </span>
            </Link>

            {/* Location Selector - Desktop only */}
            <Button
              variant="ghost"
              className="hidden lg:flex items-center gap-2 border border-white/30 hover:bg-white/15 hover:text-white text-white px-3 py-2 h-auto"
            >
              <MapPin className="w-4 h-4" />
              <span className="text-sm whitespace-nowrap">
                Delivery location
              </span>
            </Button>

            {/* Search Bar - Tablet/Desktop */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitSearch(searchQuery);
              }}
              className="hidden md:flex flex-1 max-w-2xl"
            >
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search your products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-4 pr-12 rounded-md border-0 bg-white text-gray-900"
                />
                <button
                  type="submit"
                  aria-label="Search"
                  className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center bg-brand-accent rounded-r-md hover:brightness-110 transition"
                >
                  <Search className="w-5 h-5 text-zinc-800" />
                </button>
              </div>
            </form>

            {/* Desktop Right Side Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <Link href="/checkout" aria-label="Cart">
                <Button
                  variant="ghost"
                  className="relative flex items-center gap-2 border border-white/30 hover:bg-white/15 hover:text-white text-white px-3 py-2 h-auto"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="text-sm">Cart</span>
                  {hydrated && cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-brand-accent text-zinc-800 text-xs font-bold flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>

              <Link href="/track-order">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 border border-white/30 hover:bg-white/15 hover:text-white text-white px-3 py-2 h-auto"
                >
                  <Package className="w-4 h-4" />
                  <span className="text-sm whitespace-nowrap">Track Order</span>
                </Button>
              </Link>
            </div>

            {/* Mobile Cart icon */}
            <Link
              href="/checkout"
              aria-label="Cart"
              className="lg:hidden relative inline-flex items-center justify-center w-10 h-10 rounded-md hover:bg-white/15 active:bg-white/25 transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {hydrated && cartCount > 0 && (
                <span className="absolute top-0.5 right-0.5 min-w-4.5 h-4.5 px-1 rounded-full bg-brand-accent text-zinc-900 text-[10px] font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Row 2: Mobile-only full-width search bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submitSearch(mobileSearchQuery);
            }}
            className="md:hidden pb-3"
          >
            <div className="relative">
              <Input
                type="text"
                placeholder="Search your products"
                value={mobileSearchQuery}
                onChange={(e) => setMobileSearchQuery(e.target.value)}
                className="w-full h-10 pl-4 pr-20 rounded-md border-0 bg-white text-gray-900"
              />
              {mobileSearchQuery && (
                <button
                  type="button"
                  onClick={() => setMobileSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-12 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-zinc-500 hover:text-zinc-800"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center bg-brand-accent rounded-r-md hover:brightness-110 transition"
              >
                <Search className="w-5 h-5 text-zinc-800" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Desktop Mega Menu - hidden on mobile (mobile users get the same data inside the sheet) */}
      <div className="hidden lg:block">
        <MegaMenu />
      </div>
    </header>
  );
};

export { Navbar };
