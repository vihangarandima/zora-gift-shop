import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = { title: "FAQ", description: "Delivery, custom orders and other questions about Sora." };

// Only answers we know are true. TODO(owner): delivery times, fees, payment methods, returns.
const faqs: { q: string; a: React.ReactNode }[] = [
  { q: "Do you deliver island-wide?", a: "Yes, we deliver to every part of Sri Lanka." },
  { q: "How do I order?", a: <>Add things to your bag and press checkout, or simply message us on WhatsApp. We confirm stock, delivery and payment with you there.</> },
  { q: "Can I get a custom gift box?", a: <>Of course! Use our <Link href="/gift-box" className="font-semibold text-plum underline underline-offset-4">gift box builder</Link> or tell us what you have in mind on WhatsApp.</> },
  { q: "How long does delivery take?", a: "It depends on your area. We'll tell you the expected date when you order." },
  { q: "How much is delivery?", a: "We confirm the delivery fee with you on WhatsApp before you pay." },
  { q: "How can I pay?", a: "We share the payment options when we confirm your order on WhatsApp." },
  { q: "Which size should I pick?", a: "Message Sora Loom with your usual size or measurements and we'll help you choose." },
];

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.filter((f) => typeof f.a === "string").map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader eyebrow="Help" title="Little questions, quick answers." />
      <div className="container-sora max-w-3xl pb-16">
        {faqs.map((f) => (
          <details key={f.q} className="group border-b border-blush py-2 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 font-display text-xl md:text-2xl">
              {f.q}
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-tint text-plum transition-transform duration-300 group-open:rotate-45" aria-hidden>+</span>
            </summary>
            <p className="pb-4 text-lg text-ink/80">{f.a}</p>
          </details>
        ))}
      </div>
    </>
  );
}
