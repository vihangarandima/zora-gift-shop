"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Sparkle } from "@/components/doodles";
import { GiftArt } from "@/components/doodles/Illustrations";
import { inputClass } from "@/components/cart/CheckoutForm";
import { Button, buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { confetti } from "@/lib/confetti";
import { t } from "@/lib/i18n";
import { useShop, useUI } from "@/lib/store";
import { formatPrice, siteConfig, whatsappLink, type Ribbon } from "@/site.config";

const { boxes, fillings, ribbons } = siteConfig.giftBox;
const steps = t.giftBox.steps;

const fillingEmoji: Record<string, string> = {
  "Soft toy": "🧸",
  "Hand cream": "🧴",
  Fragrance: "🌸",
  "Hair products": "🎀",
  Pouch: "👛",
  Handbag: "👜",
  Stationery: "✏️",
  "Surprise me": "✨",
};

// Spots inside the box (percent of the preview) where fillings settle.
const spots = [
  [30, 58], [50, 54], [68, 59], [40, 70], [60, 71], [26, 76], [74, 76], [50, 80],
];

function Preview({ ribbon, items, closed, boxName, card }: { ribbon: string; items: string[]; closed: boolean; boxName?: string; card: string }) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md rounded-xl2 bg-blush/50">
      <Sparkle size={18} twinkle className="absolute top-6 left-8 text-white" />
      <Sparkle size={12} twinkle className="absolute top-14 right-10 text-white [animation-delay:1s]" />
      <div className="absolute inset-x-[10%] top-[16%] bottom-0 text-plum">
        <GiftArt key={String(closed)} bow={ribbon} lidClassName={closed ? "lid-bounce" : "lid-open"} />
      </div>
      <AnimatePresence>
        {!closed &&
          items.map((it, i) => (
            <motion.span
              key={it}
              className="absolute grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-2xl shadow-soft"
              style={{ left: `${spots[i % spots.length][0]}%`, top: `${spots[i % spots.length][1]}%` }}
              initial={{ y: -160, opacity: 0, rotate: -30 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 260, damping: 14 }}
              title={it}
            >
              {fillingEmoji[it] ?? "🎁"}
            </motion.span>
          ))}
      </AnimatePresence>
      <AnimatePresence>
        {card && (
          <motion.p
            initial={{ opacity: 0, rotate: 8, y: 20 }}
            animate={{ opacity: 1, rotate: -4, y: 0 }}
            exit={{ opacity: 0 }}
            className="font-hand absolute right-4 bottom-4 max-w-[55%] rounded-xl bg-white px-3 py-2 text-lg leading-tight text-plum-deep shadow-soft"
          >
            {card.length > 60 ? `${card.slice(0, 60)}…` : card}
          </motion.p>
        )}
      </AnimatePresence>
      {boxName && <span className="eyebrow absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-white/80 px-3 py-1.5">{boxName}</span>}
    </div>
  );
}

