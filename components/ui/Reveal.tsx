"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

/** Fade-up on first view. Framer respects reduced motion via MotionConfig in the layout. */
export function Reveal({ delay = 0, y = 28, ...rest }: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    />
  );
}

/** Image/tile reveal: wipes open from the bottom with a slight zoom-out. */
export function ClipReveal({ delay = 0, ...rest }: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0% 0% 0% round 24px)", scale: 1.06 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 24px)", scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, delay, ease: [0.65, 0, 0.35, 1] }}
      {...rest}
    />
  );
}

/**
 * Splits a line into words that rise in one after another.
 * Pure CSS (see .word-up in globals.css) so headings show without waiting for JavaScript.
 */
export function WordsUp({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden>
          <span className="word-up inline-block" style={{ ["--d" as string]: `${delay + i * 0.08}s` }}>
            {w}&nbsp;
          </span>
        </span>
      ))}
    </span>
  );
}
