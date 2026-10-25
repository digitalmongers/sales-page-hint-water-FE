"use client";

import React, { createContext, useContext, useState } from "react";
import { toast } from "sonner";

export interface CartItem {
  id: string;
  name: string;
  flavor: string;
  price: number;
  quantity: number;
  image: string;
  isSubscription?: boolean;
}

export interface AddToCartPayload {
  id: string;
  name: string;
  flavor: string;
  price: number;
  quantity?: number;
  image: string;
  isSubscription?: boolean;
}

interface CartContextType {
  cartItems: CartItem[];
  totalItemCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  checkoutItems: CartItem[];
  triggerBuyNow: (item: AddToCartPayload) => void;
  triggerCartCheckout: () => void;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: AddToCartPayload, openDrawer?: boolean) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

const DEFAULT_ITEMS: CartItem[] = [];

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(DEFAULT_ITEMS);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);

  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (payload: AddToCartPayload, openDrawer: boolean = true) => {
    const qtyToAdd = payload.quantity && payload.quantity > 0 ? payload.quantity : 1;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === payload.id || (item.name === payload.name && item.flavor === payload.flavor)
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const existing = updated[existingIndex];
        updated[existingIndex] = {
          ...existing,
          quantity: existing.quantity + qtyToAdd,
          price: payload.price, // Keep updated price if changed
        };
        return updated;
      }

      return [
        ...prev,
        {
          id: payload.id,
          name: payload.name,
          flavor: payload.flavor,
          price: payload.price,
          quantity: qtyToAdd,
          image: payload.image,
          isSubscription: payload.isSubscription ?? false,
        },
      ];
    });

    toast.success(`Added ${qtyToAdd} × ${payload.name} to cart!`);

    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
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
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.info("Item removed from cart");
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const triggerBuyNow = (payload: AddToCartPayload) => {
    const qtyToAdd = payload.quantity && payload.quantity > 0 ? payload.quantity : 1;
    const directItem: CartItem = {
      id: payload.id,
      name: payload.name,
      flavor: payload.flavor,
      price: payload.price,
      quantity: qtyToAdd,
      image: payload.image,
      isSubscription: payload.isSubscription ?? false,
    };

    // Ensure item is also in cart
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === payload.id || (item.name === payload.name && item.flavor === payload.flavor)
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.max(updated[existingIndex].quantity, qtyToAdd),
          price: payload.price,
        };
        return updated;
      }
      return [...prev, directItem];
    });

    setCheckoutItems([directItem]);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const triggerCartCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    setCheckoutItems(cartItems);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemCount,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        checkoutItems,
        triggerBuyNow,
        triggerCartCheckout,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
