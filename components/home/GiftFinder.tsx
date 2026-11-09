"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Sparkle } from "@/components/doodles";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { Button, buttonClass } from "@/components/ui/Button";
import { ArrowIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { confetti } from "@/lib/confetti";
import { t } from "@/lib/i18n";
import { whatsappLink } from "@/site.config";

const qs = t.finder.questions;

// Answer → category ids, in order of preference. Indexes match t.finder.questions options.
const byWho: string[][] = [
  ["dresses", "beauty", "hampers"],
  ["hampers", "accessories"],
  ["plush", "hampers"],
  ["plush", "beauty", "sleepwear"],
  ["sleepwear", "dresses", "beauty"],
];
const byOccasion: string[][] = [
  ["hampers", "plush"],
  ["hampers", "beauty", "dresses"],
  ["beauty", "accessories"],
  ["hampers", "dresses"],
  ["plush", "sleepwear", "shawls"],
];
const budgets: [number, number][] = [
  [0, 3000],
  [3000, 7500],
  [7500, Infinity],
  [0, Infinity],
];

function recommend(answers: number[]) {
  const [who, occasion, budget] = answers;
  const scores = new Map<string, number>();
  [byWho[who], byOccasion[occasion]].forEach((list) => list.forEach((id, i) => scores.set(id, (scores.get(id) ?? 0) + 3 - i)));
  const ids = [...scores].sort((a, b) => b[1] - a[1]).map(([id]) => id).slice(0, 3);
  const [lo, hi] = budgets[budget];
  const picks = products.filter((p) => ids.includes(p.category) && p.priceLKR >= lo && p.priceLKR < hi).slice(0, 4);
  return { cats: ids.map((id) => categories.find((c) => c.id === id)!), picks };
}

export function GiftFinder() {
  const [answers, setAnswers] = useState<number[]>([]);
  const step = answers.length;
  const done = step === qs.length;
  const result = done ? recommend(answers) : null;

  function answer(i: number, e: React.MouseEvent) {
    const next = [...answers, i];
    setAnswers(next);
    if (next.length === qs.length) confetti(e.clientX, e.clientY);
  }

  const summary = done ? qs.map((q, i) => `${q.q} ${q.options[answers[i]]}`).join("\n") : "";

  return (
    <section data-world="gift" className="container-sora py-16 md:py-24" aria-labelledby="finder-title">
      <div className="mx-auto max-w-3xl text-center">
        <SectionHeading align="center" eyebrow={t.home.finderEyebrow} title={<span id="finder-title">{t.home.finderTitle}</span>} note={t.home.finderNote} />

        <div className="mt-8 flex justify-center gap-2" aria-hidden>
          {qs.map((q, i) => (
            <span key={q.id} className={`h-1.5 rounded-full transition-all duration-500 ${i < step ? "w-10 bg-plum" : i === step ? "w-10 bg-lilac" : "w-4 bg-blush"}`} />
          ))}
        </div>

        <div className="relative -mx-4 mt-4 min-h-72 overflow-x-clip px-4 py-4" aria-live="polite">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }}>
                <p className="font-display mb-6 text-3xl">{qs[step].q}</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {qs[step].options.map((o, i) => (
                    <motion.button
                      key={o}
                      type="button"
                      whileHover={{ y: -3, rotate: i % 2 ? 1.5 : -1.5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => answer(i, e)}
                      className="min-h-14 rounded-full bg-white px-6 font-semibold shadow-soft ring-1 ring-blush transition-colors hover:bg-tint hover:ring-plum"
                    >
                      {o}
                    </motion.button>
                  ))}
                </div>
                {step > 0 && (
                  <button type="button" onClick={() => setAnswers(answers.slice(0, -1))} className="mt-6 min-h-11 text-sm font-semibold text-plum underline-offset-4 hover:underline">
                    ← back
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 22 }}>
                <p className="font-display mb-6 inline-flex items-center gap-2 text-3xl">
                  <Sparkle size={18} className="text-lilac" /> {t.finder.resultTitle}
                </p>
                {result!.picks.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4 text-left md:grid-cols-4">
                    {result!.picks.map((p) => <ProductCard key={p.id} product={p} />)}
                  </div>
                ) : (
                  <ul className="grid gap-3 text-left sm:grid-cols-3">
                    {result!.cats.map((c) => (
                      <li key={c.id}>
                        <Link href={`/shop/${c.world}?category=${c.id}`} className="group flex h-full flex-col justify-between gap-6 rounded-card bg-white p-5 shadow-soft ring-1 ring-blush transition hover:-translate-y-1 hover:shadow-lift">
                          <span className="eyebrow">{t.worlds[c.world].short}</span>
                          <span>
                            <span className="font-display block text-xl">{c.name}</span>
                            <span className="text-sm text-ink/70">{c.blurb}</span>
                          </span>
                          <ArrowIcon className="text-plum transition-transform group-hover:translate-x-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <a
                    href={whatsappLink("gift", `Hi Sora! Can you help me pick a gift? 💜\n${summary}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClass({ variant: "whatsapp" })}
                  >
                    <WhatsAppIcon /> {t.finder.askUs}
                  </a>
                  <Button variant="secondary" onClick={() => setAnswers([])}>{t.finder.restart}</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
