"use client";

import { useState } from "react";
import { Sparkle } from "@/components/doodles";
import { GiftArt } from "@/components/doodles/Illustrations";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { t } from "@/lib/i18n";
import { siteConfig, type Ribbon } from "@/site.config";

const { ribbons } = siteConfig.giftBox;

export function GiftBoxTeaser() {
  const [ribbon, setRibbon] = useState<Ribbon>(ribbons[0]);

  return (
    <section data-world="gift" className="container-sora py-16 md:py-28">
      <div className="grid items-center gap-10 overflow-hidden rounded-xl2 bg-white p-6 shadow-soft ring-1 ring-blush md:p-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="flex flex-col gap-6">
          <SectionHeading eyebrow={t.home.boxEyebrow} title={t.home.boxTitle} />
          <p className="max-w-md text-lg text-ink/80">{t.home.boxBody}</p>
          <ol className="grid grid-cols-2 gap-3">
            {t.home.boxSteps.map((s, i) => (
              <li key={s} className="flex items-center gap-3 rounded-2xl bg-tint px-4 py-3 text-sm font-semibold">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-plum text-white">{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
          <div>
            <ButtonLink href="/gift-box" size="lg">{t.cta.buildBox}</ButtonLink>
          </div>
        </Reveal>

        <div className="relative flex flex-col items-center gap-6 rounded-xl2 bg-blush/50 px-6 pt-10 pb-8">
          <Sparkle size={20} twinkle className="absolute top-6 left-8 text-white" />
          <Sparkle size={14} twinkle className="absolute top-16 right-10 text-white [animation-delay:1s]" />
          <div className="w-full max-w-72 text-plum">
            {/* Re-keyed on every pick so the lid bounces again */}
            <GiftArt key={ribbon.name} bow={ribbon.value} lidClassName="lid-bounce" />
          </div>
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm font-semibold">Try a ribbon: <span className="text-plum-deep">{ribbon.name}</span></p>
            <div className="flex gap-3" role="radiogroup" aria-label="Ribbon colour">
              {ribbons.map((r) => (
                <button
                  key={r.name}
                  role="radio"
                  aria-checked={r.name === ribbon.name}
                  aria-label={r.name}
                  onClick={() => setRibbon(r)}
                  className="grid size-11 place-items-center rounded-full bg-white shadow-soft transition hover:scale-110 aria-checked:ring-2 aria-checked:ring-ink"
                >
                  <span className="size-6 rounded-full" style={{ background: r.value }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
