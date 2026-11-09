import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { siteConfig } from "@/site.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/shop", "/shop/loom", "/shop/gift", "/gift-box", "/gift-finder", "/about", "/contact", "/faq", "/policies"];
  return [
    ...pages.map((p) => ({ url: `${siteConfig.url}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...products.map((p) => ({ url: `${siteConfig.url}/product/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.6 })),
  ];
}
