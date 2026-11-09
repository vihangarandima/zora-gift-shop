"use client";

import { motion } from "framer-motion";
import { t } from "@/lib/i18n";
import { formatPrice, siteConfig } from "@/site.config";

/** Hidden until the owner sets a free-delivery threshold in site.config.ts. */
export function FreeDeliveryBar({ subtotal }: { subtotal: number }) {
  const { freeOver } = siteConfig.delivery;
  if (freeOver === null) return null;
  const pct = Math.min(1, subtotal / freeOver);
  const left = freeOver - subtotal;

  return (
    <div className="rounded-2xl bg-tint p-3">
      <p className="mb-2 text-sm font-semibold">{left > 0 ? t.cart.freeLeft.replace("{amount}", formatPrice(left)) : t.cart.freeDone}</p>
      <div className="h-2 overflow-hidden rounded-full bg-white">
        <motion.div className="h-full rounded-full bg-plum" initial={{ width: 0 }} animate={{ width: `${pct * 100}%` }} transition={{ type: "spring", stiffness: 120, damping: 20 }} />
      </div>
    </div>
  );
}
