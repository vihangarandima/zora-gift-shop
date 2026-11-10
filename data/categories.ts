import { images, type SiteImage } from "@/lib/images";
import type { World } from "@/site.config";

/** `focus` (CSS object-position) and `zoom` crop the tile image, so a shared image shows a different detail on each tile. */
export type Category = { id: string; world: World; name: string; blurb: string; image: SiteImage; focus?: string; zoom?: number };

// Taken from what the shops actually post (Instagram highlights and recent posts, see SITE_PROMPT.md).
// Adjust once the owner sends products.csv.
export const categories: Category[] = [
  { id: "dresses", world: "loom", name: "Dresses", blurb: "frocks & sundresses", image: images.loomDress, focus: "50% 40%" },
  { id: "sleepwear", world: "loom", name: "Sleepwear", blurb: "soft nights in", image: images.loomSleepwear, focus: "45% 50%" },
  { id: "skirts", world: "loom", name: "Skirts", blurb: "twirl-ready", image: images.loomDress, focus: "45% 92%", zoom: 1.8 },
  { id: "shawls", world: "loom", name: "Shawls & scarves", blurb: "light, easy layers", image: images.loomSleepwear, focus: "30% 30%", zoom: 1.7 },
  { id: "hampers", world: "gift", name: "Gift boxes & hampers", blurb: "packed with love", image: images.giftHamper, focus: "40% 60%" },
  { id: "beauty", world: "gift", name: "Beauty & fragrance", blurb: "hand creams, scents, hair", image: images.giftHamper, focus: "62% 50%", zoom: 2 },
  { id: "plush", world: "gift", name: "Soft toys", blurb: "Labubu, Stitch & friends", image: images.giftPlush, focus: "55% 50%" },
  { id: "accessories", world: "gift", name: "Bags & accessories", blurb: "handbags, pouches, shoes", image: images.giftBox, focus: "50% 50%" },
];

export const categoriesFor = (world: World) => categories.filter((c) => c.world === world);
