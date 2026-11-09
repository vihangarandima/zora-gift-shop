"use client";

import { useState } from "react";
import type { Product } from "@/data/types";
import type { World } from "@/site.config";
import { ProductCard } from "@/components/ui/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WorldToggle } from "@/components/ui/WorldToggle";

// Styleguide-only demo entries (no photos, sample prices). Never imported by real pages.
const demo: Product[] = [
  { id: "demo-1", slug: "demo-1", world: "loom", category: "dresses", name: "Sample dress", priceLKR: 4500, images: [], isNew: true, sample: true },
  { id: "demo-2", slug: "demo-2", world: "loom", category: "sleepwear", name: "Sample sleepwear set", priceLKR: 3200, compareAtLKR: 4000, images: [], sample: true },
  { id: "demo-3", slug: "demo-3", world: "gift", category: "hampers", name: "Sample hamper", priceLKR: 8900, images: [], isNew: true, sample: true },
  { id: "demo-4", slug: "demo-4", world: "gift", category: "birthday", name: "Sample birthday box", priceLKR: 5600, compareAtLKR: 7000, images: [], sample: true },
];

export function StyleguideDemo() {
  const [world, setWorld] = useState<World>("gift");
  return (
    <section className="border-t border-blush py-14 md:py-20">
      <SectionHeading eyebrow="Components" title="Choose your world" className="mb-8" />
      <WorldToggle value={world} onChange={setWorld} />
      <p className="mt-4 text-sm text-ink/70">The switch re-colours the accent token on the whole page. Cards below are styleguide samples.</p>
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
        {demo.filter((p) => p.world === world).concat(demo.filter((p) => p.world !== world)).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
