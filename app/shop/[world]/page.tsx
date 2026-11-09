import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorldBody } from "@/components/shop/WorldBody";
import { ShopView } from "@/components/shop/ShopView";
import { Logo } from "@/components/ui/Logo";
import { PageHeader } from "@/components/ui/PageHeader";
import { t } from "@/lib/i18n";
import type { World } from "@/site.config";

const worlds: World[] = ["loom", "gift"];

export const dynamicParams = false;
export function generateStaticParams() {
  return worlds.map((world) => ({ world }));
}

export async function generateMetadata({ params }: { params: Promise<{ world: string }> }): Promise<Metadata> {
  const { world } = await params;
  if (!worlds.includes(world as World)) return {};
  const w = t.worlds[world as World];
  return { title: w.name, description: `${w.name}: ${w.tagline}. Island-wide delivery in Sri Lanka.` };
}

export default async function WorldShopPage({ params }: { params: Promise<{ world: string }> }) {
  const { world } = await params;
  if (!worlds.includes(world as World)) notFound();
  const w = world as World;

  return (
    <div data-world={w}>
      <WorldBody world={w} />
      <PageHeader eyebrow={t.shop.eyebrow} title={t.worlds[w].name} intro={t.worlds[w].tagline}>
        <span className="grid size-24 place-items-center rounded-full bg-white shadow-soft">
          <Logo world={w} size={w === "loom" ? 80 : 92} />
        </span>
      </PageHeader>
      <ShopView world={w} />
    </div>
  );
}
