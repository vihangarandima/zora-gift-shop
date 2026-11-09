import type { MetadataRoute } from "next";
import { siteConfig } from "@/site.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/checkout", "/wishlist", "/styleguide"] },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
