"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowIcon } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { WordsUp } from "@/components/ui/Reveal";
import { images } from "@/lib/images";
import { t } from "@/lib/i18n";
import type { World } from "@/site.config";

function Panel({ world, progress }: { world: World; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const imgY = useTransform(progress, [0, 1], ["0%", world === "loom" ? "8%" : "12%"]);
  const loom = world === "loom";
  const img = loom ? images.loomDress : images.giftBox;

  return (
    <Link
      href={`/shop/${world}`}
      data-world={world}
      className="group relative isolate flex min-h-[30rem] flex-1 flex-col justify-between overflow-hidden rounded-xl2 bg-tint p-5 shadow-soft transition-[flex-grow,box-shadow] duration-700 ease-[cubic-bezier(.22,1,.36,1)] hover:shadow-lift md:min-h-[38rem] md:p-8 md:hover:grow-[1.6]"
    >
      <motion.div style={{ y: imgY }} className="absolute -inset-y-[8%] inset-x-0 -z-10">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
          style={{ objectPosition: loom ? "50% 30%" : "50% 45%" }}
        />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-ink/15 to-transparent" />

      <div className="relative flex items-start justify-between">
        <span className="grid size-20 place-items-center rounded-full bg-white shadow-soft md:size-24">
          <Logo world={world} size={loom ? 72 : 88} />
        </span>
        <span className="eyebrow rounded-full bg-white/85 px-3 py-2 backdrop-blur">{loom ? "clothing" : "gifts"}</span>
      </div>

      <div className="relative flex items-end justify-between gap-4 text-white">
        <div>
          <p className="font-display text-4xl md:text-5xl">{t.worlds[world].name}</p>
          <p className="mt-1 text-sm text-white/90">{t.worlds[world].tagline}</p>
        </div>
        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-ink transition-transform duration-500 group-hover:-rotate-45">
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
        <p className="eyebrow mb-5 inline-flex items-center gap-3">
          <span aria-hidden className="h-px w-8 bg-current" />
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
