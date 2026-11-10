import clsx from "clsx";
import Image from "next/image";
import { images } from "@/lib/images";
import { t } from "@/lib/i18n";

const shots = [images.loomDress, images.giftBox, images.loomSleepwear, images.giftHamper, images.giftPlush];

/** Slow endless strip of mood images under the hero. Decorative, so hidden from screen readers. */
export function Gallery() {
  const row = (hidden?: boolean) => (
    <ul className="flex shrink-0 gap-4 pr-4 md:gap-6 md:pr-6" aria-hidden={hidden}>
      {shots.map((img, i) => (
        <li
          key={img.src}
          className={clsx(
            "relative aspect-[4/5] w-44 shrink-0 overflow-hidden rounded-card shadow-soft ring-4 ring-white sm:w-56 md:w-64",
            i % 2 ? "rotate-2" : "-rotate-2",
          )}
        >
          <Image src={img.src} alt="" fill sizes="16rem" className="object-cover" />
          <span className="font-hand absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-lg text-plum-deep backdrop-blur">
            {t.home.gallery[i]}
          </span>
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-hidden className="overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] md:py-10">
      <div className="flex w-max animate-[marquee_70s_linear_infinite] py-4 hover:[animation-play-state:paused]">
        {row()}
        {row(true)}
      </div>
    </section>
  );
}
