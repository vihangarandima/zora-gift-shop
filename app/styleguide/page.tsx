import type { Metadata } from "next";
import { Bow, Heart, ScallopEdge, Sparkle, Stitch, ThreadCurl, WaveEdge } from "@/components/doodles";
import { Button } from "@/components/ui/Button";
import { ArrowIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Logo, Wordmark } from "@/components/ui/Logo";
import { Marquee } from "@/components/ui/Marquee";
import { PhotoPlaceholder } from "@/components/ui/PhotoPlaceholder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Chip, Sticker } from "@/components/ui/Sticker";
import { StyleguideDemo } from "./StyleguideDemo";

export const metadata: Metadata = { title: "Styleguide", robots: { index: false } };

const swatches = [
  ["ink", "#281B29", "text"],
  ["plum", "#8B5B9F", "primary · AA text"],
  ["plum-deep", "#6E4A80", "hover"],
  ["lilac", "#B48BCB", "gift accent · decor"],
  ["periwinkle", "#A492D2", "loom accent · decor"],
  ["mist", "#A49BBA", "borders · decor"],
  ["blush", "#DBC7E0", "surface"],
  ["tint", "#EFDFF3", "bands"],
  ["bg", "#FBF6FB", "background"],
  ["black", "#070708", "loom ink"],
] as const;

function Block({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-blush py-14 md:py-20">
      <SectionHeading eyebrow={eyebrow} title={title} className="mb-10" />
      {children}
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <div className="container-sora pb-24">
      <header className="flex flex-col gap-6 py-16 md:py-24">
        <p className="eyebrow">Sora design system · v0.1</p>
        <h1 className="text-display max-w-[14ch]">
          Soft things, made to be <em className="text-plum">loved.</em>
        </h1>
        <p className="max-w-xl text-lg text-ink/75">
          Tokens, type and pieces for Sora Loom and Sora Gift House. Every colour comes from the two logos.
        </p>
      </header>

      <Block eyebrow="Brand" title="Logos, exactly as given">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="grid place-items-center rounded-card bg-white p-8 shadow-soft"><Logo world="gift" size={140} /></div>
          <div className="grid place-items-center rounded-card bg-white p-8 shadow-soft"><Logo world="loom" size={140} /></div>
          <div className="grid place-items-center rounded-card bg-plum p-8 shadow-soft">
            <div className="grid size-36 place-items-center rounded-full bg-bg"><Logo world="loom" size={110} /></div>
          </div>
        </div>
        <p className="mt-4 text-sm text-ink/70">Loom on dark backgrounds always sits inside a light chip. Files are 150 px, so large uses take the typeset wordmark:</p>
        <Wordmark className="mt-6 block text-[clamp(5rem,22vw,16rem)] text-plum" />
      </Block>

      <Block eyebrow="Colour" title="Palette from the logos">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {swatches.map(([name, hex, role]) => (
            <li key={name} className="overflow-hidden rounded-card bg-white shadow-soft">
              <div className="h-24 ring-1 ring-black/5 ring-inset" style={{ background: hex }} />
              <div className="p-4">
                <p className="font-bold">{name}</p>
                <p className="font-mono text-sm">{hex}</p>
                <p className="text-xs text-ink/65">{role}</p>
              </div>
            </li>
          ))}
        </ul>
      </Block>

      <Block eyebrow="Type" title="Fraunces, Nunito Sans, Caveat">
        <div className="space-y-6">
          <p className="font-display text-display">Gifted with love</p>
          <h1 className="text-h1">Display heading, soft serif</h1>
          <h2 className="text-h2">Section heading for a new drop</h2>
          <h3 className="text-h3">Card heading</h3>
          <p className="eyebrow">Eyebrow label · new in</p>
          <p className="max-w-prose text-lg leading-relaxed">
            Body copy in Nunito Sans. Short, warm and friendly, like a message from a friend who happens to have very good taste.
          </p>
          <p className="font-hand text-3xl text-plum">a little note, written by hand ♡</p>
        </div>
      </Block>

      <Block eyebrow="Actions" title="Buttons and chips">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Shop now</Button>
          <Button variant="secondary">Explore</Button>
          <Button variant="ghost" icon={<ArrowIcon />}>See all</Button>
          <Button variant="whatsapp" size="lg" icon={<WhatsAppIcon />}>Order on WhatsApp</Button>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Chip active>All</Chip>
          <Chip>Dresses</Chip>
          <Chip>Hampers</Chip>
          <Chip>Birthday boxes</Chip>
        </div>
        <div className="mt-6 flex gap-4">
          <Sticker>-20%</Sticker>
          <Sticker tone="white">new</Sticker>
        </div>
      </Block>

      <StyleguideDemo />

      <Block eyebrow="Placeholders" title="When a photo is missing">
        <div className="grid max-w-xl grid-cols-2 gap-4">
          <div className="aspect-[4/5] overflow-hidden rounded-card"><PhotoPlaceholder world="loom" /></div>
          <div className="aspect-[4/5] overflow-hidden rounded-card"><PhotoPlaceholder world="gift" /></div>
        </div>
      </Block>

      <Block eyebrow="Doodles" title="Hand-drawn accents">
        <div className="flex flex-wrap items-center gap-10 text-plum">
          <Sparkle size={32} twinkle className="text-lilac" />
          <Heart size={32} />
          <Heart size={32} filled className="text-lilac" />
          <Bow size={72} />
          <ThreadCurl size={96} className="text-periwinkle" />
          <div className="w-56"><Stitch className="text-periwinkle" /></div>
        </div>
        <div className="mt-12 overflow-hidden rounded-card">
          <ScallopEdge className="text-tint" />
          <div className="bg-tint px-6 py-10 text-center font-display text-2xl">scalloped band</div>
          <WaveEdge className="text-tint" flip />
        </div>
      </Block>

      <Block eyebrow="Motion" title="Marquee strip">
        <Marquee
          className="rounded-full bg-ink py-3 text-sm font-semibold text-white"
          items={["Island-wide delivery", "Custom gift boxes", "New drop this Friday", "Order on WhatsApp"]}
        />
      </Block>
    </div>
  );
}
