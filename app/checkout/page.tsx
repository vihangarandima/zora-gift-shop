import type { Metadata } from "next";
import { CheckoutForm } from "@/components/cart/CheckoutForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { t } from "@/lib/i18n";

export const metadata: Metadata = { title: t.checkout.title, robots: { index: false } };

export default function CheckoutPage() {
  return (
    <>
      <PageHeader eyebrow="Almost there" title={t.checkout.title} intro={t.checkout.note} />
      <CheckoutForm />
    </>
  );
}
