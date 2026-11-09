import type { Metadata } from "next";
import { BrandStory } from "@/components/home/BrandStory";
import { EditorialBand } from "@/components/home/EditorialBand";
import { SocialWall } from "@/components/home/SocialWall";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "About",
  description: "Sora is two little shops from Polonnaruwa, Sri Lanka: Sora Loom for clothes and Sora Gift House for gifts.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About Sora" title="Two little shops from Polonnaruwa." />
      <BrandStory />
      <EditorialBand />
      <SocialWall />
    </>
  );
}
