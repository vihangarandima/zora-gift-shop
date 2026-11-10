/**
 * AI-generated mood images used for decoration (hero, category tiles, banners).
 * They are not product photos: products still use real photos from data/products.ts.
 * To swap one, replace the file in public/images/ and keep the name.
 */
export const images = {
  loomDress: { src: "/images/loom-dress.jpg", alt: "A lavender floral dress on a wooden hanger" },
  loomSleepwear: { src: "/images/loom-sleepwear.jpg", alt: "Lilac satin sleepwear with lace trim laid on a bed" },
  giftHamper: { src: "/images/gift-hamper.jpg", alt: "A lilac gift hamper with a soft bunny, perfume and a candle" },
  giftPlush: { src: "/images/gift-plush.jpg", alt: "An open Sora gift box with a plush toy, chocolates and a card" },
  giftBox: { src: "/images/gift-box.jpg", alt: "A lilac Sora Gift House box tied with a pink satin bow" },
} as const;

export type SiteImage = (typeof images)[keyof typeof images];
