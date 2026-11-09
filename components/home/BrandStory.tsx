import { Sparkle, ThreadCurl } from "@/components/doodles";
import { Logo } from "@/components/ui/Logo";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { ClipReveal, Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { t } from "@/lib/i18n";

export function BrandStory() {
  return (
    <section className="container-sora grid gap-12 py-16 md:py-28 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
      <Reveal className="flex flex-col gap-6 lg:sticky lg:top-32 lg:self-start">
        <SectionHeading eyebrow={t.home.storyEyebrow} title={t.home.storyTitle} />
        <p className="max-w-lg text-lg leading-relaxed text-ink/80">{t.home.storyBody}</p>
        <p className="font-hand flex items-center gap-3 text-3xl text-plum">
          {t.home.storySign}
          <ThreadCurl size={72} className="text-lilac" />
        </p>
      </Reveal>

      {/* Masonry: two offset columns. Photo tiles stay placeholders until real photos arrive. */}
      <div className="grid grid-cols-2 gap-3 md:gap-5">
        <div className="flex flex-col gap-3 md:gap-5">
          <ClipReveal className="aspect-[3/4] overflow-hidden rounded-card"><PhotoPlaceholder world="gift" /></ClipReveal>
          <ClipReveal delay={0.15} className="grid aspect-square place-items-center rounded-card bg-plum p-6 text-center text-white">
            <p className="font-display text-lg leading-tight sm:text-2xl md:text-3xl">gifts · fashion · beauty · accessories</p>
          </ClipReveal>
        </div>
        <div className="flex flex-col gap-3 pt-12 md:gap-5 md:pt-20">
          <ClipReveal delay={0.1} className="relative grid aspect-square place-items-center rounded-card bg-white shadow-soft">
            <Logo world="loom" size={130} />
            <Sparkle size={16} twinkle className="absolute top-5 right-6 text-periwinkle" />
          </ClipReveal>
          <ClipReveal delay={0.25} className="aspect-[3/4] overflow-hidden rounded-card"><PhotoPlaceholder world="loom" /></ClipReveal>
        </div>
      </div>
    </section>
  );
}
