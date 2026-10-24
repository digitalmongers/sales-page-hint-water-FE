"use client";

import { useState } from "react";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ShoppingBag01Icon,
  PlusSignIcon,
  MinusSignIcon,
  Delete02Icon,
  ArrowRight01Icon,
  Ticket01Icon,
  DeliveryBox01Icon,
  SecurityCheckIcon,
} from "@hugeicons/core-free-icons";
import { toast } from "sonner";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

export interface CartItem {
  id: string;
  name: string;
  flavor: string;
  price: number;
  quantity: number;
  image: string;
  isSubscription?: boolean;
}

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items?: CartItem[];
  onUpdateQuantity?: (id: string, delta: number) => void;
  onRemoveItem?: (id: string) => void;
}

const DEFAULT_ITEMS: CartItem[] = [
  {
    id: "item-1",
    name: "Peach Raspberry Hint® Water",
    flavor: "Peach Raspberry (12-pack)",
    price: 22.99,
    quantity: 1,
    image: "/images/peachRaspberry.svg",
    isSubscription: false,
  },
];

const FREE_SHIPPING_THRESHOLD = 40.0;

export function CartDrawer({
  open,
  onOpenChange,
  items: externalItems,
}: CartDrawerProps) {
  const [internalItems, setInternalItems] = useState<CartItem[]>(DEFAULT_ITEMS);
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isApplyingPromo, setIsApplyingPromo] = useState(false);

  const cartItems = externalItems ?? internalItems;

  const updateQuantity = (id: string, delta: number) => {
    setInternalItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeItem = (id: string) => {
    setInternalItems((prev) => prev.filter((item) => item.id !== id));
    toast.info("Item removed from cart");
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    setIsApplyingPromo(true);
    setTimeout(() => {
      setIsApplyingPromo(false);
      const code = promoCode.trim().toUpperCase();
      if (code === "HINT10" || code === "SAVE10" || code === "WELCOME") {
        setDiscountPercent(10);
        toast.success(`Promo code ${code} applied (10% OFF)!`);
      } else {
        toast.error("Invalid promo code. Try 'HINT10' for 10% off!");
      }
    }, 400);
  };

  const rawSubtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const subtotal = Math.max(0, rawSubtotal - discountAmount);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgress = Math.min(
    100,
    Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100)
  );
  const shippingCost = isFreeShipping || rawSubtotal === 0 ? 0 : 4.99;
  const total = subtotal > 0 ? subtotal + shippingCost : 0;
  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    toast.success("Proceeding to secure checkout!");
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md p-0 flex flex-col h-full bg-white border-l border-gray-100"
      >
        {/* Header */}
        <SheetHeader className="p-5 pb-3 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={ShoppingBag01Icon} className="size-5 text-blue-950" />
            <SheetTitle className="text-xl font-bold text-blue-950">
              Your Cart ({totalItemCount})
            </SheetTitle>
          </div>
          <SheetDescription className="text-xs text-gray-500">
            {totalItemCount > 0
              ? "Review your items and proceed to checkout."
              : "Your cart is currently empty."}
          </SheetDescription>

          {/* Free shipping milestone bar */}
          {totalItemCount > 0 && (
            <div className="mt-2 rounded-lg bg-sky-50/70 p-3 border border-sky-100">
              <div className="flex items-center justify-between text-xs font-semibold text-blue-950 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={DeliveryBox01Icon} className="size-4 text-sky-600" />
                  {isFreeShipping ? (
                    <span className="text-emerald-700">You unlocked FREE Standard Shipping! 🎉</span>
                  ) : (
                    <span>
                      Add <span className="font-bold text-sky-700">${amountToFreeShipping.toFixed(2)}</span> more for Free Shipping
                    </span>
                  )}
                </span>
                <span className="text-[11px] text-gray-500">{shippingProgress}%</span>
              </div>
              <Progress value={shippingProgress} className="h-1.5 bg-sky-100" />
            </div>
          )}
        </SheetHeader>

        {/* Scrollable Items Area */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
              <div className="flex size-16 items-center justify-center rounded-full bg-sky-50 text-sky-700 mb-4">
                <HugeiconsIcon icon={ShoppingBag01Icon} className="size-8" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Your cart is empty</h3>
              <p className="text-sm text-gray-500 max-w-xs mb-6">
                Looks like you haven&apos;t added any delicious Hint Water flavors yet.
              </p>
              <Button
                variant="default"
                onClick={() => onOpenChange(false)}
                className="bg-blue-950 hover:bg-blue-900 text-white font-medium"
              >
                Shop Popular Flavors
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-xl border border-gray-100 p-3.5 bg-gray-50/50 hover:bg-gray-50 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="relative size-20 shrink-0 rounded-lg bg-white p-1.5 border border-gray-100 flex items-center justify-center overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="size-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-gray-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {item.flavor}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-rose-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <HugeiconsIcon icon={Delete02Icon} className="size-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity buttons */}
                      <div className="flex items-center rounded-lg border border-gray-200 bg-white shadow-xs">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="flex size-7 items-center justify-center text-gray-600 hover:text-blue-950 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <HugeiconsIcon icon={MinusSignIcon} className="size-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold text-gray-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="flex size-7 items-center justify-center text-gray-600 hover:text-blue-950 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <HugeiconsIcon icon={PlusSignIcon} className="size-3.5" />
                        </button>
                      </div>

                      {/* Price */}
                      <span className="text-sm font-bold text-blue-950">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with totals and checkout */}
        {cartItems.length > 0 && (
          <SheetFooter className="p-5 border-t border-gray-100 bg-white flex flex-col gap-3.5">
            {/* Promo code input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <HugeiconsIcon
                  icon={Ticket01Icon}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400"
                />
                <Input
                  placeholder="Promo code (e.g. HINT10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="pl-9 h-10 text-xs uppercase"
                />
              </div>
              <Button
                type="submit"
                variant="outline"
                size="sm"
                disabled={isApplyingPromo || !promoCode.trim()}
                className="h-10 text-xs px-3 font-semibold border-gray-200 text-gray-700 hover:text-blue-950"
              >
                {isApplyingPromo ? "Applying..." : "Apply"}
              </Button>
            </form>

            <Separator />

            {/* Calculations breakdown */}
            <div className="space-y-1.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">${rawSubtotal.toFixed(2)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  {isFreeShipping ? (
                    <span className="font-semibold text-emerald-700">FREE</span>
                  ) : (
                    `$${shippingCost.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-blue-950 pt-2 border-t border-gray-100">
                <span>Estimated Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout button */}
            <Button
              size="lg"
              onClick={handleCheckout}
              className="w-full h-12 bg-blue-950 hover:bg-blue-900 text-white font-bold text-sm shadow-md gap-2"
            >
              <span>Checkout</span>
              <span>•</span>
              <span>${total.toFixed(2)}</span>
              <HugeiconsIcon icon={ArrowRight01Icon} className="size-4 ml-1" />
            </Button>

            {/* Trust badge */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
              <HugeiconsIcon icon={SecurityCheckIcon} className="size-3.5 text-emerald-600" />
              <span>Guaranteed safe and secure checkout</span>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
