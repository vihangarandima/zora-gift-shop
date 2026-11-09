"use client";

import Link from "next/link";
import { Heart } from "@/components/doodles";
import { products } from "@/data/products";
import { buttonClass } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { t } from "@/lib/i18n";
import { useShop } from "@/lib/store";
import { useHydrated } from "@/lib/useHydrated";

export function WishlistView() {
  const ids = useShop((s) => s.wishlist);
  const hydrated = useHydrated();
  const saved = products.filter((p) => ids.includes(p.id));

  if (!hydrated) return <div className="min-h-96" />;
  if (!saved.length)
    return (
      <div className="container-sora flex flex-col items-center gap-5 pb-20 text-center">
        <Heart size={64} className="text-lilac" />
        <p className="max-w-md text-lg">{t.pages.wishlist.empty}</p>
        <Link href="/shop" className={buttonClass({})}>{t.cta.shop}</Link>
      </div>
    );

  return (
    <div className="container-sora grid grid-cols-2 gap-x-4 gap-y-10 pb-20 lg:grid-cols-4">
      {saved.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}
