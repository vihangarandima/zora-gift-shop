import clsx from "clsx";
import type { World } from "@/site.config";
import { Wordmark } from "@/components/ui/Logo";
import { t } from "@/lib/i18n";

/** Shown wherever a real product photo is missing. Products must use real photos, never generated ones. */
export function PhotoPlaceholder({ world, className }: { world: World; className?: string }) {
  return (
    <div
      className={clsx(
        "relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden",
        world === "gift" ? "bg-gradient-to-br from-blush/70 to-tint" : "bg-gradient-to-br from-tint to-[color-mix(in_oklab,var(--sora-periwinkle)_22%,white)]",
        className,
      )}
    >
      <Wordmark className="text-5xl text-plum/25" />
      <p className="font-hand text-xl text-plum-deep">{t.product.photoSoon}</p>
    </div>
  );
}