export function GiftBoxBuilder() {
  const add = useShop((s) => s.addToCart);
  const openCart = useUI((s) => s.setCartOpen);
  const [step, setStep] = useState(0);
  const [boxId, setBoxId] = useState<string | null>(null);
  const [items, setItems] = useState<string[]>([]);
  const [wish, setWish] = useState("");
  const [ribbon, setRibbon] = useState<Ribbon>(ribbons[0]);
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [card, setCard] = useState("");
  const [closed, setClosed] = useState(false);

  const box = boxes.find((b) => b.id === boxId);
  const canNext = [!!box, items.length > 0, true, card.trim().length > 0][step];
  const last = step === steps.length - 1;

  const details = [
    `Box: ${box?.name ?? "-"}`,
    `Inside: ${items.join(", ")}${wish ? ` (${wish})` : ""}`,
    `Ribbon: ${ribbon.name}`,
    `Card${to ? ` to ${to}` : ""}${from ? ` from ${from}` : ""}: "${card}"`,
  ];
  const message = ["Hi Sora Gift House! I'd like a custom gift box 💜", "", ...details].join("\n");

  function next(e: React.MouseEvent) {
    if (!last) return setStep(step + 1);
    setClosed(true);
    confetti(e.clientX, e.clientY, 40);
  }

  function addToBag() {
    add({ key: `box:${Date.now()}`, name: `Custom ${box?.name ?? "gift box"}`, priceLKR: box?.priceLKR ?? null, world: "gift", details });
    openCart(true);
  }

  return (
    <section data-world="gift" className="container-sora grid gap-8 pb-20 lg:grid-cols-[1fr_1fr] lg:gap-14">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <p className="eyebrow mb-4 text-center">{t.giftBox.preview}</p>
        <Preview ribbon={ribbon.value} items={items} closed={closed} boxName={box?.name} card={step >= 3 ? card : ""} />
      </div>

      <div className="flex flex-col gap-6">
        <ol className="flex gap-2" aria-label="Steps">
          {steps.map((s, i) => (
            <li key={s} className="flex-1">
              <button
                type="button"
                disabled={i > step && !canNext}
                onClick={() => i <= step && (setClosed(false), setStep(i))}
                aria-current={i === step ? "step" : undefined}
                className={clsx("w-full text-left", i > step && "pointer-events-none")}
              >
                <span className={clsx("block h-1.5 rounded-full transition-colors", i <= step ? "bg-plum" : "bg-blush")} />
                <span className={clsx("mt-2 block text-xs font-bold tracking-wide uppercase", i === step ? "text-plum" : "text-ink/55")}>{i + 1}. {s}</span>
              </button>
            </li>
          ))}
        </ol>

        <AnimatePresence mode="wait">
          <motion.div key={closed ? "done" : step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="flex flex-col gap-5">
            {closed ? (
              <>
                <h2 className="text-h2">All wrapped up! 🎀</h2>
                <ul className="space-y-1 rounded-card bg-white p-5 text-sm ring-1 ring-blush">
                  {details.map((d) => <li key={d}>{d}</li>)}
                  <li className="pt-2 font-bold">{box?.priceLKR ? formatPrice(box.priceLKR) : t.giftBox.priceOnWhatsApp}</li>
                </ul>
                <div className="flex flex-wrap gap-3">
                  <a href={whatsappLink("gift", message)} target="_blank" rel="noopener noreferrer" className={buttonClass({ variant: "whatsapp", size: "lg" })}>
                    <WhatsAppIcon /> {t.giftBox.send}
                  </a>
                  <Button variant="secondary" size="lg" onClick={addToBag}>{t.giftBox.add}</Button>
                </div>
                <button type="button" onClick={() => setClosed(false)} className="min-h-11 self-start text-sm font-semibold text-plum underline underline-offset-4">Change something</button>
              </>
            ) : step === 0 ? (
              <>
                <h2 className="text-h2">{t.giftBox.boxQ}</h2>
                <div className="grid gap-3 sm:grid-cols-3">
                  {boxes.map((b, i) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBoxId(b.id)}
                      aria-pressed={boxId === b.id}
                      className={clsx("flex flex-col items-start gap-2 rounded-card bg-white p-5 text-left ring-1 transition hover:-translate-y-1 hover:shadow-soft", boxId === b.id ? "ring-2 ring-plum" : "ring-blush")}
                    >
                      <span className="text-3xl" aria-hidden style={{ fontSize: `${1.5 + i * 0.5}rem` }}>🎁</span>
                      <span className="font-display text-xl">{b.name}</span>
                      <span className="text-sm text-ink/70">{b.blurb} · {b.items}</span>
                      <span className="text-sm font-bold">{b.priceLKR ? formatPrice(b.priceLKR) : t.giftBox.priceOnWhatsApp}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : step === 1 ? (
              <>
                <h2 className="text-h2">{t.giftBox.fillQ}</h2>
                <p className="text-ink/75">{t.giftBox.fillHint}</p>
                <div className="flex flex-wrap gap-2">
                  {fillings.map((f) => {
                    const on = items.includes(f);
                    return (
                      <motion.button
                        key={f}
                        type="button"
                        whileTap={{ scale: 0.92 }}
                        onClick={() => setItems(on ? items.filter((x) => x !== f) : [...items, f])}
                        aria-pressed={on}
                        className={clsx("inline-flex min-h-12 items-center gap-2 rounded-full px-5 font-semibold ring-1 transition", on ? "bg-ink text-white ring-ink" : "bg-white ring-blush hover:ring-plum")}
                      >
                        <span aria-hidden>{fillingEmoji[f]}</span> {f}
                      </motion.button>
                    );
                  })}
                </div>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-bold">Anything special?</span>
                  <input value={wish} onChange={(e) => setWish(e.target.value)} placeholder={t.giftBox.fillNote} className={inputClass} />
                </label>
              </>
            ) : step === 2 ? (
              <>
                <h2 className="text-h2">{t.giftBox.ribbonQ}</h2>
                <div className="flex flex-wrap gap-3" role="radiogroup" aria-label={t.giftBox.ribbonQ}>
                  {ribbons.map((r) => (
                    <button
                      key={r.name}
                      type="button"
                      role="radio"
                      aria-checked={r.name === ribbon.name}
                      onClick={() => setRibbon(r)}
                      className={clsx("inline-flex min-h-12 items-center gap-3 rounded-full bg-white pr-5 pl-2 font-semibold ring-1 transition", r.name === ribbon.name ? "ring-2 ring-ink" : "ring-blush hover:ring-plum")}
                    >
                      <span className="size-8 rounded-full" style={{ background: r.value }} />
                      {r.name}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-h2">{t.giftBox.cardQ}</h2>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex flex-col gap-2"><span className="text-sm font-bold">{t.giftBox.to}</span><input value={to} onChange={(e) => setTo(e.target.value)} className={inputClass} /></label>
                  <label className="flex flex-col gap-2"><span className="text-sm font-bold">{t.giftBox.from}</span><input value={from} onChange={(e) => setFrom(e.target.value)} className={inputClass} /></label>
                </div>
                <label className="flex flex-col gap-2">
                  <span className="text-sm font-bold">Message</span>
                  <textarea value={card} onChange={(e) => setCard(e.target.value)} maxLength={240} rows={4} placeholder={t.giftBox.cardPlaceholder} className={clsx(inputClass, "font-hand text-xl")} />
                  <span className="self-end text-xs text-ink/55">{card.length}/240</span>
                </label>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {!closed && (
          <div className="flex gap-3">
            {step > 0 && <Button variant="secondary" size="lg" onClick={() => setStep(step - 1)}>{t.giftBox.back}</Button>}
            <Button size="lg" onClick={next} disabled={!canNext} className="flex-1 sm:flex-none">{last ? "Wrap it up 🎀" : t.giftBox.next}</Button>
          </div>
        )}
      </div>
    </section>
  );
}
