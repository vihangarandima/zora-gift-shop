import { formatPrice, siteConfig, type World } from "@/site.config";
import { cartHasUnpriced, cartSubtotal, type CartLine } from "./store";

export type Customer = { name: string; phone: string; address: string; city: string; note?: string };

/** Orders go to Loom only when every line is Loom; anything with Gift House goes to Gift House. */
export function orderWorld(lines: CartLine[]): World {
  return lines.length && lines.every((l) => l.world === "loom") ? "loom" : "gift";
}

export function deliveryFee(subtotal: number) {
  const { fee, freeOver } = siteConfig.delivery;
  if (fee === null) return null;
  return freeOver !== null && subtotal >= freeOver ? 0 : fee;
}

export function orderMessage(lines: CartLine[], customer?: Customer) {
  const out = ["Hi Sora! I'd like to order 💜", ""];
  for (const l of lines) {
    out.push(`• ${l.qty} × ${l.name}${l.priceLKR !== null ? ` (${formatPrice(l.priceLKR * l.qty)})` : ""}`);
    l.details?.forEach((d) => out.push(`   ${d}`));
  }
  const subtotal = cartSubtotal(lines);
  out.push("", `Subtotal: ${formatPrice(subtotal)}${cartHasUnpriced(lines) ? " + custom items to confirm" : ""}`);
  const fee = deliveryFee(subtotal);
  out.push(`Delivery: ${fee === null ? "please confirm" : fee === 0 ? "free" : formatPrice(fee)}`);
  if (customer) {
    out.push("", `Name: ${customer.name}`, `Phone: ${customer.phone}`, `Address: ${customer.address}, ${customer.city}`);
    if (customer.note) out.push(`Note: ${customer.note}`);
  }
  return out.join("\n");
}
