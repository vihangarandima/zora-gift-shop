import clsx from "clsx";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-plum text-white shadow-soft hover:bg-plum-deep hover:shadow-lift",
  secondary: "bg-white text-ink ring-1 ring-blush hover:ring-plum hover:bg-tint",
  ghost: "text-plum hover:bg-tint",
  // WhatsApp green is not a brand colour, so the button stays on-palette and carries the icon instead.
  whatsapp: "bg-ink text-white shadow-soft hover:bg-plum-deep hover:shadow-lift",
};

const sizes: Record<Size, string> = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-14 px-7 text-base",
};

export function buttonClass({ variant = "primary", size = "md", className }: { variant?: Variant; size?: Size; className?: string }) {
  return clsx(
    "inline-flex items-center justify-center gap-2 rounded-full font-bold tracking-wide transition-all duration-300 ease-[cubic-bezier(.34,1.56,.64,1)]",
    "hover:-translate-y-0.5 active:translate-y-0 active:scale-[.98] disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className,
  );
}

type Common = { variant?: Variant; size?: Size; icon?: ReactNode; className?: string; children: ReactNode };

export function Button({ variant, size, icon, className, children, ...rest }: Common & ComponentProps<"button">) {
  return (
    <button className={buttonClass({ variant, size, className })} {...rest}>
      {icon}
      {children}
    </button>
  );
}

export function ButtonLink({ variant, size, icon, className, children, ...rest }: Common & ComponentProps<typeof Link>) {
  return (
    <Link className={buttonClass({ variant, size, className })} {...rest}>
      {icon}
      {children}
    </Link>
  );
}
