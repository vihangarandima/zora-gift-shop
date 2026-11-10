import clsx from "clsx";
import Image from "next/image";
import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { images } from "@/lib/images";
import { t } from "@/lib/i18n";
import { siteConfig, type SocialLink, type World } from "@/site.config";

const netLabel = { instagram: "Instagram", tiktok: "TikTok", youtube: "YouTube", facebook: "Facebook" } as const;
const netVerb = { instagram: "Follow", tiktok: "Follow", youtube: "Subscribe", facebook: "Like" } as const;

type Item = SocialLink & { world: World };

// No follower counts on purpose. The big Instagram cards use mood images, not copied posts.
function Card({ item, big }: { item: Item; big?: boolean }) {
  const gift = item.world === "gift";
  return (
    <a
      href={item.url!}
      target="_blank"
      rel="noopener noreferrer"
      data-world={item.world}
      className={clsx(
        "group relative isolate flex h-full flex-col justify-between overflow-hidden rounded-card p-5 shadow-soft transition duration-500 hover:-translate-y-1 hover:shadow-lift md:p-6",
        big ? "min-h-80 md:min-h-96" : "min-h-52",
        item.network === "instagram" ? (gift ? "bg-plum text-white" : "bg-ink text-white") : "bg-white ring-1 ring-blush",
      )}
    >
      <div className="flex items-center justify-between">
        <span className={clsx("eyebrow", big ? "rounded-full bg-white/90 px-3 py-2 !text-ink backdrop-blur" : "!text-current")}>{netLabel[item.network]}</span>
        <span className="grid size-12 place-items-center rounded-full bg-white">
          <Logo world={item.world} size={item.world === "loom" ? 40 : 44} />
        </span>
      </div>
      {big && (
        <>
          <Image
            src={gift ? images.giftPlush.src : images.loomSleepwear.src}
            alt=""
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="-z-10 object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
          />
          <div aria-hidden className={clsx("absolute inset-0 -z-10 bg-gradient-to-t to-transparent", gift ? "from-plum-deep/95 via-plum-deep/40" : "from-ink/95 via-ink/40")} />
        </>
      )}
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
        <p className="font-hand text-2xl text-plum">
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
