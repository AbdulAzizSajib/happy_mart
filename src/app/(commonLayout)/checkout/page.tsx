"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Minus,
  Plus,
  Trash2,
  CreditCard,
  Banknote,
  Smartphone,
} from "lucide-react";

// Dummy cart data
const initialCartItems = [
  {
    id: 1,
    name: "Fresh Chicken Breast (Boneless)",
    image:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&h=200&fit=crop",
    price: 450,
    originalPrice: 520,
    quantity: 2,
    unit: "500g",
  },
  {
    id: 2,
    name: "Organic Bananas - Premium Quality",
    image:
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&h=200&fit=crop",
    price: 120,
    originalPrice: null,
    quantity: 1,
    unit: "1 dozen",
  },
  {
    id: 3,
    name: "Farm Fresh Eggs (Brown)",
    image:
      "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&h=200&fit=crop",
    price: 180,
    originalPrice: 200,
    quantity: 1,
    unit: "12 pcs",
  },
  {
    id: 4,
    name: "Aarong Dairy Full Cream Milk",
    image:
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200&h=200&fit=crop",
    price: 85,
    originalPrice: null,
    quantity: 3,
    unit: "1 Liter",
  },
];

export default function Checkout() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    area: "",
    note: "",
  });

  const updateQuantity = (id: number, change: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const savings = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + (item.originalPrice - item.price) * item.quantity;
    }
    return sum;
  }, 0);
  const deliveryFee = subtotal >= 500 ? 0 : 60;
  const total = subtotal + deliveryFee;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-10 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-6">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Column - Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg  p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Delivery Address
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="01XXXXXXXXX"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">Street Address *</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="House no, Road no, Area"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="Dhaka"
                  value={formData.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="area">Area *</Label>
                <Input
                  id="area"
                  name="area"
                  placeholder="Gulshan, Banani, etc."
                  value={formData.area}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="note">Delivery Note (Optional)</Label>
                <Input
                  id="note"
                  name="note"
                  placeholder="Any special instructions for delivery"
                  value={formData.note}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg  p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Payment Method
            </h2>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-3 p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800">
                <RadioGroupItem value="cod" id="cod" />
                <Label
                  htmlFor="cod"
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <Banknote className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-sm text-zinc-500">
                      Pay when you receive your order
                    </p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800">
                <RadioGroupItem value="bkash" id="bkash" />
                <Label
                  htmlFor="bkash"
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <Smartphone className="w-5 h-5 text-pink-600" />
                  <div>
                    <p className="font-medium">bKash</p>
                    <p className="text-sm text-zinc-500">
                      Pay with bKash mobile wallet
                    </p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-3 p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800">
                <RadioGroupItem value="card" id="card" />
                <Label
                  htmlFor="card"
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Credit/Debit Card</p>
                    <p className="text-sm text-zinc-500">
                      Visa, Mastercard, AMEX
                    </p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Cart Items - Mobile Only */}
          <div className="lg:hidden bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Order Items ({cartItems.length})
            </h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800 last:border-0"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-white line-clamp-2">
                      {item.name}
                    </h3>
                    <p className="text-xs text-zinc-500">{item.unit}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-red-600">
                        ৳{item.price * item.quantity}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 rounded-full border border-zinc-300 flex items-center justify-center"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 rounded-full border border-zinc-300 flex items-center justify-center"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-zinc-900 rounded-lg  p-6 sticky top-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Order Summary
            </h2>

            {/* Cart Items - Desktop */}
            <div className="hidden lg:block space-y-4 mb-6 max-h-80 overflow-y-auto">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800 last:border-0"
                >
                  <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-white line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-zinc-500">{item.unit}</p>
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-5 h-5 rounded-full border border-zinc-300 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-5 h-5 rounded-full border border-zinc-300 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-red-600">
                          ৳{item.price * item.quantity}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-zinc-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-3 border-t border-zinc-200 dark:border-zinc-700 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Subtotal
                </span>
                <span className="font-medium">৳{subtotal}</span>
              </div>
              {savings > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">You Save</span>
                  <span className="text-green-600 font-medium">
                    -৳{savings}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Delivery Fee
                </span>
                <span className="font-medium">
                  {deliveryFee === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `৳${deliveryFee}`
                  )}
                </span>
              </div>
              {deliveryFee > 0 && (
                <p className="text-xs text-zinc-500">
                  Add ৳{500 - subtotal} more for free delivery
                </p>
              )}
              <div className="flex justify-between text-lg font-bold pt-3 border-t border-zinc-200 dark:border-zinc-700">
                <span>Total</span>
                <span className="text-red-600">৳{total}</span>
              </div>
            </div>

            {/* Place Order Button */}
            <Button className="w-full mt-12 bg-red-600 hover:bg-red-700 text-white rounded-full h-12 text-base font-semibold">
              Place Order
            </Button>

            <p className="text-xs text-zinc-500 text-center mt-4">
              By placing this order, you agree to our Terms & Conditions
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
