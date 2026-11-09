"use client";

import clsx from "clsx";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { Bow, Sparkle, Stitch } from "@/components/doodles";
import { DressArt, GiftArt } from "@/components/doodles/Illustrations";
import { ArrowIcon } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { WordsUp } from "@/components/ui/Reveal";
import { t } from "@/lib/i18n";
import type { World } from "@/site.config";

function Panel({ world, progress }: { world: World; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const artY = useTransform(progress, [0, 1], [0, world === "loom" ? -60 : -90]);
  const sparkY = useTransform(progress, [0, 1], [0, -140]);
  const loom = world === "loom";

  return (
    <Link
      href={`/shop/${world}`}
      data-world={world}
      className={clsx(
        "group relative flex min-h-[27rem] flex-1 flex-col justify-between overflow-hidden rounded-xl2 p-5 shadow-soft transition-[flex-grow,box-shadow] duration-700 ease-[cubic-bezier(.22,1,.36,1)] hover:shadow-lift md:min-h-[34rem] md:p-8 md:hover:grow-[1.6]",
        loom ? "bg-[color-mix(in_oklab,var(--sora-periwinkle)_20%,white)]" : "bg-blush",
      )}
    >
      <div className="relative z-10 flex items-start justify-between">
        <span className="grid size-20 place-items-center rounded-full bg-white shadow-soft md:size-24">
          <Logo world={world} size={loom ? 72 : 88} />
        </span>
        <span className="eyebrow rounded-full bg-white/70 px-3 py-2 backdrop-blur">{loom ? "clothing" : "gifts"}</span>
      </div>

      <motion.div style={{ y: artY }} className="pointer-events-none absolute inset-x-0 top-[18%] mx-auto w-[44%] max-w-72 md:w-[56%] text-plum transition-transform duration-700 group-hover:scale-105 md:top-[14%]">
        {loom ? <DressArt /> : <GiftArt bow="var(--sora-plum)" />}
      </motion.div>
      <motion.div style={{ y: sparkY }} className="pointer-events-none absolute inset-0">
        <Sparkle size={18} twinkle className="absolute top-[30%] left-[12%] text-white" />
        <Sparkle size={12} twinkle className="absolute top-[22%] right-[16%] text-white [animation-delay:.8s]" />
        <Sparkle size={22} twinkle className="absolute top-[58%] right-[10%] text-white [animation-delay:1.6s]" />
        {loom ? (
          <Stitch className="absolute top-[70%] left-0 w-1/2 -rotate-6 text-periwinkle" />
        ) : (
          <Bow size={40} className="absolute top-[64%] left-[10%] -rotate-12 text-lilac" />
        )}
      </motion.div>

      <div className="relative z-10 flex items-end justify-between gap-4">
        <div>
          <p className="font-display text-3xl md:text-4xl">{t.worlds[world].name}</p>
          <p className="mt-1 text-sm text-ink/75">{t.worlds[world].tagline}</p>
        </div>
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:-rotate-45">
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const [l1, l2, l3] = t.home.heroTitle;

  return (
    <section ref={ref} className="container-sora pt-8 pb-16 md:pt-14 md:pb-24">
      <div className="relative mb-10 md:mb-14">
        <p className="eyebrow mb-5 inline-flex items-center gap-2">
          <Sparkle size={12} className="text-accent" />
          {t.home.heroEyebrow}
        </p>
        <h1 className="text-display max-w-[12ch]">
          <WordsUp text={l1} delay={0} />
          <br />
          <WordsUp text={l2} delay={0.12} />
          <WordsUp text={l3} delay={0.24} className="text-plum italic" />
        </h1>
        <p
          style={{ ["--d" as string]: "0.6s", ["--r" as string]: "-4deg" }}
          className="rise-in font-hand mt-4 text-2xl text-plum md:absolute md:right-0 md:bottom-4 md:mt-0 md:text-3xl"
        >
          {t.home.heroNote} ♡
        </p>
      </div>

      <div style={{ ["--d" as string]: "0.3s" }} className="rise-in flex flex-col gap-4 md:flex-row">
        <Panel world="loom" progress={scrollYProgress} />
        <Panel world="gift" progress={scrollYProgress} />
      </div>
    </section>
  );
}
