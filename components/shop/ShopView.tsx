"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { categories as allCategories, categoriesFor } from "@/data/categories";
import { products as allProducts, productsFor } from "@/data/products";
import type { Product } from "@/data/types";
import { Button, buttonClass } from "@/components/ui/Button";
import { SearchIcon } from "@/components/ui/Icons";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { ProductCard } from "@/components/ui/ProductCard";
import { Chip } from "@/components/ui/Sticker";
import { images } from "@/lib/images";
import { t } from "@/lib/i18n";
import { formatPrice, siteConfig, type World } from "@/site.config";

const PAGE = 12;
type Sort = keyof typeof t.shop.sorts;
type Facet = "sizes" | "colours" | "occasions";

const uniq = (list: Product[], key: Facet) => [...new Set(list.flatMap((p) => p[key] ?? []))].sort();

function toggle(list: string[], v: string) {
  return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
}

function ProductRow({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="flex items-center gap-4 rounded-card bg-white p-3 shadow-soft ring-1 ring-blush transition hover:-translate-y-0.5 hover:shadow-lift">
      <span className="relative size-24 shrink-0 overflow-hidden rounded-2xl">
        {product.images[0] ? <Image src={product.images[0]} alt="" fill sizes="96px" className="object-cover" /> : <PhotoPlaceholder world={product.world} className="[&_p]:hidden" />}
      </span>
      <span className="min-w-0 flex-1">
        <span className="eyebrow block">{t.worlds[product.world].short}</span>
        <span className="mt-1 block font-semibold">{product.name}</span>
        {product.description && <span className="line-clamp-1 text-sm text-ink/65">{product.description}</span>}
      </span>
      <span className="shrink-0 pr-2 font-bold">{formatPrice(product.priceLKR)}</span>
    </Link>
  );
}

function EmptyStore({ world }: { world?: World }) {
  const worlds: World[] = world ? [world] : ["gift", "loom"];
  return (
    <div className="flex flex-col items-center gap-6 rounded-xl2 bg-white px-6 py-14 text-center shadow-soft ring-1 ring-blush">
      <span className="relative size-24 overflow-hidden rounded-full ring-4 ring-tint">
        <Image src={(world === "loom" ? images.loomDress : images.giftBox).src} alt="" fill sizes="96px" className="object-cover" />
      </span>
      <h2 className="text-h2">{t.shop.emptyTitle}</h2>
      <p className="max-w-lg text-lg text-ink/75">{t.shop.emptyStore}</p>
      <div className="flex flex-wrap justify-center gap-2">
        {worlds.flatMap((w) =>
          siteConfig.socials[w]
            .filter((s) => s.url && s.network === "instagram")
            .map((s) => (
              <a key={s.url} href={s.url!} target="_blank" rel="noopener noreferrer" className={buttonClass({ variant: "whatsapp" })}>
                {s.handle}
              </a>
            )),
        )}
      </div>
    </div>
  );
}

