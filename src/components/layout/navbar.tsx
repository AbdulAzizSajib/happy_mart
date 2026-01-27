"use client";

import { useState } from "react";
import {
  Menu,
  MapPin,
  Search,
  Download,
  User,
  Phone,
  Store,
  ChevronRight,
  ShoppingBasket,
  Baby,
  Home,
  Dog,
  Heart,
  Shirt,
  UtensilsCrossed,
  Pencil,
  Gamepad2,
  Smartphone,
} from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={cn("w-full sticky top-0 z-50", className)}>
      {/* Top Bar - Red Background */}
      <div className="bg-[#E31E25] text-white">
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
            <div className="hidden md:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search your products"
                  className="w-full h-10 pl-4 pr-12 rounded-md border-0 bg-white text-gray-900"
                />
                <button className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center bg-[#FFD700] rounded-r-md">
                  <Search className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language Toggle */}
              <Button
                variant="ghost"
                className="border text-white  rounded-md px-4 py-2 h-auto"
              >
                <span className="text-sm font-medium">বাংলা</span>
              </Button>

              {/* Sign In */}
              <Button
                variant="ghost"
                className="flex items-center gap-2 border hover:text-black text-white  px-4 py-2 h-auto"
              >
                <User className="w-4 h-4" />
                <span className="text-sm">Sign in / Sign up</span>
              </Button>
            </div>

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
                <SheetHeader className="p-4 bg-[#E31E25] text-white">
                  <SheetTitle className="text-white">Menu</SheetTitle>
                </SheetHeader>
                <div className="p-4">
                  {/* Mobile Search */}
                  <div className="relative mb-4">
                    <Input
                      type="text"
                      placeholder="Search your products"
                      className="w-full h-10 pl-4 pr-12 rounded-md border bg-white"
                    />
                    <button className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center bg-[#FFD700] rounded-r-md">
                      <Search className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>

                  {/* Mobile Location */}
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 mb-4 bg-[#00A651] hover:bg-[#008f46] text-white border-0"
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

                  {/* Mobile Auth */}
                  <div className="border-t pt-4 mt-4 space-y-2">
                    <Button className="w-full bg-[#00A651] hover:bg-[#008f46] text-white">
                      <User className="w-4 h-4 mr-2" />
                      Sign in / Sign up
                    </Button>
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

      {/* Secondary Nav Bar - Yellow/White */}
      <div className="bg-[#FFD700] border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between ">
            {/* Category Dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-2 py-3 px-4 font-semibold text-gray-800 hover:bg-[#e6c200] transition-colors"
                onMouseEnter={() => setIsCategoryOpen(true)}
                onMouseLeave={() => setIsCategoryOpen(false)}
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                <Menu className="w-5 h-5" />
                <span className="hidden sm:inline">SHOP BY CATEGORY</span>
                <span className="sm:hidden">CATEGORIES</span>
              </button>

              {/* Dropdown Menu */}
              <div
                className={cn(
                  "absolute left-0 top-full bg-white shadow-lg rounded-b-lg min-w-[280px] z-50 transition-all duration-200",
                  isCategoryOpen
                    ? "opacity-100 visible"
                    : "opacity-0 invisible",
                )}
                onMouseEnter={() => setIsCategoryOpen(true)}
                onMouseLeave={() => setIsCategoryOpen(false)}
              >
                {categories.map((category) => (
                  <a
                    key={category.title}
                    href={category.url}
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <category.icon className="w-5 h-5 text-gray-600" />
                      <span className="text-gray-700">{category.title}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </a>
                ))}
              </div>
            </div>

            {/* Nav Links - Hidden on mobile */}
            <nav className="hidden lg:flex items-center">
              {navLinks.map((link) => (
                <a
                  key={link.title}
                  href={link.url}
                  className="px-4 py-3 text-sm font-medium text-gray-800 hover:bg-[#e6c200] transition-colors"
                >
                  {link.title}
                </a>
              ))}
            </nav>

            {/* Right Links */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="#"
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
              >
                <Store className="w-4 h-4" />
                <span>Our outlets</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
              >
                <Phone className="w-4 h-4" />
                <span>Help line</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Navbar };
