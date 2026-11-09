import type { World } from "@/site.config";
import type { Product } from "./types";

/**
 * Real products only. Add photos to /public/products/<slug>-1.jpg, -2.jpg and list them in `images`.
 * Empty until the owner sends products.csv; every section shows a friendly empty state meanwhile.
 */
export const products: Product[] = [];

export const productsFor = (world: World) => products.filter((p) => p.world === world);
export const newIn = (world?: World) => products.filter((p) => p.isNew && (!world || p.world === world));
export const onSale = () => products.filter((p) => p.compareAtLKR && p.compareAtLKR > p.priceLKR);
