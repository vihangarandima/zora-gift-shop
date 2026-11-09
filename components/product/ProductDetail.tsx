"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { categories } from "@/data/categories";
import { discountPercent, type Product } from "@/data/types";
import { inputClass } from "@/components/cart/CheckoutForm";
import { Button, buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { Chip, Sticker } from "@/components/ui/Sticker";
import { WishlistButton } from "@/components/ui/WishlistButton";
import { confetti } from "@/lib/confetti";
import { t } from "@/lib/i18n";
import { useShop, useUI } from "@/lib/store";
import { formatPrice, siteConfig, whatsappLink } from "@/site.config";
import { SizeGuide } from "./SizeGuide";

function Gallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const frame = useRef<HTMLDivElement>(null);
  const src = product.images[active];

  function pointer(e: React.MouseEvent) {
    const r = frame.current!.getBoundingClientRect();
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  }

  return (
    <div className="flex flex-col gap-3 lg:sticky lg:top-28">
      <div
        ref={frame}
        className={clsx("relative aspect-[4/5] overflow-hidden rounded-xl2 bg-tint shadow-soft", src && "cursor-zoom-in")}
        onPointerMove={(e) => zoom && pointer(e)}
        onPointerLeave={() => setZoom(null)}
        onClick={(e) => (zoom ? setZoom(null) : src && pointer(e))}
      >
        {src ? (
          <Image
            src={src}
            alt={product.name}
            fill
            priority
            sizes="(min-width:1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-300"
            style={zoom ? { transform: "scale(2.2)", transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
          />
        ) : (
          <PhotoPlaceholder world={product.world} />
        )}
        {src && !zoom && <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold">{t.productPage.zoom}</span>}
      </div>
      {product.images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto">
          {product.images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Photo ${i + 1}`}
              aria-current={i === active}
              className={clsx("relative size-20 shrink-0 overflow-hidden rounded-2xl ring-2 transition", i === active ? "ring-plum" : "ring-transparent opacity-70 hover:opacity-100")}
            >
              <Image src={img} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProductDetail({ product }: { product: Product }) {
  const add = useShop((s) => s.addToCart);
  const openCart = useUI((s) => s.setCartOpen);
  const [size, setSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);
  const [wrap, setWrap] = useState(false);
  const [message, setMessage] = useState("");
  const [guide, setGuide] = useState(false);
  const off = discountPercent(product);
  const category = categories.find((c) => c.id === product.category);
  const needsSize = !!product.sizes?.length;

  function addToBag(e: React.MouseEvent) {
    if (needsSize && !size) {
      setSizeError(true);
      return;
    }
    const details = [size && `Size: ${size}`, wrap && `Gift wrap${message ? `, card: "${message}"` : ""}`].filter(Boolean) as string[];
    add({ key: [product.id, size, wrap && message].filter(Boolean).join(":"), productId: product.id, name: product.name, priceLKR: product.priceLKR, world: product.world, details });
    confetti(e.clientX, e.clientY, 24);
    setTimeout(() => openCart(true), 500);
  }

  const ask = whatsappLink(product.world, `Hi ${t.worlds[product.world].name}! I have a question about "${product.name}" ${siteConfig.url}/product/${product.slug}`);

  return (
    <section className="container-sora grid gap-10 pt-8 pb-32 md:pt-12 lg:grid-cols-2 lg:gap-16 lg:pb-16">
      <Gallery product={product} />

      <div className="flex flex-col gap-6">
        <nav aria-label="Breadcrumb" className="text-sm text-ink/65">
          <Link href={`/shop/${product.world}`} className="hover:text-plum">{t.worlds[product.world].name}</Link>
          {category && <> / <Link href={`/shop/${product.world}?category=${category.id}`} className="hover:text-plum">{category.name}</Link></>}
        </nav>
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-h1">{product.name}</h1>
          <WishlistButton id={product.id} className="shrink-0" />
        </div>
        <p className="flex items-center gap-3 text-2xl">
          <span className="font-bold">{formatPrice(product.priceLKR)}</span>
          {product.compareAtLKR && <s className="text-lg text-ink/55">{formatPrice(product.compareAtLKR)}</s>}
          {off && <Sticker className="!size-12 text-[10px]">-{off}%</Sticker>}
        </p>
        {product.description && <p className="max-w-prose text-lg leading-relaxed text-ink/80">{product.description}</p>}

        {needsSize && (
          <fieldset>
            <div className="mb-3 flex items-center justify-between">
              <legend className="eyebrow">{t.productPage.size}</legend>
              {product.world === "loom" && (
                <button type="button" onClick={() => setGuide(true)} className="min-h-11 text-sm font-semibold text-plum underline underline-offset-4">{t.productPage.sizeGuide}</button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes!.map((s) => (
                <Chip key={s} active={size === s} onClick={() => { setSize(s); setSizeError(false); }} className="min-w-14">{s}</Chip>
              ))}
            </div>
            <AnimatePresence>
              {sizeError && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 text-sm font-semibold text-plum-deep" role="alert">{t.productPage.chooseSize} 💜</motion.p>}
            </AnimatePresence>
          </fieldset>
        )}

        {product.world === "gift" && (
          <div className="rounded-card bg-white p-4 ring-1 ring-blush">
            <label className="flex min-h-11 cursor-pointer items-center gap-3 font-semibold">
              <input type="checkbox" checked={wrap} onChange={(e) => setWrap(e.target.checked)} className="size-5 accent-[var(--sora-plum)]" />
              {t.productPage.giftWrap}
            </label>
            <AnimatePresence initial={false}>
              {wrap && (
                <motion.label initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="block overflow-hidden">
                  <span className="mt-3 mb-2 block text-sm font-bold">{t.productPage.giftMessage}</span>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} maxLength={200} rows={3} className={inputClass} placeholder={t.giftBox.cardPlaceholder} />
                </motion.label>
              )}
            </AnimatePresence>
          </div>
        )}

        <div className="hidden gap-3 sm:flex">
          <Button size="lg" onClick={addToBag} className="flex-1">{t.productPage.addToBag}</Button>
          <a href={ask} target="_blank" rel="noopener noreferrer" className={buttonClass({ variant: "secondary", size: "lg" })}>
            <WhatsAppIcon /> {t.productPage.ask}
          </a>
        </div>
      </div>

      {/* Sticky bar on phones */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-blush bg-bg/95 px-4 pt-3 pb-[max(.75rem,env(safe-area-inset-bottom))] backdrop-blur sm:hidden">
        <a href={ask} target="_blank" rel="noopener noreferrer" aria-label={t.productPage.ask} className={buttonClass({ variant: "secondary", size: "lg", className: "!px-4" })}>
          <WhatsAppIcon />
        </a>
        <Button size="lg" onClick={addToBag} className="flex-1">
          {t.productPage.addToBag} · {formatPrice(product.priceLKR)}
        </Button>
      </div>

      <SizeGuide open={guide} onClose={() => setGuide(false)} />
    </section>
  );
}
