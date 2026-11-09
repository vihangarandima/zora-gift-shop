import type { ReactNode } from "react";
import { Sparkle } from "@/components/doodles";
import { WordsUp } from "./Reveal";

export function PageHeader({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children?: ReactNode }) {
  return (
    <header className="container-sora flex flex-col gap-5 pt-10 pb-10 md:pt-16 md:pb-14">
      <p className="eyebrow inline-flex items-center gap-2">
        <Sparkle size={12} className="text-accent" />
        {eyebrow}
      </p>
      <h1 className="text-h1 max-w-[18ch]">
        <WordsUp text={title} />
      </h1>
      {intro && <p className="max-w-xl text-lg text-ink/75">{intro}</p>}
      {children}
    </header>
  );
}
