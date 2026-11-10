import Image from "next/image";
import { Logo } from "@/components/ui/Logo";
import { ClipReveal, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";
import { t } from "@/lib/i18n";

export function BrandStory() {
  return (
    <section className="container-sora grid gap-12 py-12 md:py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
      <Reveal className="flex flex-col gap-6 lg:sticky lg:top-32 lg:self-start">
        <SectionHeading eyebrow={t.home.storyEyebrow} title={t.home.storyTitle} />
        <p className="max-w-lg text-lg leading-relaxed text-ink/80">{t.home.storyBody}</p>
        <p className="font-hand flex items-center gap-4 text-3xl text-plum">
          {t.home.storySign}
          <span aria-hidden className="h-px w-16 bg-lilac" />
        </p>
      </Reveal>

      {/* Masonry: two offset columns of mood images. */}
      <div className="grid grid-cols-2 gap-3 md:gap-5">
        <div className="flex flex-col gap-3 md:gap-5">
          <ClipReveal className="relative aspect-[3/4] overflow-hidden rounded-card"><Image src={images.giftPlush.src} alt={images.giftPlush.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" /></ClipReveal>
          <ClipReveal delay={0.15} className="grid aspect-square place-items-center rounded-card bg-plum p-6 text-center text-white">
            <p className="font-display text-lg leading-tight sm:text-2xl md:text-3xl">gifts · fashion · beauty · accessories</p>
          </ClipReveal>
        </div>
        <div className="flex flex-col gap-3 pt-12 md:gap-5 md:pt-20">
          <ClipReveal delay={0.1} className="relative grid aspect-square place-items-center rounded-card bg-white shadow-soft">
            <Logo world="loom" size={130} />
          </ClipReveal>
          <ClipReveal delay={0.25} className="relative aspect-[3/4] overflow-hidden rounded-card"><Image src={images.loomDress.src} alt={images.loomDress.alt} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover object-top" /></ClipReveal>
        </div>
      </div>
    </section>
  );
}
