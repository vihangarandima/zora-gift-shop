import type { SVGProps } from "react";

const line = { fill: "none", stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round" } as const;

/** Little dress on a question-mark hanger, a nod to the Loom logo. Line art, not a product. */
export function DressArt(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 250" aria-hidden {...props}>
      <g {...line}>
        <path d="M92 26a9 9 0 1 1 9 9c-3 0-5 2-5 6v6" />
        <path d="M96 47 30 86h132L96 47Z" />
        <path d="M70 86c2 12 8 20 14 24M126 86c-2 12-8 20-14 24" />
        <path d="M84 110c4 4 20 4 28 0l6 26c22 30 34 62 40 96H38c6-34 18-66 40-96l6-26Z" fill="currentColor" fillOpacity={0.12} />
        <path d="M80 136c12 5 28 5 40 0" strokeDasharray="5 6" />
        <path d="M46 214c34 8 74 8 108 0" strokeDasharray="5 6" />
      </g>
    </svg>
  );
}

/** Gift box with a big bow. `lidClassName` lets callers animate the lid. */
export function GiftArt({ bow = "currentColor", lidClassName, ...props }: SVGProps<SVGSVGElement> & { bow?: string; lidClassName?: string }) {
  return (
    <svg viewBox="0 0 220 220" overflow="visible" aria-hidden {...props}>
      <g {...line}>
        <rect x="38" y="96" width="144" height="104" rx="14" fill="currentColor" fillOpacity={0.1} />
        <path d="M110 96v104" stroke={bow} strokeWidth={10} strokeLinecap="butt" />
        <path d="M58 124c10 4 20 4 30 0M132 160c10 4 20 4 30 0" strokeDasharray="4 6" />
      </g>
      <g className={lidClassName} style={{ transformOrigin: "110px 90px", transformBox: "view-box" }}>
        <g {...line}>
          <rect x="28" y="72" width="164" height="30" rx="10" fill="white" />
          <path d="M110 72v30" stroke={bow} strokeWidth={10} strokeLinecap="butt" />
          <path d="M110 70c-10-30-48-40-52-22s32 24 52 22Z" fill={bow} fillOpacity={0.35} stroke={bow} />
          <path d="M110 70c10-30 48-40 52-22s-32 24-52 22Z" fill={bow} fillOpacity={0.35} stroke={bow} />
          <circle cx="110" cy="68" r="7" fill={bow} stroke={bow} />
        </g>
      </g>
    </svg>
  );
}
