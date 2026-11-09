"use client";

import { useEffect } from "react";
import { Logo } from "@/components/ui/Logo";

const KEY = "sora-seen";

/**
 * First-visit intro (≤1.2s): a thread draws a loop around the logo, then the curtain lifts.
 * Timing is pure CSS so the page never stays covered if JS is slow or fails.
 * Repeat visits skip it: an inline script sets html[data-seen] before paint (see layout.tsx).
 */
export function Preloader() {
  useEffect(() => {
    try {
      localStorage.setItem(KEY, "1");
    } catch {}
  }, []);

  return (
    <div aria-hidden className="preloader fixed inset-0 z-[90] grid place-items-center bg-bg">
      <div className="relative grid size-48 place-items-center">
        <svg viewBox="0 0 200 200" className="absolute inset-0 text-plum">
          <path
            className="preloader-thread"
            d="M100 12c52 0 88 36 88 86s-38 90-90 90S12 150 12 100 50 18 96 16c30-1 52 16 52 36"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            pathLength={1}
          />
        </svg>
        <Logo world="gift" size={120} />
      </div>
    </div>
  );
}

export const preloaderScript = `try{if(localStorage.getItem("${KEY}"))document.documentElement.dataset.seen="1"}catch(e){}`;
