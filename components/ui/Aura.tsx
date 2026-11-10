import clsx from "clsx";

/** Blurred lilac/periwinkle glows. Place inside a `relative isolate` parent. */
export function Aura({ className }: { className?: string }) {
  return (
    <div aria-hidden className={clsx("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <span className="aura-blob -top-40 -left-32 size-[30rem] bg-lilac/35 md:size-[40rem]" />
      <span className="aura-blob top-1/4 -right-40 size-[26rem] bg-periwinkle/30 [animation-delay:-7s] md:size-[34rem]" />
      <span className="aura-blob -bottom-48 left-1/3 size-[24rem] bg-blush/80 [animation-delay:-13s] md:size-[30rem]" />
    </div>
  );
}
