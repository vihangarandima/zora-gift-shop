import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product/ProductDetail";
import { WorldBody } from "@/components/shop/WorldBody";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { products } from "@/data/products";
import { t } from "@/lib/i18n";
import { siteConfig } from "@/site.config";

export const dynamicParams = false;
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

const find = (slug: string) => products.find((p) => p.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = find((await params).slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.description ?? `${p.name} from ${t.worlds[p.world].name}.`,
    openGraph: { images: p.images.length ? [p.images[0]] : ["/brand/sora-gift-house.png"] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = find((await params).slug);
  if (!product) notFound();

  const pairs = products
    .filter((p) => p.id !== product.id && p.world === product.world)
    .sort((a, b) => Number(a.category === product.category) - Number(b.category === product.category))
    .slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((i) => `${siteConfig.url}${i}`),
    brand: { "@type": "Brand", name: t.worlds[product.world].name },
    offers: {
      "@type": "Offer",
      priceCurrency: siteConfig.currency.code,
      price: product.priceLKR,
      availability: "https://schema.org/InStock",
      url: `${siteConfig.url}/product/${product.slug}`,
    },
  };

  return (
    <div data-world={product.world}>
      <WorldBody world={product.world} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetail product={product} />
      {pairs.length > 0 && (
        <section className="container-sora py-16 md:py-24">
          <SectionHeading eyebrow={t.worlds[product.world].name} title={t.productPage.pairs} className="mb-10" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {pairs.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}
