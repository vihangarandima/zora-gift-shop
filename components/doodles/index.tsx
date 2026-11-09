import clsx from "clsx";
import type { SVGProps } from "react";

type DoodleProps = SVGProps<SVGSVGElement> & { size?: number };

const base = { fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Four-point sparkle. Pass `twinkle` for the slow pulse. */
export function Sparkle({ size = 24, className, twinkle, ...p }: DoodleProps & { twinkle?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden
      className={clsx(twinkle && "animate-[twinkle_3.2s_ease-in-out_infinite]", className)}
      {...p}
    >
      <path d="M12 2c.6 5.2 2.8 7.4 10 10-7.2 2.6-9.4 4.8-10 10-.6-5.2-2.8-7.4-10-10 7.2-2.6 9.4-4.8 10-10Z" fill="currentColor" />
    </svg>
  );
}

export function Heart({ size = 24, filled, ...p }: DoodleProps & { filled?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden {...p}>
      <path
        {...base}
        strokeWidth={1.8}
        fill={filled ? "currentColor" : "none"}
        d="M12 20.5s-7.5-4.6-9-9.6C2 7.3 4.3 4.5 7.3 4.5c2 0 3.6 1.1 4.7 2.9 1.1-1.8 2.7-2.9 4.7-2.9 3 0 5.3 2.8 4.3 6.4-1.5 5-9 9.6-9 9.6Z"
      />
    </svg>
  );
}

/** Ribbon bow for Gift House accents. */
export function Bow({ size = 48, ...p }: DoodleProps) {
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 64 48" aria-hidden {...p}>
      <g {...base} strokeWidth={2.2}>
        <path d="M32 20C24 6 8 4 7 14s14 12 25 6Z" fill="currentColor" fillOpacity={0.18} />
        <path d="M32 20c8-14 24-16 25-6s-14 12-25 6Z" fill="currentColor" fillOpacity={0.18} />
        <path d="M29 22c-4 8-9 15-14 22M35 22c4 8 9 15 14 22" />
        <ellipse cx="32" cy="20" rx="4" ry="4.5" fill="currentColor" />
      </g>
    </svg>
  );
}

/** Running stitch line for Loom accents. Stretches to its container width. */
export function Stitch({ className, ...p }: SVGProps<SVGSVGElement>) {
  return (
    <svg className={clsx("h-3 w-full", className)} viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden {...p}>
      <path d="M2 6 Q50 1 100 6 T198 6" {...base} strokeWidth={1.8} strokeDasharray="7 6" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Thread loop: a playful curl used next to headings. */
export function ThreadCurl({ size = 64, ...p }: DoodleProps) {
  return (
    <svg width={size} height={size / 2} viewBox="0 0 64 32" aria-hidden {...p}>
      <path d="M2 24c10 0 14-18 24-18 8 0 8 12 0 12s-6-14 10-14c12 0 14 18 26 18" {...base} strokeWidth={1.8} />
    </svg>
  );
}

/** Scalloped section edge. Place at the top of a coloured band; colour = band colour. */
export function ScallopEdge({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <div
      aria-hidden
      className={clsx("h-4 w-full text-current", flip && "rotate-180", className)}
      style={{
        backgroundImage: "radial-gradient(circle at 16px 16px, currentColor 15.5px, transparent 16px)",
        backgroundSize: "32px 16px",
        backgroundPosition: "center top",
      }}
    />
  );
}

/** Soft wave divider. */
export function WaveEdge({ className, flip }: { className?: string; flip?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      className={clsx("block h-6 w-full md:h-10", flip && "rotate-180", className)}
    >
      <path d="M0 48V24C120 4 240 4 360 20s240 24 360 8 240-24 360-8 240 22 360 4v24Z" fill="currentColor" />
    </svg>
  );
}
