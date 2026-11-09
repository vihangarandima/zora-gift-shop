import clsx from "clsx";
import Image from "next/image";
import type { World } from "@/site.config";
import { t } from "@/lib/i18n";

// Source files are 150px, so never render them larger than that (see BRAND.md logo rules).
const files: Record<World, string> = {
  gift: "/brand/sora-gift-house.png",
  loom: "/brand/sora-loom.png",
};

export function Logo({ world, size = 56, className }: { world: World; size?: number; className?: string }) {
  const px = Math.min(size, 150);
  return (
    <Image
      src={files[world]}
      alt={t.worlds[world].name}
      width={px}
      height={px}
      className={clsx("select-none", world === "loom" && "min-w-14", className)}
      priority
    />
  );
}

/** Typeset wordmark for large uses until high-res logo files arrive. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={clsx("font-display leading-[.8] tracking-[-0.04em]", className)}>
      SORA
    </span>
  );
}
