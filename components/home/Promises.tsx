import { GiftIcon, HeartLineIcon, TruckIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { t } from "@/lib/i18n";

const icons = [TruckIcon, GiftIcon, HeartLineIcon, WhatsAppIcon];

export function Promises() {
  return (
    <section className="container-sora py-10 md:py-16" aria-labelledby="promise-title">
      <div className="relative isolate overflow-hidden rounded-xl2 bg-gradient-to-br from-plum-deep via-plum-deep to-ink px-6 py-10 text-white shadow-lift md:px-12 md:py-14">
        <span aria-hidden className="aura-blob -top-24 -right-24 -z-10 size-80 bg-lilac/40" />
        <span aria-hidden className="aura-blob -bottom-32 -left-20 -z-10 size-72 bg-periwinkle/30 [animation-delay:-9s]" />
        <h2 id="promise-title" className="eyebrow !text-white/80">{t.home.promiseEyebrow}</h2>
        <div role="list" className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {t.home.promises.map((p, i) => {
            const Icon = icons[i];
            return (
              <Reveal role="listitem" key={p.title} delay={i * 0.08} className="flex flex-col gap-3 lg:border-l lg:border-white/15 lg:pl-6 lg:first:border-0 lg:first:pl-0">
                <span className="grid size-12 place-items-center rounded-full bg-white/10 ring-1 ring-white/20">
                  <Icon width={22} height={22} />
                </span>
                <p className="font-display text-2xl">{p.title}</p>
                <p className="text-sm leading-relaxed text-white/80">{p.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
