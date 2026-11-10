import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";
import { t } from "@/lib/i18n";
import { siteConfig } from "@/site.config";

const { fillings } = siteConfig.giftBox;

export function GiftBoxTeaser() {
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

        <div className="relative aspect-[4/5] overflow-hidden rounded-xl2 sm:aspect-square">
          <Image src={images.giftBox.src} alt={images.giftBox.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          <ul aria-label="Things you can add" className="absolute inset-x-4 bottom-4 flex flex-wrap gap-2 md:inset-x-6 md:bottom-6">
            {fillings.slice(0, 6).map((f) => (
              <li key={f} className="rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-ink shadow-soft backdrop-blur">{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
