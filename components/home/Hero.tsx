"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Aura } from "@/components/ui/Aura";
import { ButtonLink } from "@/components/ui/Button";
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
    <section ref={ref} className="relative isolate">
      <Aura className="[mask-image:linear-gradient(#000_75%,transparent)]" />
      <div className="container-sora pt-8 pb-6 md:pt-14 md:pb-10">
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
        <p style={{ ["--d" as string]: "0.4s" }} className="rise-in mt-6 max-w-xl text-lg leading-relaxed text-ink/80">
          {t.home.heroBody}
        </p>
        <div style={{ ["--d" as string]: "0.5s" }} className="rise-in mt-7 flex flex-wrap gap-3">
          <ButtonLink href="/shop" size="lg">
            {t.home.heroCtaShop} <ArrowIcon width={18} height={18} />
          </ButtonLink>
          <ButtonLink href="/gift-box" size="lg" variant="secondary">{t.cta.buildBox}</ButtonLink>
        </div>
        {/* Desktop: two tilted photos fill the space beside the headline */}
        <div aria-hidden style={{ ["--d" as string]: "0.45s" }} className="rise-in pointer-events-none absolute top-0 right-[4%] hidden h-96 w-[24rem] lg:block">
          <div className="absolute top-24 left-0 z-10 w-48 -rotate-6 overflow-hidden rounded-card shadow-lift ring-4 ring-white">
            <div className="relative aspect-[4/5]"><Image src={images.giftHamper.src} alt="" fill sizes="12rem" className="object-cover" /></div>
          </div>
          <div className="absolute top-0 right-0 w-52 rotate-3 overflow-hidden rounded-card shadow-lift ring-4 ring-white">
            <div className="relative aspect-[4/5]"><Image src={images.loomSleepwear.src} alt="" fill sizes="13rem" className="object-cover" /></div>
          </div>
        </div>
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
      </div>
    </section>
  );
}
