import type { SVGProps } from "react";

const p = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true } as const;

export const BagIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...p} {...props}><path d="M5 8h14l-1 12H6L5 8Z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>
);
export const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...p} {...props}><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></svg>
);
export const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...p} {...props}><path d="M12 5v14M5 12h14" /></svg>
);
export const ArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...p} {...props}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
);
export const WhatsAppIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...p} {...props}>
    <path d="M4 20l1.2-3.6A8 8 0 1 1 8 19.2L4 20Z" />
    <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.4-1.8-.9-.8.8c-1-.4-2-1.4-2.4-2.4l.8-.8-.9-1.8L9 9.5Z" />
  </svg>
);
