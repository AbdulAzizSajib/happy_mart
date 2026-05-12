"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Menu,
  MapPin,
  Search,
  Download,
  Package,
  ShoppingBasket,
  ShoppingCart,
  Baby,
  Home,
  Dog,
  Heart,
  Shirt,
  UtensilsCrossed,
  Pencil,
  Gamepad2,
  Smartphone,
  LucideBriefcaseMedical,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MegaMenu } from "./MegaMenu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const categories = [
  { title: "Food", icon: ShoppingBasket, url: "#" },
  { title: "Baby Food & Care", icon: Baby, url: "#" },
  { title: "Home Cleaning", icon: Home, url: "#" },
  { title: "Pet Care", icon: Dog, url: "#" },
  { title: "Beauty & Health", icon: Heart, url: "#" },
  { title: "Fashion & Lifestyle", icon: Shirt, url: "#" },
  { title: "Home & Kitchen", icon: UtensilsCrossed, url: "#" },
  { title: "Stationeries", icon: Pencil, url: "#" },
  { title: "Toys & Sports", icon: Gamepad2, url: "#" },
  { title: "Gadget", icon: Smartphone, url: "#" },
  { title: "Medicine", icon: LucideBriefcaseMedical, url: "#" },
];

const navLinks = [
  { title: "WINTER CARE", url: "#" },
  { title: "GREAT DEALS", url: "#" },
  { title: "BUY & SAVE MORE", url: "#" },
  { title: "OUR BRANDS", url: "#" },
  { title: "WOMEN'S CORNER", url: "#" },
];

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");

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
          <div className="flex items-center justify-between py-3 gap-4">
            {/* Logo */}
            <Link href="/" className="shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-[#ffffff] font-bold text-2xl">
                  Happy Mart
                </span>
              </div>
            </Link>

            {/* Location Selector - Hidden on mobile */}
            <Button
              variant="ghost"
              className="hidden md:flex items-center gap-2 border  hover:text-black  text-white  px-4 py-2 h-auto"
            >
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Select your delivery location</span>
            </Button>

            {/* Search Bar - Hidden on mobile */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitSearch(searchQuery);
              }}
              className="hidden md:flex flex-1 max-w-3xl"
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
                  className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center bg-brand-accent rounded-r-md"
                >
                  <Search className="w-5 h-5 text-zinc-800" />
                </button>
              </div>
            </form>
            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Cart */}
              <Link href="/checkout" aria-label="Cart">
                <Button
                  variant="ghost"
                  className="relative flex items-center gap-2 border hover:text-black text-white px-3 py-2 h-auto"
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

              {/* Track Order */}
              <Link href="/track-order">
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 border hover:text-black text-white  px-4 py-2 h-auto"
                >
                  <Package className="w-4 h-4" />
                  <span className="text-sm">Track Order</span>
                </Button>
              </Link>
            </div>

            {/* Mobile Cart */}
            <Link
              href="/checkout"
              aria-label="Cart"
              className="lg:hidden relative inline-flex items-center justify-center w-10 h-10 text-white"
            >
              <ShoppingCart className="w-6 h-6" />
              {hydrated && cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-5 h-5 px-1 rounded-full bg-brand-accent text-white text-xs font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-white hover:bg-white/20"
                >
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-75 p-0">
                <SheetHeader className="p-4 bg-brand-primary text-white">
                  <SheetTitle className="text-white">Menu</SheetTitle>
                </SheetHeader>
                <div className="p-4">
                  {/* Mobile Search */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      submitSearch(mobileSearchQuery, true);
                    }}
                    className="relative mb-4"
                  >
                    <Input
                      type="text"
                      placeholder="Search your products"
                      value={mobileSearchQuery}
                      onChange={(e) => setMobileSearchQuery(e.target.value)}
                      className="w-full h-10 pl-4 pr-12 rounded-md border bg-white"
                    />
                    <button
                      type="submit"
                      aria-label="Search"
                      className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center bg-brand-accent rounded-r-md"
                    >
                      <Search className="w-5 h-5 text-gray-700" />
                    </button>
                  </form>

                  {/* Mobile Location */}
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 mb-4 bg-brand-success hover:bg-brand-success-hover text-white border-0"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Select delivery location</span>
                  </Button>

                  {/* Mobile Nav Links */}
                  <div className="space-y-2 mb-4">
                    {navLinks.map((link) => (
                      <a
                        key={link.title}
                        href={link.url}
                        className="block py-2 px-3 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded"
                      >
                        {link.title}
                      </a>
                    ))}
                  </div>

                  {/* Mobile Categories */}
                  <div className="border-t pt-4">
                    <p className="text-sm font-semibold text-gray-500 mb-2">
                      SHOP BY CATEGORY
                    </p>
                    <div className="space-y-1">
                      {categories.map((category) => (
                        <a
                          key={category.title}
                          href={category.url}
                          className="flex items-center gap-3 py-2 px-3 text-sm text-gray-700 hover:bg-gray-100 rounded"
                        >
                          <category.icon className="w-4 h-4" />
                          <span>{category.title}</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Mobile Actions */}
                  <div className="border-t pt-4 mt-4 space-y-2">
                    <Link
                      href="/track-order"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button className="w-full bg-brand-success hover:bg-brand-success-hover text-white">
                        <Package className="w-4 h-4 mr-2" />
                        Track Order
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Download App
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Mega Menu */}
      <MegaMenu />
    </header>
  );
};

export { Navbar };
