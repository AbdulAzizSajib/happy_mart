"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
import { useCartStore } from "@/store/cart-store";
import { useOrderStore } from "@/store/order-store";

const fallbackImage =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop";

const PAYMENT_METHODS: Record<string, number> = {
  cod: 1,
  bkash: 2,
  card: 3,
};

export default function Checkout() {
  const router = useRouter();

  const items = useCartStore((s) => s.items);
  const updateQty = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart = useCartStore((s) => s.clear);

  const placing = useOrderStore((s) => s.placing);
  const placeError = useOrderStore((s) => s.placeError);
  const submitOrder = useOrderStore((s) => s.submitOrder);

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = subtotal >= 500 ? 0 : subtotal > 0 ? 60 : 0;
  const total = subtotal + deliveryFee;

  const canPlace =
    items.length > 0 &&
    formData.fullName.trim() &&
    formData.phone.trim() &&
    formData.address.trim();

  const handlePlaceOrder = async () => {
    if (!canPlace) return;
    const issueNo = await submitOrder({
      sale_products: items.map((item) => ({
        product_code: item.productCode,
        VariantId: item.variantId,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity,
      })),
      sub_total: subtotal,
      total,
      shipping_cost: deliveryFee,
      CustomerCode: formData.phone.trim(),
      billing_address: {
        full_name: formData.fullName.trim(),
        mobile: formData.phone.trim(),
        address: formData.address.trim(),
        country_id: 1,
        city_id: 1,
        area_id: 1,
        note: formData.note.trim(),
      },
      user: { id: 1 },
      payment_method_id: PAYMENT_METHODS[paymentMethod] ?? 1,
    });
    if (issueNo) {
      clearCart();
      router.push(`/order-confirmation?issue=${encodeURIComponent(issueNo)}`);
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-10 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-6">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-6">
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
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-6">
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
                  <Banknote className="w-5 h-5 text-brand-success" />
                  <div>
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-sm text-zinc-500">
                      Pay when you receive your order
                    </p>
                  </div>
                </Label>
              </div>
              {/* <div className="flex items-center space-x-3 p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800">
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
              </div> */}
            </RadioGroup>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-6 sticky top-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
              {items.length === 0 && (
                <p className="text-sm text-zinc-500">Your cart is empty.</p>
              )}
              {items.map((item) => {
                const key = `${item.productCode}-${item.variantId ?? "x"}`;
                return (
                  <div
                    key={key}
                    className="flex gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800 last:border-0"
                  >
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
                      <Image
                        src={item.image || fallbackImage}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-zinc-900 dark:text-white line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-zinc-500">
                        {item.sku ?? item.productCode}
                        {item.color ? ` · ${item.color}` : ""}
                        {item.size ? ` · ${item.size}` : ""}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              updateQty(item.productCode, item.variantId, -1)
                            }
                            className="w-5 h-5 rounded-full border border-zinc-300 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQty(item.productCode, item.variantId, 1)
                            }
                            className="w-5 h-5 rounded-full border border-zinc-300 flex items-center justify-center hover:bg-zinc-100 dark:hover:bg-zinc-800"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-brand-primary">
                            ৳{item.price * item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              removeItem(item.productCode, item.variantId)
                            }
                            className="text-zinc-400 hover:text-red-600"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="space-y-3 border-t border-zinc-200 dark:border-zinc-700 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Subtotal
                </span>
                <span className="font-medium">৳{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">
                  Delivery Fee
                </span>
                <span className="font-medium">
                  {deliveryFee === 0 ? (
                    <span className="text-brand-success">Free</span>
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
                <span className="text-brand-primary">৳{total}</span>
              </div>
            </div>

            {placeError && (
              <p className="text-sm text-red-600 mt-4">{placeError}</p>
            )}

            <Button
              onClick={handlePlaceOrder}
              disabled={!canPlace || placing}
              className="w-full mt-8 bg-brand-primary hover:bg-brand-primary-hover text-white rounded-full h-12 text-base font-semibold disabled:opacity-50"
            >
              {placing ? "Placing order…" : "Place Order"}
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
