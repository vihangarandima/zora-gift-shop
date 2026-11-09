/**
 * Everything the owner may want to change lives here.
 * Items marked TODO are waiting for the owner (see BRAND.md, "Missing").
 */

export type World = "loom" | "gift";
export type Season = "none" | "valentine" | "avurudu" | "christmas";

export const siteConfig = {
  name: "Sora",
  url: "https://example.com", // TODO: real domain
  currency: { code: "LKR", symbol: "Rs." },

  whatsapp: {
    // International format, digits only. TODO: confirm which number takes website orders.
    gift: "94706008576",
    loom: "94741896530",
  } satisfies Record<World, string>,

  delivery: {
    fee: null as number | null, // TODO: delivery fee in LKR
    freeOver: null as number | null, // TODO: free-delivery threshold in LKR
  },

  /** "none" | "valentine" | "avurudu" | "christmas": adds themed doodles at the page edges (desktop). */
  season: "none" as Season,

  /** Loom size chart. null shows "message us for sizing". TODO: real measurements, e.g.
   *  { columns: ["Size", "Bust (in)", "Waist (in)", "Length (in)"], rows: [["S", "32", "26", "44"], …] } */
  sizeGuide: null as { columns: string[]; rows: string[][] } | null,

  /** Gift box builder options. priceLKR null = confirmed on WhatsApp. TODO: real sizes and prices. */
  giftBox: {
    boxes: [
      { id: "petite", name: "Petite box", blurb: "a sweet little hello", items: "2–3 little things", priceLKR: null as number | null },
      { id: "classic", name: "Classic box", blurb: "our everyday favourite", items: "4–5 things", priceLKR: null as number | null },
      { id: "grand", name: "Grand hamper", blurb: "for the big moments", items: "6+ things", priceLKR: null as number | null },
    ],
    // What customers can ask us to put inside. Matches the Gift House categories.
    fillings: ["Soft toy", "Hand cream", "Fragrance", "Hair products", "Pouch", "Handbag", "Stationery", "Surprise me"],
    ribbons: [
      { name: "Plum", value: "#8b5b9f" },
      { name: "Lilac", value: "#b48bcb" },
      { name: "Periwinkle", value: "#a492d2" },
      { name: "Ink", value: "#281b29" },
    ],
  },

  socials: {
    loom: [
      { network: "instagram", handle: "@_sora_loom_", url: "https://www.instagram.com/_sora_loom_/" },
      { network: "tiktok", handle: "@sora_loom__", url: "https://www.tiktok.com/@sora_loom__" },
      { network: "facebook", handle: "Sora Loom", url: null }, // TODO: Facebook URL
    ],
    gift: [
      { network: "instagram", handle: "@_sora_gift_house_", url: "https://www.instagram.com/_sora_gift_house_/" },
      { network: "tiktok", handle: "@sora_gift_house_", url: "https://www.tiktok.com/@sora_gift_house_" },
      { network: "youtube", handle: "@soragifthouse", url: "https://www.youtube.com/@soragifthouse" },
      { network: "facebook", handle: "Sora Gift House", url: null }, // TODO: Facebook URL
    ],
  },
} as const;

export type Ribbon = (typeof siteConfig.giftBox.ribbons)[number];
export type SocialLink = (typeof siteConfig.socials)[World][number];

export function formatPrice(lkr: number) {
  return `${siteConfig.currency.symbol} ${lkr.toLocaleString("en-LK")}`;
}

export function whatsappLink(world: World, message: string) {
  return `https://wa.me/${siteConfig.whatsapp[world]}?text=${encodeURIComponent(message)}`;
}
