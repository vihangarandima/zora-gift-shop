import Image from "next/image";
import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";
import { images } from "@/lib/images";
import { t } from "@/lib/i18n";

export default function NotFound() {
  return (
    <section className="container-sora flex flex-col items-center gap-6 py-16 text-center md:py-24">
      <div className="relative aspect-square w-56 overflow-hidden rounded-full shadow-soft md:w-72">
        <Image src={images.giftBox.src} alt="" fill sizes="18rem" className="object-cover" />
        <span className="absolute inset-0 grid place-items-center bg-ink/30 font-display text-7xl text-white italic">404</span>
      </div>
      <h1 className="text-h1 max-w-[16ch]">{t.pages.notFound.title}</h1>
      <p className="max-w-md text-lg text-ink/75">{t.pages.notFound.body}</p>
      <Link href="/shop" className={buttonClass({ size: "lg" })}>{t.pages.notFound.cta}</Link>
    </section>
  );
}
