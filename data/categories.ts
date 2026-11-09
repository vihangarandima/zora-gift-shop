import type { World } from "@/site.config";

export type Category = { id: string; world: World; name: string; blurb: string };

// Taken from what the shops actually post (Instagram highlights and recent posts, see SITE_PROMPT.md).
// Adjust once the owner sends products.csv.
export const categories: Category[] = [
  { id: "dresses", world: "loom", name: "Dresses", blurb: "frocks & sundresses" },
  { id: "sleepwear", world: "loom", name: "Sleepwear", blurb: "soft nights in" },
  { id: "skirts", world: "loom", name: "Skirts", blurb: "twirl-ready" },
  { id: "shawls", world: "loom", name: "Shawls & scarves", blurb: "light, easy layers" },
  { id: "hampers", world: "gift", name: "Gift boxes & hampers", blurb: "packed with love" },
  { id: "beauty", world: "gift", name: "Beauty & fragrance", blurb: "hand creams, scents, hair" },
  { id: "plush", world: "gift", name: "Soft toys", blurb: "Labubu, Stitch & friends" },
  { id: "accessories", world: "gift", name: "Bags & accessories", blurb: "handbags, pouches, shoes" },
];

export const categoriesFor = (world: World) => categories.filter((c) => c.world === world);
