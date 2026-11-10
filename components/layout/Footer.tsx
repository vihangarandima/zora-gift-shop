import Link from "next/link";
import { Sparkle } from "@/components/doodles";
import { Logo, Wordmark } from "@/components/ui/Logo";
import { t } from "@/lib/i18n";
import { siteConfig, type World } from "@/site.config";

const shopLinks = [
  { href: "/shop/loom", label: t.nav.loom },
  { href: "/shop/gift", label: t.nav.gift },
  { href: "/gift-box", label: t.nav.giftBox },
  { href: "/gift-finder", label: t.nav.finder },
];
const helpLinks = [
  { href: "/faq", label: t.nav.faq },
  { href: "/policies", label: t.nav.policies },
  { href: "/contact", label: t.nav.contact },
  { href: "/about", label: t.nav.about },
];

const netName = { instagram: "Instagram", tiktok: "TikTok", youtube: "YouTube", facebook: "Facebook" } as const;

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-tint pt-20 pb-10">
      {/* Thread running along the top edge */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-10 overflow-hidden text-plum">
        {/* Twice as wide as the screen and slid by half, so the motion stays on the compositor */}
        <svg viewBox="0 0 2880 40" preserveAspectRatio="none" className="footer-thread h-10 w-[200%]">
          <path d="M0 20 C120 4 240 36 360 20 C480 36 600 4 720 20 C840 4 960 36 1080 20 C1200 36 1320 4 1440 20 C1560 4 1680 36 1800 20 C1920 36 2040 4 2160 20 C2280 4 2400 36 2520 20 C2640 36 2760 4 2880 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="8 7" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>

      <div className="container-sora">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Logo world="gift" size={56} />
              <span className="grid size-14 place-items-center rounded-full bg-white"><Logo world="loom" size={48} /></span>
            </div>
            <p className="font-hand text-2xl text-plum">{t.footer.tagline}</p>
          </div>
          {[
            [t.footer.shop, shopLinks],
            [t.footer.help, helpLinks],
          ].map(([title, list]) => (
            <nav key={title as string} aria-label={title as string}>
              <p className="eyebrow mb-4">{title as string}</p>
              <ul className="space-y-1">
                {(list as typeof shopLinks).map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="inline-block py-1.5 font-semibold hover:text-plum">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div>
            <p className="eyebrow mb-4">{t.footer.follow}</p>
            {(["loom", "gift"] as World[]).map((w) => (
              <div key={w} className="mb-4">
                <p className="mb-2 text-sm font-bold">{t.worlds[w].name}</p>
                <ul className="flex flex-wrap gap-2">
                  {siteConfig.socials[w].filter((s) => s.url).map((s) => (
                    <li key={s.url}>
                      <a href={s.url!} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full bg-white px-4 text-sm font-semibold ring-1 ring-blush transition hover:ring-plum">
                        {netName[s.network]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-16 select-none" aria-hidden>
          <Wordmark className="block text-center text-[clamp(6rem,30vw,28rem)] text-plum" />
          <Sparkle size={40} twinkle className="absolute top-[8%] left-[6%] text-lilac" />
          <Sparkle size={28} twinkle className="absolute right-[8%] bottom-[18%] text-periwinkle [animation-delay:1.4s]" />
        </div>

        <p className="mt-6 flex flex-col justify-between gap-2 text-sm text-ink/70 sm:flex-row">
          <span>© {new Date().getFullYear()} {t.footer.rights}</span>
          <span className="font-hand text-lg text-plum-deep">we wrap love</span>
        </p>
      </div>
    </footer>
  );
}
