import type { Metadata } from "next";
import { WishlistView } from "@/components/shop/WishlistView";
import { PageHeader } from "@/components/ui/PageHeader";
import { t } from "@/lib/i18n";

export const metadata: Metadata = { title: "Wishlist", robots: { index: false } };

export default function WishlistPage() {
  return (
    <>
      <PageHeader eyebrow="Saved for later" title={t.pages.wishlist.title} />
      <WishlistView />
    </>
  );
}
