import type { Metadata } from "next";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { PageHeader } from "@/components/ui/PageHeader";
import { whatsappLink } from "@/site.config";

export const metadata: Metadata = { title: "Delivery & returns" };

// TODO(owner): replace each "being written" note with the real policy.
const sections = [
  { title: "Delivery", body: "We deliver island-wide across Sri Lanka. Delivery fees and timelines are confirmed with you on WhatsApp when you order." },
  { title: "Returns & exchanges", body: "Our returns and exchange policy is being written. Until then, message us and we'll sort it out together." },
  { title: "Custom orders", body: "Custom gift boxes are made to order. We confirm the contents, price and delivery date with you before we start." },
  { title: "Privacy", body: "This website doesn't store your personal details. Order details you enter go straight into a WhatsApp message to us." },
];

export default function PoliciesPage() {
  return (
    <>
      <PageHeader eyebrow="The small print" title="Delivery & returns" />
      <div className="container-sora grid max-w-3xl gap-8 pb-16">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="text-h3 mb-2">{s.title}</h2>
            <p className="text-lg text-ink/80">{s.body}</p>
          </section>
        ))}
        <a href={whatsappLink("gift", "Hi Sora! I have a question about delivery / returns.")} target="_blank" rel="noopener noreferrer" className={buttonClass({ variant: "whatsapp", size: "lg", className: "justify-self-start" })}>
          <WhatsAppIcon /> Ask us anything
        </a>
      </div>
    </>
  );
}
