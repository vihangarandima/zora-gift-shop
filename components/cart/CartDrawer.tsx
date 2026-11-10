"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { images } from "@/lib/images";
import { t } from "@/lib/i18n";
import { orderMessage, orderWorld } from "@/lib/order";
import { cartHasUnpriced, cartSubtotal, useShop, useUI } from "@/lib/store";
import { useHydrated } from "@/lib/useHydrated";
import { formatPrice, siteConfig, whatsappLink } from "@/site.config";
import { FreeDeliveryBar } from "./FreeDeliveryBar";
import { QtyStepper } from "./QtyStepper";

export function CartDrawer() {
  const open = useUI((s) => s.cartOpen);
  const setOpen = useUI((s) => s.setCartOpen);
  const lines = useShop((s) => s.cart);
  const setQty = useShop((s) => s.setQty);
  const hydrated = useHydrated();
  const subtotal = cartSubtotal(lines);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && hydrated && (
        <>
          <motion.div className="fixed inset-0 z-[70] bg-ink/30 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={t.cart.title}
            data-lenis-prevent
            className="fixed top-0 right-0 bottom-0 z-[75] flex w-full max-w-md flex-col bg-bg shadow-lift sm:rounded-l-xl2"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
          >
            <header className="flex items-center justify-between border-b border-blush px-5 py-4">
              <h2 className="text-h3">{t.cart.title}</h2>
              <button type="button" onClick={() => setOpen(false)} className="grid size-11 place-items-center rounded-full hover:bg-tint" aria-label={t.nav.close} autoFocus>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </header>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <span className="relative size-24 overflow-hidden rounded-full ring-4 ring-tint">
                  <Image src={images.giftBox.src} alt="" fill sizes="96px" className="object-cover" />
                </span>
                <p className="font-display text-2xl">{t.cart.empty}</p>
                <Link href="/shop" onClick={() => setOpen(false)} className={buttonClass({})}>{t.cta.shop}</Link>
              </div>
            ) : (
              <>
                <div className="px-5 pt-4"><FreeDeliveryBar subtotal={subtotal} /></div>
                <ul className="flex-1 space-y-3 overflow-y-auto px-5 py-4">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => (
                      <motion.li key={l.key} layout exit={{ opacity: 0, x: 40 }} className="flex gap-3 rounded-card bg-white p-3 shadow-soft">
                        <span className="relative size-16 shrink-0 overflow-hidden rounded-2xl bg-tint" aria-hidden>
                          <Image src={(l.world === "loom" ? images.loomDress : images.giftBox).src} alt="" fill sizes="64px" className="object-cover" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="leading-snug font-semibold">{l.name}</p>
                          {l.details?.map((d) => <p key={d} className="truncate text-xs text-ink/65">{d}</p>)}
                          <div className="mt-2 flex items-center justify-between">
                            <QtyStepper value={l.qty} onChange={(q) => setQty(l.key, q)} />
                            <span className="text-sm font-bold">{l.priceLKR === null ? t.cart.priceOnWhatsApp : formatPrice(l.priceLKR * l.qty)}</span>
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
                <footer className="space-y-3 border-t border-blush px-5 pt-4 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
                  <p className="flex justify-between font-bold">
                    <span>{t.cart.subtotal}</span>
                    <span>{formatPrice(subtotal)}{cartHasUnpriced(lines) && " +"}</span>
                  </p>
                  <p className="text-xs text-ink/65">{siteConfig.delivery.fee === null ? t.cart.deliveryConfirm : t.cart.deliveryAtCheckout}</p>
                  <Link href="/checkout" onClick={() => setOpen(false)} className={buttonClass({ size: "lg", className: "w-full" })}>{t.cart.checkout}</Link>
                  <a
                    href={whatsappLink(orderWorld(lines), orderMessage(lines))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={buttonClass({ variant: "secondary", className: "w-full" })}
                  >
                    <WhatsAppIcon /> {t.cart.quickWhatsApp}
                  </a>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
