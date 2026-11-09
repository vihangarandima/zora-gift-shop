"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Heart } from "@/components/doodles";
import { BagIcon, SearchIcon } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { Marquee } from "@/components/ui/Marquee";
import { t } from "@/lib/i18n";
import { cartCount, useShop, useUI } from "@/lib/store";
import { useHydrated } from "@/lib/useHydrated";

const links = [
  { href: "/shop/loom", label: t.nav.loom },
  { href: "/shop/gift", label: t.nav.gift },
  { href: "/gift-box", label: t.nav.giftBox },
  { href: "/gift-finder", label: t.nav.finder },
  { href: "/about", label: t.nav.about },
];

function Count({ n }: { n: number }) {
  return (
    <AnimatePresence>
      {n > 0 && (
        <motion.span
          key={n}
          initial={{ scale: 0.4 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 14 }}
          className="absolute -top-0.5 -right-0.5 grid min-w-5 place-items-center rounded-full bg-plum px-1 text-[11px] leading-5 font-bold text-white"
        >
          {n}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const hydrated = useHydrated();
  const bag = useShop(cartCount);
  const saved = useShop((s) => s.wishlist.length);
  const openCart = useUI((s) => s.setCartOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const iconBtn = "relative grid size-11 place-items-center rounded-full text-ink transition hover:bg-tint";

  return (
    <>
      <a href="#main" className="sr-only z-[95] rounded-full bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3">
        {t.nav.skip}
      </a>
      <div className="bg-ink py-2 text-xs font-semibold tracking-wide text-white">
        <Marquee items={[...t.announcements]} speed={36} />
      </div>
      <header className="sticky top-0 z-50 px-2 pt-2 md:px-4">
        <div
          className={clsx(
            "container-sora flex items-center justify-between gap-4 rounded-full transition-all duration-500",
            scrolled ? "h-14 bg-white/70 shadow-soft ring-1 ring-white/60 backdrop-blur-xl" : "h-18 bg-transparent",
          )}
        >
          <Link href="/" className="flex items-center gap-1 transition-transform duration-500" aria-label="Sora home">
            <Logo world="gift" size={scrolled ? 40 : 48} className="transition-all duration-500" />
            <Logo world="loom" size={scrolled ? 40 : 48} className="hidden transition-all duration-500 sm:block" />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="rounded-full px-4 py-2.5 text-sm font-semibold transition hover:bg-tint hover:text-plum">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center">
            <Link href="/shop?focus=search" className={clsx(iconBtn, "hidden sm:grid")} aria-label={t.nav.search}><SearchIcon /></Link>
            <Link href="/wishlist" className={iconBtn} aria-label={t.nav.wishlist}>
              <Heart size={20} />
              {hydrated && <Count n={saved} />}
            </Link>
            <button type="button" onClick={() => openCart(true)} className={iconBtn} aria-label={t.nav.bag}>
              <BagIcon />
              {hydrated && <Count n={bag} />}
            </button>
            <button type="button" className={clsx(iconBtn, "lg:hidden")} aria-label={t.nav.menu} aria-expanded={open} onClick={() => setOpen(true)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                <path d="M4 8h16M4 16h10" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col bg-bg px-6 pt-5 pb-10"
            initial={{ clipPath: "circle(0% at 95% 4%)" }}
            animate={{ clipPath: "circle(150% at 95% 4%)" }}
            exit={{ clipPath: "circle(0% at 95% 4%)" }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.menu}
          >
            <div className="flex items-center justify-between">
              <Logo world="gift" size={44} />
              <button type="button" onClick={() => setOpen(false)} className={iconBtn} aria-label={t.nav.close} autoFocus>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <ul className="mt-10 flex flex-col gap-2">
              {links.map((l, i) => (
                <motion.li key={l.href} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
                  <Link href={l.href} onClick={() => setOpen(false)} className="font-display block py-2 text-4xl">
                    {l.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <p className="font-hand mt-auto text-2xl text-plum">{t.footer.tagline}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
