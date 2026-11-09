import clsx from "clsx";
import { Fragment, type ReactNode } from "react";
import { Sparkle } from "@/components/doodles";

/** Endless strip. Content is duplicated once; the track slides by half its width. */
export function Marquee({ items, speed = 40, className }: { items: ReactNode[]; speed?: number; className?: string }) {
  const row = (hidden?: boolean) => (
    <div className="flex shrink-0 items-center" aria-hidden={hidden}>
      {items.map((item, i) => (
        <Fragment key={i}>
          <span className="px-6 whitespace-nowrap">{item}</span>
          <Sparkle size={12} className="shrink-0 text-accent" />
        </Fragment>
      ))}
    </div>
  );
  return (
    <div className={clsx("flex overflow-hidden", className)}>
      <div className="flex w-max animate-[marquee_var(--d)_linear_infinite] hover:[animation-play-state:paused]" style={{ ["--d" as string]: `${speed}s` }}>
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
