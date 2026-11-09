"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { t } from "@/lib/i18n";

type Mode = "dot" | "link" | "view";

/** Soft dot that grows over links and says "view" over product cards. Desktop pointers only. */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>("dot");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = matchMedia("(pointer: fine)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as Element | null;
      setMode(el?.closest("[data-cursor=view]") && !el.closest("button") ? "view" : el?.closest("a,button,[role=radio],label") ? "link" : "dot");
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;
  const size = mode === "view" ? 72 : mode === "link" ? 40 : 12;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[100] grid place-items-center rounded-full text-[11px] font-bold tracking-widest text-white uppercase"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: size,
        height: size,
        backgroundColor: mode === "link" ? "rgba(180,139,203,0.28)" : "rgba(139,91,159,0.92)",
      }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
    >
      {mode === "view" && t.product.view}
    </motion.div>
  );
}
