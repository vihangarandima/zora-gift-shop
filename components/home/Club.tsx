"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { confetti } from "@/lib/confetti";
import { images } from "@/lib/images";
import { t } from "@/lib/i18n";
import { whatsappLink } from "@/site.config";

/** No form, no stored numbers: joining happens inside WhatsApp itself. */
export function Club() {
  const [joined, setJoined] = useState(false);

  return (
    <section className="container-sora py-8 md:py-12">
      <div className="relative isolate overflow-hidden rounded-xl2 bg-plum-deep py-16 text-white shadow-lift md:py-24">
        <Image src={images.giftHamper.src} alt="" fill sizes="100vw" className="-z-10 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-plum-deep/85" />
        <div className="px-5 flex flex-col items-center gap-6 text-center">
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
    </section>
  );
}
