import clsx from "clsx";
import type { World } from "@/site.config";
import { Bow, Sparkle, Stitch } from "@/components/doodles";
import { t } from "@/lib/i18n";

/** Shown wherever a real product photo is missing. Never replace with stock or generated images. */
export function PhotoPlaceholder({ world, className }: { world: World; className?: string }) {
  return (
    <div
      className={clsx(
        "relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden",
        world === "gift" ? "bg-blush/60" : "bg-tint",
        className,
      )}
    >
      <Sparkle size={14} twinkle className="absolute top-[18%] left-[20%] text-white" />
      <Sparkle size={10} twinkle className="absolute right-[22%] bottom-[24%] text-white [animation-delay:1.2s]" />
      {world === "gift" ? (
        <Bow size={64} className="text-plum/70" />
      ) : (
        <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden className="text-plum/70">
          <path d="M32 10a5 5 0 1 1 5 5c-2 0-5 1-5 4v2M32 21 6 38h52L32 21Z" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      <p className="font-hand text-xl text-plum-deep">{t.product.photoSoon}</p>
      {world === "loom" && <Stitch className="absolute inset-x-6 bottom-5 !w-auto text-periwinkle" />}
    </div>
  );
}
