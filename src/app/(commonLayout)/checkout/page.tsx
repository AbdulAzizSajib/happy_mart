"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Minus, Plus, Trash2, Banknote, Languages } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useOrderStore } from "@/store/order-store";

const fallbackImage =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop";

const PAYMENT_METHODS: Record<string, number> = {
  cod: 1,
  bkash: 2,
  card: 3,
};

type Lang = "bn" | "en";

const T = {
  bn: {
    checkout: "চেকআউট",
    deliveryAddress: "ডেলিভারি ঠিকানা",
    fullName: "পুরো নাম",
    fullNamePh: "আপনার পুরো নাম লিখুন",
    phone: "মোবাইল নম্বর",
    phonePh: "০১XXXXXXXXX",
    email: "ইমেইল (ঐচ্ছিক)",
    emailPh: "your@email.com",
    address: "সম্পূর্ণ ঠিকানা",
    addressPh: "বাসা নং, রোড নং, এলাকা",
    note: "ডেলিভারির নোট (ঐচ্ছিক)",
    notePh: "ডেলিভারির জন্য বিশেষ কোনো নির্দেশনা",
    paymentMethod: "পেমেন্ট পদ্ধতি",
    cod: "ক্যাশ অন ডেলিভারি",
    codDesc: "পণ্য হাতে পেয়ে টাকা পরিশোধ করুন",
    orderSummary: "অর্ডার সারাংশ",
    emptyCart: "আপনার কার্ট খালি।",
    subtotal: "সাবটোটাল",
    deliveryFee: "ডেলিভারি চার্জ",
    free: "ফ্রি",
    addMore: (amt: string) => `ফ্রি ডেলিভারির জন্য আরও ৳${amt} যোগ করুন`,
    total: "সর্বমোট",
    placeOrder: "অর্ডার নিশ্চিত করুন",
    placing: "অর্ডার দেওয়া হচ্ছে…",
    terms: "অর্ডার করার মাধ্যমে আপনি আমাদের শর্তাবলীতে সম্মত হচ্ছেন",
    required: "*",
    switchTo: "English",
  },
  en: {
    checkout: "Checkout",
    deliveryAddress: "Delivery Address",
    fullName: "Full Name",
    fullNamePh: "Enter your full name",
    phone: "Phone Number",
    phonePh: "01XXXXXXXXX",
    email: "Email (Optional)",
    emailPh: "your@email.com",
    address: "Full Address",
    addressPh: "House no, Road no, Area",
    note: "Delivery Note (Optional)",
    notePh: "Any special instructions for delivery",
    paymentMethod: "Payment Method",
    cod: "Cash on Delivery",
    codDesc: "Pay when you receive your order",
    orderSummary: "Order Summary",
    emptyCart: "Your cart is empty.",
    subtotal: "Subtotal",
    deliveryFee: "Delivery Fee",
    free: "Free",
    addMore: (amt: string) => `Add ৳${amt} more for free delivery`,
    total: "Total",
    placeOrder: "Place Order",
    placing: "Placing order…",
    terms: "By placing this order, you agree to our Terms & Conditions",
    required: "*",
    switchTo: "বাংলা",
  },
} as const;

const toBnDigits = (input: string | number, lang: Lang): string => {
  const s = String(input);
  if (lang !== "bn") return s;
  const map = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return s.replace(/\d/g, (d) => map[Number(d)]);
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

  const [lang, setLang] = useState<Lang>("bn");
  const t = T[lang];

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

  const money = (n: number) => `৳${toBnDigits(n, lang)}`;

  return (
    <div className="container mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-6 md:py-8 lg:py-10 min-h-screen">
      <div className="flex items-center justify-between mb-4 sm:mb-6 gap-3">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white">
          {t.checkout}
        </h1>
        <button
          type="button"
          onClick={() => setLang((p) => (p === "bn" ? "en" : "bn"))}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-300 dark:border-zinc-700 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          aria-label="Toggle language"
        >
          <Languages className="w-4 h-4" />
          {t.switchTo}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {/* Delivery Address */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              {t.deliveryAddress}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">
                  {t.fullName} {t.required}
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder={t.fullNamePh}
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">
                  {t.phone} {t.required}
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder={t.phonePh}
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">{t.email}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t.emailPh}
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address">
                  {t.address} {t.required}
                </Label>
                <Input
                  id="address"
                  name="address"
                  placeholder={t.addressPh}
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="note">{t.note}</Label>
                <Input
                  id="note"
                  name="note"
                  placeholder={t.notePh}
                  value={formData.note}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              {t.paymentMethod}
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
                    <p className="font-medium">{t.cod}</p>
                    <p className="text-sm text-zinc-500">{t.codDesc}</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 sm:p-6 lg:sticky lg:top-4">
            <h2 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              {t.orderSummary}
            </h2>

            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
              {items.length === 0 && (
                <p className="text-sm text-zinc-500">{t.emptyCart}</p>
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
                            {toBnDigits(item.quantity, lang)}
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
                            {money(item.price * item.quantity)}
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
                  {t.subtotal}
                </span>
                <span className="font-medium">{money(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-600 dark:text-zinc-400">
                  {t.deliveryFee}
                </span>
                <span className="font-medium">
                  {deliveryFee === 0 ? (
                    <span className="text-brand-success">{t.free}</span>
                  ) : (
                    money(deliveryFee)
                  )}
                </span>
              </div>
              {deliveryFee > 0 && (
                <p className="text-xs text-zinc-500">
                  {t.addMore(toBnDigits(500 - subtotal, lang))}
                </p>
              )}
              <div className="flex justify-between text-lg font-bold pt-3 border-t border-zinc-200 dark:border-zinc-700">
                <span>{t.total}</span>
                <span className="text-brand-primary">{money(total)}</span>
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
              {placing ? t.placing : t.placeOrder}
            </Button>

            <p className="text-xs text-zinc-500 text-center mt-4">{t.terms}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
