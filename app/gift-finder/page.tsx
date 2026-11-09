import type { Metadata } from "next";
import { GiftFinder } from "@/components/home/GiftFinder";

export const metadata: Metadata = {
  title: "Gift finder",
  description: "Three tiny questions to find the right gift from Sora.",
};

export default function GiftFinderPage() {
  return (
    <div className="pt-6 md:pt-12">
      <GiftFinder />
    </div>
  );
}
