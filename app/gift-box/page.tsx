import type { Metadata } from "next";
import { GiftBoxBuilder } from "@/components/giftbox/GiftBoxBuilder";
import { PageHeader } from "@/components/ui/PageHeader";
import { t } from "@/lib/i18n";

export const metadata: Metadata = {
  title: t.giftBox.title,
  description: "Build a custom gift box from Sora Gift House: pick a box, fill it, choose a ribbon and write a card.",
};

export default function GiftBoxPage() {
  return (
    <>
      <PageHeader eyebrow={t.home.boxEyebrow} title={t.giftBox.title} intro={t.giftBox.intro} />
      <GiftBoxBuilder />
    </>
  );
}
