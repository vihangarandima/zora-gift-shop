import clsx from "clsx";
import { Heart, Sparkle } from "@/components/doodles";
import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { t } from "@/lib/i18n";
import { siteConfig, type SocialLink, type World } from "@/site.config";

const netLabel = { instagram: "Instagram", tiktok: "TikTok", youtube: "YouTube", facebook: "Facebook" } as const;
const netVerb = { instagram: "Follow", tiktok: "Follow", youtube: "Subscribe", facebook: "Like" } as const;

type Item = SocialLink & { world: World };

// No follower counts or post thumbnails here on purpose: only real screenshots/posts may go on this wall.
function Card({ item, big }: { item: Item; big?: boolean }) {
  const gift = item.world === "gift";
  return (
    <a
      href={item.url!}
      target="_blank"
      rel="noopener noreferrer"
      data-world={item.world}
      className={clsx(
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-card p-5 shadow-soft transition duration-500 hover:-translate-y-1 hover:shadow-lift md:p-6",
        big ? "min-h-72" : "min-h-52",
        item.network === "instagram" ? (gift ? "bg-plum text-white" : "bg-ink text-white") : "bg-white ring-1 ring-blush",
      )}
    >
      <div className="flex items-center justify-between">
        <span className="eyebrow !text-current">{netLabel[item.network]}</span>
        <span className="grid size-12 place-items-center rounded-full bg-white">
          <Logo world={item.world} size={item.world === "loom" ? 40 : 44} />
        </span>
      </div>
      {big && <Heart size={64} className="absolute -right-2 bottom-16 rotate-12 opacity-20 transition-transform duration-700 group-hover:scale-125" />}
      <div>
        <p className="font-display text-2xl md:text-3xl">{item.handle}</p>
        <p className="mt-1 text-sm">{t.worlds[item.world].name}</p>
        <span
          className={clsx(
            "mt-4 inline-flex min-h-11 items-center rounded-full px-5 text-sm font-bold transition group-hover:scale-105",
            item.network === "instagram" ? "bg-white text-ink" : "bg-ink text-white",
          )}
        >
          {netVerb[item.network]}
        </span>
      </div>
    </a>
  );
}

export function SocialWall() {
  const items: Item[] = (["gift", "loom"] as World[]).flatMap((w) => siteConfig.socials[w].filter((s) => s.url).map((s) => ({ ...s, world: w })));
  const insta = items.filter((i) => i.network === "instagram");
  const rest = items.filter((i) => i.network !== "instagram");

  return (
    <section className="container-sora py-16 md:py-24">
      <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <SectionHeading eyebrow={t.home.socialEyebrow} title={t.home.socialTitle} />
        <p className="font-hand flex items-center gap-2 text-2xl text-plum">
          <Sparkle size={14} className="text-lilac" />
          {t.home.socialNote}
        </p>
      </div>
      <div className="grid gap-3 md:grid-cols-2 md:gap-5">
        {insta.map((i, n) => (
          <Reveal key={i.url} delay={n * 0.08}>
            <Card item={i} big />
          </Reveal>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 md:mt-5 md:gap-5 lg:grid-cols-3">
        {rest.map((i, n) => (
          <Reveal key={i.url} delay={0.1 + n * 0.08} className={clsx(rest.length % 2 && n === rest.length - 1 && "col-span-2 lg:col-span-1")}>
            <Card item={i} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
