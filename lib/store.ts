"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { World } from "@/site.config";

export type CartLine = {
  /** Unique per variant, e.g. "<productId>:M" or "box:<timestamp>". */
  key: string;
  productId?: string;
  name: string;
  /** null = price confirmed on WhatsApp (custom gift boxes). */
  priceLKR: number | null;
  world: World;
  qty: number;
  /** Size, gift-wrap message, box contents… shown under the name and sent with the order. */
  details?: string[];
};

type ShopState = {
  cart: CartLine[];
  wishlist: string[];
  addToCart: (line: Omit<CartLine, "qty">, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  toggleWishlist: (id: string) => void;
  clearCart: () => void;
};

export const useShop = create<ShopState>()(
  persist(
    (set) => ({
      cart: [],
      wishlist: [],
      addToCart: (line, qty = 1) =>
        set((s) => {
          const found = s.cart.find((l) => l.key === line.key);
          return {
            cart: found ? s.cart.map((l) => (l.key === line.key ? { ...l, qty: l.qty + qty } : l)) : [...s.cart, { ...line, qty }],
          };
        }),
      setQty: (key, qty) =>
        set((s) => ({ cart: qty <= 0 ? s.cart.filter((l) => l.key !== key) : s.cart.map((l) => (l.key === key ? { ...l, qty } : l)) })),
      toggleWishlist: (id) =>
        set((s) => ({ wishlist: s.wishlist.includes(id) ? s.wishlist.filter((w) => w !== id) : [...s.wishlist, id] })),
      clearCart: () => set({ cart: [] }),
    }),
    { name: "sora-shop", version: 1, migrate: () => ({ cart: [], wishlist: [] }) },
  ),
);

export const cartCount = (s: ShopState) => s.cart.reduce((n, l) => n + l.qty, 0);
export const cartSubtotal = (lines: CartLine[]) => lines.reduce((sum, l) => sum + (l.priceLKR ?? 0) * l.qty, 0);
export const cartHasUnpriced = (lines: CartLine[]) => lines.some((l) => l.priceLKR === null);

/** UI-only state (not persisted). */
export const useUI = create<{ cartOpen: boolean; setCartOpen: (v: boolean) => void }>((set) => ({
  cartOpen: false,
  setCartOpen: (cartOpen) => set({ cartOpen }),
}));
