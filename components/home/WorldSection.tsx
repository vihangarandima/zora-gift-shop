"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { categoriesFor } from "@/data/categories";
import { newIn } from "@/data/products";
import { ArrowIcon } from "@/components/ui/Icons";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WorldToggle } from "@/components/ui/WorldToggle";
import { t } from "@/lib/i18n";
import { siteConfig, type World } from "@/site.config";

function Carousel({ world }: { world: World }) {
  const track = useRef<HTMLDivElement>(null);
  const items = newIn(world);

  if (!items.length) {
    const socials = siteConfig.socials[world].filter((s) => s.url);
    return (
      <div className="flex flex-col items-start gap-5 rounded-xl2 bg-white p-6 shadow-soft ring-1 ring-blush md:flex-row md:items-center md:justify-between md:p-10">
        <div className="flex items-center gap-5">
          <span className="relative size-16 shrink-0 overflow-hidden rounded-full ring-4 ring-tint">
            <Image src={categoriesFor(world)[0].image.src} alt="" fill sizes="64px" className="object-cover" />
          </span>
          <p className="max-w-md text-lg">{t.home.newInEmpty}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {socials.map((s) => (
            <a key={s.url} href={s.url!} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-bold text-white transition hover:bg-plum-deep">
              {s.handle}
            </a>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={track} className="-mx-4 overflow-hidden px-4 md:-mx-8 md:px-8">
      <motion.div drag="x" dragConstraints={track} className="flex w-max cursor-grab gap-4 active:cursor-grabbing md:gap-6">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} className="w-[70vw] max-w-80 shrink-0 sm:w-72" />
        ))}
      </motion.div>
    </div>
  );
}

function CategoryTiles({ world }: { world: World }) {
  return (
    <ul className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
      {categoriesFor(world).map((c, i) => (
        <motion.li key={c.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, ease: [0.22, 1, 0.36, 1], duration: 0.6 }}>
          <Link
            href={`/shop/${world}?category=${c.id}`}
            className={clsx(
              "group relative isolate flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-card p-4 text-white shadow-soft transition duration-500 hover:-translate-y-1 hover:shadow-lift md:p-6",
              i % 2 ? "bg-tint" : "bg-accent-soft",
            )}
          >
            <div className="absolute inset-0 -z-10 transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110">
              <Image
                src={c.image.src}
                alt=""
                fill
                sizes={c.zoom ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                className="object-cover"
                style={{ objectPosition: c.focus, transform: c.zoom ? `scale(${c.zoom})` : undefined, transformOrigin: c.focus }}
              />
            </div>
            <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
            {/* Decorative numeral, rendered as CSS content so it is not read out */}
            <span aria-hidden data-n={String(i + 1).padStart(2, "0")} className="absolute top-3 right-4 font-display text-4xl text-white/90 italic before:content-[attr(data-n)] md:text-5xl" />
            <p className="font-display relative text-2xl leading-tight md:text-3xl">{c.name}</p>
            <p className="relative text-sm text-white/85">{c.blurb}</p>
            <span className="relative mt-3 inline-flex items-center gap-1 text-sm font-bold">
              {t.cta.explore}
              <ArrowIcon width={16} height={16} className="transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.li>
      ))}
    </ul>
  );
}

export function WorldSection() {
  const [world, setWorld] = useState<World>("gift");

  return (
    <section className="container-sora py-16 md:py-24" aria-labelledby="world-title">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <SectionHeading eyebrow={t.home.worldEyebrow} title={<span id="world-title">{t.home.worldTitle}</span>} />
        <WorldToggle value={world} onChange={setWorld} className="self-start md:self-auto" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={world} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          <div className="mt-12 mb-6 flex items-baseline justify-between">
            <h3 className="text-h3">{t.home.newIn}</h3>
            <Link href={`/shop/${world}`} className="-my-3 inline-flex min-h-11 items-center text-sm font-bold text-plum-deep hover:underline">{t.cta.shop} →</Link>
          </div>
          <Carousel world={world} />

          <h3 className="text-h3 mt-16 mb-6">{t.home.categories}</h3>
          <CategoryTiles world={world} />
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
