import type { World } from "@/site.config";

/** Shaped so a CMS (Sanity / Shopify) can map onto it later. */
export type Product = {
  id: string;
  slug: string;
  world: World;
  category: string;
  name: string;
  priceLKR: number;
  compareAtLKR?: number;
  description?: string;
  images: string[]; // real photos only; empty = "photo coming soon"
  sizes?: string[];
  colours?: string[];
  occasions?: string[];
  isNew?: boolean;
  /** true for demo entries that must never ship as real stock. */
  sample?: boolean;
};

export function discountPercent(p: Pick<Product, "priceLKR" | "compareAtLKR">) {
  if (!p.compareAtLKR || p.compareAtLKR <= p.priceLKR) return null;
  return Math.round((1 - p.priceLKR / p.compareAtLKR) * 100);
}
