"use client";

import clsx from "clsx";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { WaveEdge } from "@/components/doodles";
import { images, type SiteImage } from "@/lib/images";
import { t } from "@/lib/i18n";

function Word({ word, i, progress }: { word: string; i: number; progress: MotionValue<number> }) {
  const dir = i % 2 ? 1 : -1;
  const x = useTransform(progress, [0, 1], [`${dir * -6}%`, `${dir * 6}%`]);
  return (
    <motion.span style={{ x }} className={clsx("block", i % 2 ? "pl-[12%] text-plum italic" : "")}>
      {word}
    </motion.span>
  );
}

function Panel({ image, caption, progress, speed, className }: { image: SiteImage; caption: string; progress: MotionValue<number>; speed: number; className?: string }) {
  const y = useTransform(progress, [0, 1], [speed, -speed]);
  return (
    <motion.figure style={{ y }} className={clsx("relative overflow-hidden rounded-xl2 shadow-soft", className)}>
      <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
      <figcaption className="absolute bottom-4 left-4 rounded-full bg-white/90 z-10 px-4 py-2 text-sm font-semibold backdrop-blur">{caption}</figcaption>
    </motion.figure>
  );
}

export function EditorialBand() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} className="relative overflow-hidden" aria-label={t.home.editorial.join(" ")}>
      <WaveEdge className="text-tint" />
      <div className="bg-tint pt-16 pb-28 md:pt-28 md:pb-36">
        <div className="container-sora grid items-center gap-10 lg:grid-cols-[1fr_1.2fr]">
          <p className="font-display text-[clamp(3.5rem,12vw,8rem)] leading-[0.92] tracking-[-0.04em]" aria-hidden>
            {t.home.editorial.map((w, i) => <Word key={w} word={w} i={i} progress={scrollYProgress} />)}
          </p>
          <div className="grid grid-cols-6 gap-4">
            <Panel image={images.giftHamper} caption="Sora Gift House" progress={scrollYProgress} speed={30} className="col-span-6 aspect-[16/9]" />
            <Panel image={images.loomSleepwear} caption="Sora Loom · we wrap love" progress={scrollYProgress} speed={60} className="col-span-4 col-start-2 aspect-[16/10]" />
          </div>
        </div>
      </div>
      <WaveEdge className="text-tint" flip />
    </section>
  );
}
