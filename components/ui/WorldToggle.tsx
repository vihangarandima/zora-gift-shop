"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import type { World } from "@/site.config";
import { images } from "@/lib/images";
import { t } from "@/lib/i18n";

/**
 * Loom / Gift House switch. Sets data-world on <body> so every accent token re-colours.
 * Controlled: the parent owns which world is active (and filters its content by it).
 */
export function WorldToggle({ value, onChange, className }: { value: World; onChange: (w: World) => void; className?: string }) {
  useEffect(() => {
    document.body.dataset.world = value;
  }, [value]);

  return (
    <div role="radiogroup" aria-label="Choose your world" className={clsx("relative inline-flex rounded-full bg-white p-1.5 shadow-soft ring-1 ring-blush", className)}>
      {(["loom", "gift"] as const).map((w) => {
        const active = w === value;
        return (
          <button
            key={w}
            role="radio"
            aria-checked={active}
            onClick={() => onChange(w)}
            className={clsx("relative z-10 min-h-11 rounded-full px-5 text-sm font-bold transition-colors sm:px-7", active ? "text-white" : "text-ink/70 hover:text-ink")}
          >
            {active && (
              <motion.span
                layoutId="world-pill"
                className={clsx("absolute inset-0 -z-10 rounded-full", w === "loom" ? "bg-ink" : "bg-plum")}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
              />
            )}
            <span aria-hidden className="relative mr-2 inline-block size-6 overflow-hidden rounded-full align-middle ring-2 ring-white/70">
              <Image src={(w === "loom" ? images.loomDress : images.giftBox).src} alt="" fill sizes="24px" className="object-cover" />
            </span>
            {t.worlds[w].name}
          </button>
        );
      })}
    </div>
  );
}
