"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "@/components/doodles";
import { t } from "@/lib/i18n";
import { useShop } from "@/lib/store";

export function WishlistButton({ id, className }: { id: string; className?: string }) {
  const on = useShop((s) => s.wishlist.includes(id));
  const toggle = useShop((s) => s.toggleWishlist);

  return (
    <button
      type="button"
      onClick={() => toggle(id)}
      aria-pressed={on}
      aria-label={on ? t.product.wishlistRemove : t.product.wishlistAdd}
      className={clsx(
        "relative grid size-11 place-items-center rounded-full bg-white/90 text-plum shadow-soft backdrop-blur transition hover:scale-105",
        className,
      )}
    >
      <motion.span key={String(on)} initial={{ scale: on ? 0.4 : 1 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 12 }}>
        <Heart size={20} filled={on} />
      </motion.span>
      <AnimatePresence>
        {on && (
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-lilac"
            initial={{ scale: 0.6, opacity: 1 }}
            animate={{ scale: 1.6, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </button>
  );
}
