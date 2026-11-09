import type { Metadata } from "next";
import { ShopView } from "@/components/shop/ShopView";
import { PageHeader } from "@/components/ui/PageHeader";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Shop",
  description: "Clothes from Sora Loom and gifts from Sora Gift House, delivered island-wide in Sri Lanka.",
};

export default function ShopPage() {
  return (
    <>
      <PageHeader eyebrow={t.shop.eyebrow} title={t.shop.allTitle} />
      <ShopView />
    </>
  );
}
