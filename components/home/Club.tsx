"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ScallopEdge, Sparkle } from "@/components/doodles";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { confetti } from "@/lib/confetti";
import { t } from "@/lib/i18n";
import { whatsappLink } from "@/site.config";

/** No form, no stored numbers: joining happens inside WhatsApp itself. */
export function Club() {
  const [joined, setJoined] = useState(false);

  return (
    <section className="py-8">
      <ScallopEdge className="text-plum" />
      <div className="relative overflow-hidden bg-plum py-16 text-white md:py-24">
        <Sparkle size={28} twinkle className="absolute top-10 left-[8%] text-lilac" />
        <Sparkle size={18} twinkle className="absolute right-[10%] bottom-12 text-periwinkle [animation-delay:1.2s]" />
        <div className="container-sora flex flex-col items-center gap-6 text-center">
          <p className="eyebrow !text-white">{t.home.clubEyebrow}</p>
          <h2 className="text-h1 max-w-[16ch]">{t.home.clubTitle}</h2>
          <p className="max-w-md text-lg text-white">{t.home.clubBody}</p>
          <a
            href={whatsappLink("gift", "Hi Sora! Please add me to the Sora club for new drops 💜")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              confetti(e.clientX, e.clientY, 40);
              setJoined(true);
            }}
            className="inline-flex min-h-14 items-center gap-2 rounded-full bg-white px-7 font-bold text-ink shadow-lift transition hover:-translate-y-0.5 hover:bg-tint"
          >
            <WhatsAppIcon /> {t.home.clubCta}
          </a>
          <AnimatePresence>
            {joined && (
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="font-hand text-2xl" role="status">
                {t.home.clubDone}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
      <ScallopEdge className="text-plum" flip />
    </section>
  );
}
