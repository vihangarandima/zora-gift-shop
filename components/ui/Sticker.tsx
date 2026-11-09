import clsx from "clsx";
import type { ReactNode } from "react";

/** Round, slightly tilted label for discounts and "new". */
export function Sticker({ children, tone = "plum", className }: { children: ReactNode; tone?: "plum" | "white"; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-grid size-14 -rotate-12 place-items-center rounded-full text-center text-[11px] leading-tight font-extrabold tracking-wide uppercase shadow-soft",
        tone === "plum" ? "bg-plum text-white" : "bg-white text-plum ring-1 ring-blush",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Chip({ children, active, className, ...rest }: { children: ReactNode; active?: boolean } & React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={clsx(
        "min-h-11 rounded-full px-4 text-sm font-semibold transition",
        active ? "bg-ink text-white" : "bg-white text-ink ring-1 ring-blush hover:ring-plum",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