export function ShopView({ world }: { world?: World }) {
  const products = world ? productsFor(world) : allProducts;
  const cats = world ? categoriesFor(world) : allCategories;
  const searchRef = useRef<HTMLInputElement>(null);

  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [picked, setPicked] = useState<Record<Facet, string[]>>({ sizes: [], colours: [], occasions: [] });
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sort, setSort] = useState<Sort>("new");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [shown, setShown] = useState(PAGE);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    // Read the URL after hydration (not useSearchParams) so the page stays fully pre-rendered.
    const params = new URLSearchParams(window.location.search);
    setCategory(params.get("category") ?? "all");
    setQuery(params.get("q") ?? "");
    if (params.get("focus") === "search") searchRef.current?.focus();
  }, []);

  const facets = useMemo(() => ({ sizes: uniq(products, "sizes"), colours: uniq(products, "colours"), occasions: uniq(products, "occasions") }), [products]);
  const priceCeiling = Math.max(0, ...products.map((p) => p.priceLKR));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter(
      (p) =>
        (category === "all" || p.category === category) &&
        (!q || `${p.name} ${p.description ?? ""}`.toLowerCase().includes(q)) &&
        (["sizes", "colours", "occasions"] as Facet[]).every((f) => !picked[f].length || p[f]?.some((v) => picked[f].includes(v))) &&
        (maxPrice === null || p.priceLKR <= maxPrice),
    );
    if (sort === "priceAsc") list.sort((a, b) => a.priceLKR - b.priceLKR);
    if (sort === "priceDesc") list.sort((a, b) => b.priceLKR - a.priceLKR);
    if (sort === "new") list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    return list;
  }, [products, category, query, picked, maxPrice, sort]);

  const activeCount = picked.sizes.length + picked.colours.length + picked.occasions.length + (maxPrice !== null ? 1 : 0);

  function clearAll() {
    setCategory("all");
    setQuery("");
    setPicked({ sizes: [], colours: [], occasions: [] });
    setMaxPrice(null);
  }

  if (!products.length)
    return (
      <div className="container-sora pb-16">
        <EmptyStore world={world} />
        <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {cats.map((c) => (
            <li key={c.id} data-world={c.world} className="relative isolate flex aspect-[4/5] flex-col sm:aspect-[4/3] justify-end overflow-hidden rounded-card p-4 text-white shadow-soft">
              <div className="absolute inset-0 -z-10">
                <Image src={c.image.src} alt="" fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" style={{ objectPosition: c.focus, transform: c.zoom ? `scale(${c.zoom})` : undefined, transformOrigin: c.focus }} />
              </div>
              <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
              <p className="font-display text-xl">{c.name}</p>
              <p className="text-sm text-white/85">{c.blurb}</p>
            </li>
          ))}
        </ul>
      </div>
    );

  return (
    <div className="container-sora pb-16">
      {/* Toolbar */}
      <div className="sticky top-20 z-30 -mx-4 mb-8 flex flex-col gap-3 bg-bg/85 px-4 py-3 backdrop-blur-md md:-mx-8 md:px-8">
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]" role="group" aria-label={t.shop.category}>
          <Chip active={category === "all"} onClick={() => setCategory("all")} className="shrink-0">{t.shop.all}</Chip>
          {cats.map((c) => (
            <Chip key={c.id} active={category === c.id} onClick={() => { setCategory(c.id); setShown(PAGE); }} className="shrink-0">{c.name}</Chip>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <label className="relative min-w-0 flex-1 basis-48">
            <span className="sr-only">{t.shop.search}</span>
            <SearchIcon className="absolute top-1/2 left-4 -translate-y-1/2 text-ink/50" />
            <input
              ref={searchRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.shop.search}
              className="min-h-11 w-full rounded-full bg-white pr-4 pl-11 ring-1 ring-blush outline-none focus:ring-2 focus:ring-plum"
            />
          </label>
          <Button variant="secondary" onClick={() => setFiltersOpen((v) => !v)} aria-expanded={filtersOpen}>
            {t.shop.filters}{activeCount > 0 && ` (${activeCount})`}
          </Button>
          <label className="sr-only" htmlFor="sort">{t.shop.sort}</label>
          <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="min-h-11 rounded-full bg-white px-4 text-sm font-semibold ring-1 ring-blush">
            {(Object.keys(t.shop.sorts) as Sort[]).map((s) => <option key={s} value={s}>{t.shop.sorts[s]}</option>)}
          </select>
          <div className="hidden rounded-full bg-white p-1 ring-1 ring-blush sm:flex">
            {(["grid", "list"] as const).map((v) => (
              <button key={v} type="button" onClick={() => setView(v)} aria-pressed={view === v} aria-label={t.shop[v]} className={clsx("grid size-9 place-items-center rounded-full transition", view === v ? "bg-ink text-white" : "hover:bg-tint")}>
                <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden fill="currentColor">
                  {v === "grid" ? <path d="M1 1h6v6H1zM9 1h6v6H9zM1 9h6v6H1zM9 9h6v6H9z" /> : <path d="M1 2h14v3H1zM1 7h14v3H1zM1 12h14v3H1z" />}
                </svg>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence initial={false}>
          {filtersOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="grid gap-5 rounded-card bg-white p-5 ring-1 ring-blush md:grid-cols-4">
                {(["sizes", "colours", "occasions"] as Facet[]).filter((f) => facets[f].length).map((f) => (
                  <fieldset key={f}>
                    <legend className="eyebrow mb-3">{t.shop[f === "sizes" ? "size" : f === "colours" ? "colour" : "occasion"]}</legend>
                    <div className="flex flex-wrap gap-2">
                      {facets[f].map((v) => (
                        <Chip key={v} active={picked[f].includes(v)} onClick={() => setPicked({ ...picked, [f]: toggle(picked[f], v) })}>{v}</Chip>
                      ))}
                    </div>
                  </fieldset>
                ))}
                {priceCeiling > 0 && (
                  <fieldset>
                    <legend className="eyebrow mb-3">{t.shop.price}</legend>
                    <input
                      type="range"
                      min={0}
                      max={priceCeiling}
                      step={100}
                      value={maxPrice ?? priceCeiling}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-[var(--sora-plum)]"
                      aria-label="Maximum price"
                    />
                    <p className="text-sm">up to {formatPrice(maxPrice ?? priceCeiling)}</p>
                  </fieldset>
                )}
                <div className="flex items-end">
                  <Button variant="ghost" onClick={clearAll}>{t.shop.clear}</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="mb-6 text-sm text-ink/65" aria-live="polite">{t.shop.results.replace("{n}", String(filtered.length))}</p>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-16 text-center">
          <p className="text-lg">{t.shop.emptyFiltered}</p>
          <Button variant="secondary" onClick={clearAll}>{t.shop.clear}</Button>
        </div>
      ) : view === "grid" ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-x-6 lg:grid-cols-4">
          {filtered.slice(0, shown).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.slice(0, shown).map((p) => <ProductRow key={p.id} product={p} />)}
        </div>
      )}

      {shown < filtered.length && (
        <div className="mt-12 flex justify-center">
          <Button variant="secondary" size="lg" onClick={() => setShown((n) => n + PAGE)}>{t.shop.loadMore}</Button>
        </div>
      )}
    </div>
  );
}
