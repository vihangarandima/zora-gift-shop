import { BrandStory } from "@/components/home/BrandStory";
import { Club } from "@/components/home/Club";
import { EditorialBand } from "@/components/home/EditorialBand";
import { Gallery } from "@/components/home/Gallery";
import { GiftBoxTeaser } from "@/components/home/GiftBoxTeaser";
import { GiftFinder } from "@/components/home/GiftFinder";
import { Hero } from "@/components/home/Hero";
import { Promises } from "@/components/home/Promises";
import { SocialWall } from "@/components/home/SocialWall";
import { WorldSection } from "@/components/home/WorldSection";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { onSale } from "@/data/products";
import { siteConfig } from "@/site.config";

function Bestsellers() {
  const items = onSale().slice(0, 4);
  // Hidden until real products exist. Star ratings only once real reviews exist.
  if (!items.length) return null;
  return (
    <section className="container-sora py-16 md:py-24">
      <SectionHeading eyebrow="Loved right now" title="Bestsellers & drop prices" className="mb-10" />
      <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
        {items.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Sora",
  url: siteConfig.url,
  logo: `${siteConfig.url}/brand/sora-gift-house.png`,
  sameAs: [...siteConfig.socials.gift, ...siteConfig.socials.loom].flatMap((s) => (s.url ? [s.url] : [])),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <Hero />
      <Gallery />
      <WorldSection />
      <Promises />
      <BrandStory />
      <EditorialBand />
      <GiftBoxTeaser />
      <GiftFinder />
      <Bestsellers />
      <SocialWall />
      {/* Testimonials: only real customer messages from the owner. Section added when they arrive. */}
      <Club />
    </>
  );
}
