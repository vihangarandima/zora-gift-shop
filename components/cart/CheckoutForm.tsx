"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { confetti } from "@/lib/confetti";
import { t } from "@/lib/i18n";
import { deliveryFee, orderMessage, orderWorld, type Customer } from "@/lib/order";
import { cartHasUnpriced, cartSubtotal, useShop } from "@/lib/store";
import { useHydrated } from "@/lib/useHydrated";
import { formatPrice, whatsappLink } from "@/site.config";
import { FreeDeliveryBar } from "./FreeDeliveryBar";

const fields: { name: keyof Customer; label: string; type?: string; auto?: string; area?: boolean; optional?: boolean }[] = [
  { name: "name", label: t.checkout.name, auto: "name" },
  { name: "phone", label: t.checkout.phone, type: "tel", auto: "tel" },
  { name: "address", label: t.checkout.address, auto: "street-address", area: true },
  { name: "city", label: t.checkout.city, auto: "address-level2" },
  { name: "note", label: t.checkout.extra, area: true, optional: true },
];

export const inputClass =
  "w-full rounded-2xl bg-white px-4 py-3 text-base ring-1 ring-blush transition outline-none placeholder:text-ink/40 focus:ring-2 focus:ring-plum";

export function CheckoutForm() {
  const lines = useShop((s) => s.cart);
  const hydrated = useHydrated();
  const [customer, setCustomer] = useState<Customer>({ name: "", phone: "", address: "", city: "", note: "" });

  if (!hydrated) return <div className="container-sora min-h-96" />;
  if (!lines.length)
    return (
      <div className="container-sora flex flex-col items-start gap-4 pb-16">
        <p className="text-lg">{t.checkout.empty}</p>
        <Link href="/shop" className={buttonClass({})}>{t.cta.shop}</Link>
      </div>
    );

  const subtotal = cartSubtotal(lines);
  const fee = deliveryFee(subtotal);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const btn = (e.nativeEvent as SubmitEvent).submitter?.getBoundingClientRect();
    if (btn) confetti(btn.left + btn.width / 2, btn.top, 36);
    window.open(whatsappLink(orderWorld(lines), orderMessage(lines, customer)), "_blank", "noopener");
  }

  return (
    <div className="container-sora grid gap-10 pb-16 lg:grid-cols-[1.2fr_1fr]">
      <form onSubmit={submit} className="flex flex-col gap-5">
        {fields.map((f) => (
          <label key={f.name} className="flex flex-col gap-2">
            <span className="text-sm font-bold">{f.label}</span>
            {f.area ? (
              <textarea
                name={f.name}
                rows={3}
                required={!f.optional}
                autoComplete={f.auto}
                value={customer[f.name]}
                onChange={(e) => setCustomer({ ...customer, [f.name]: e.target.value })}
                className={inputClass}
              />
            ) : (
              <input
                name={f.name}
                type={f.type ?? "text"}
                required={!f.optional}
                autoComplete={f.auto}
                inputMode={f.type === "tel" ? "tel" : undefined}
                value={customer[f.name]}
                onChange={(e) => setCustomer({ ...customer, [f.name]: e.target.value })}
                className={inputClass}
              />
            )}
          </label>
        ))}
        <Button type="submit" variant="whatsapp" size="lg" icon={<WhatsAppIcon />}>{t.checkout.submit}</Button>
        <p className="text-sm text-ink/65">{t.checkout.privacy}</p>
      </form>

      <aside className="h-fit space-y-4 rounded-xl2 bg-white p-6 shadow-soft ring-1 ring-blush lg:sticky lg:top-28">
        <h2 className="text-h3">{t.checkout.summary}</h2>
        <ul className="divide-y divide-blush">
          {lines.map((l) => (
            <li key={l.key} className="flex justify-between gap-4 py-3 text-sm">
              <span>
                <span className="font-semibold">{l.qty} × {l.name}</span>
                {l.details?.map((d) => <span key={d} className="block text-xs text-ink/65">{d}</span>)}
              </span>
              <span className="shrink-0 font-bold">{l.priceLKR === null ? t.cart.priceOnWhatsApp : formatPrice(l.priceLKR * l.qty)}</span>
            </li>
          ))}
        </ul>
        <FreeDeliveryBar subtotal={subtotal} />
        <dl className="space-y-1 text-sm">
          <div className="flex justify-between"><dt>{t.cart.subtotal}</dt><dd className="font-bold">{formatPrice(subtotal)}{cartHasUnpriced(lines) && " +"}</dd></div>
          <div className="flex justify-between"><dt>Delivery</dt><dd>{fee === null ? "confirmed on WhatsApp" : fee === 0 ? "Free" : formatPrice(fee)}</dd></div>
        </dl>
      </aside>
    </div>
  );
}
