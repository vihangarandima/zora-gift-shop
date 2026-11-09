import clsx from "clsx";
import type { ReactNode } from "react";
import { Sparkle } from "@/components/doodles";

export function SectionHeading({
  eyebrow,
  title,
  note,
  align = "left",
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  note?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <header className={clsx("flex flex-col gap-4", align === "center" && "items-center text-center", className)}>
      <p className="eyebrow inline-flex items-center gap-2">
        <Sparkle size={12} className="text-accent" />
        {eyebrow}
      </p>
      <h2 className="text-h2 max-w-[18ch] text-balance">{title}</h2>
      {note && <p className="font-hand text-2xl text-plum">{note}</p>}
    </header>
  );
}
