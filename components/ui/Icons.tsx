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
export const TruckIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...p} {...props}><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" /><circle cx="7" cy="18" r="1.8" /><circle cx="17.5" cy="18" r="1.8" /></svg>
);
export const GiftIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...p} {...props}><path d="M4 11h16v9H4zM3 7h18v4H3zM12 7v13" /><path d="M12 7c-1.5-3-5-3.5-5-1.2C7 7 9.5 7 12 7Zm0 0c1.5-3 5-3.5 5-1.2C17 7 14.5 7 12 7Z" /></svg>
);
export const HeartLineIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...p} {...props}><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" /></svg>
);
export const WhatsAppIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg {...p} {...props}>
    <path d="M4 20l1.2-3.6A8 8 0 1 1 8 19.2L4 20Z" />
    <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.4-1.8-.9-.8.8c-1-.4-2-1.4-2.4-2.4l.8-.8-.9-1.8L9 9.5Z" />
  </svg>
);
