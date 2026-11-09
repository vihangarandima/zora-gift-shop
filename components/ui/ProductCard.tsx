"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { discountPercent, type Product } from "@/data/types";
import { formatPrice } from "@/site.config";
import { t } from "@/lib/i18n";
import { confetti } from "@/lib/confetti";
import { useShop, useUI } from "@/lib/store";
import { useRouter } from "next/navigation";
import { PlusIcon } from "./Icons";
import { PhotoPlaceholder } from "./PhotoPlaceholder";
import { Sticker } from "./Sticker";
import { WishlistButton } from "./WishlistButton";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const add = useShop((s) => s.addToCart);
  const openCart = useUI((s) => s.setCartOpen);
  const router = useRouter();
  const [justAdded, setJustAdded] = useState(false);
  const off = discountPercent(product);
  const [first, second] = product.images;
  const needsSize = !!product.sizes?.length;

  function quickAdd(e: React.MouseEvent) {
    // Sized items need a choice first, so send them to the product page.
    if (needsSize) return router.push(`/product/${product.slug}`);
    add({ key: product.id, productId: product.id, name: product.name, priceLKR: product.priceLKR, world: product.world });
    confetti(e.clientX, e.clientY, 18);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      openCart(true);
    }, 700);
  }

  return (
    <article data-world={product.world} data-cursor="view" className={clsx("group relative flex flex-col gap-3", className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-card bg-tint shadow-soft transition duration-500 group-hover:-translate-y-1 group-hover:shadow-lift">
        <Link href={`/product/${product.slug}`} className="absolute inset-0" aria-label={product.name}>
          {first ? (
            <>
              <Image src={first} alt={product.name} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 40vw, 75vw" className="object-cover transition duration-700 group-hover:scale-[1.03]" />
              {second && (
                <Image src={second} alt="" fill sizes="(min-width:1024px) 25vw, 75vw" className="object-cover opacity-0 transition duration-500 group-hover:opacity-100" />
              )}
            </>
          ) : (
            <PhotoPlaceholder world={product.world} />
          )}
        </Link>

        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-start justify-between">
          <div className="flex gap-2">
            {off && <Sticker>-{off}%</Sticker>}
            {product.isNew && !off && <Sticker tone="white">new</Sticker>}
          </div>
          <WishlistButton id={product.id} className="pointer-events-auto" />
        </div>

        <button
          type="button"
          onClick={quickAdd}
          className="absolute right-3 bottom-3 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white/95 px-4 text-sm font-bold text-ink shadow-soft backdrop-blur transition md:translate-y-2 md:opacity-0 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 md:group-hover:translate-y-0 md:group-hover:opacity-100"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={String(justAdded)} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }} className="inline-flex items-center gap-1.5">
              {justAdded ? `${t.product.added} 💜` : (<><PlusIcon width={16} height={16} />{needsSize ? t.product.chooseSize : t.product.quickAdd}</>)}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <div className="flex items-baseline justify-between gap-3 px-1">
        <h3 className="font-sans text-[15px] leading-snug font-semibold tracking-normal">
          <Link href={`/product/${product.slug}`} className="hover:text-plum">{product.name}</Link>
        </h3>
        <p className="shrink-0 text-right text-sm">
          <span className="font-bold">{formatPrice(product.priceLKR)}</span>
          {product.compareAtLKR && <s className="ml-1.5 block text-xs text-ink/55">{formatPrice(product.compareAtLKR)}</s>}
        </p>
      </div>
    </article>
  );
}
