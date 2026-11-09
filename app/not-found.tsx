import Link from "next/link";
import { Sparkle } from "@/components/doodles";
import { GiftArt } from "@/components/doodles/Illustrations";
import { buttonClass } from "@/components/ui/Button";
import { t } from "@/lib/i18n";

export default function NotFound() {
  return (
    <section className="container-sora flex flex-col items-center gap-6 py-16 text-center md:py-24">
      <div className="relative w-56 text-plum md:w-72">
        <GiftArt bow="var(--sora-lilac)" lidClassName="lid-open" />
        <Sparkle size={20} twinkle className="absolute top-2 -left-4 text-lilac" />
        <Sparkle size={14} twinkle className="absolute top-10 -right-2 text-periwinkle [animation-delay:1s]" />
        <span className="font-display absolute top-[46%] left-1/2 -translate-x-1/2 text-5xl text-plum-deep">404</span>
      </div>
      <h1 className="text-h1 max-w-[16ch]">{t.pages.notFound.title}</h1>
      <p className="max-w-md text-lg text-ink/75">{t.pages.notFound.body}</p>
      <Link href="/shop" className={buttonClass({ size: "lg" })}>{t.pages.notFound.cta}</Link>
    </section>
  );
}
