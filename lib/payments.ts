/**
 * Payment hook. Today every order is confirmed and paid over WhatsApp, so the site never sees card details.
 *
 * To add PayHere or Stripe later:
 * 1. Add the provider to `PaymentProvider` and set `activeProvider`.
 * 2. Implement `startPayment` with a server route (app/api/pay/route.ts) that creates the checkout session
 *    and returns the hosted payment page URL. Card details stay on the provider's page.
 * 3. Handle the provider's webhook in app/api/pay/webhook/route.ts to mark the order paid.
 */
export type PaymentProvider = "whatsapp" | "payhere" | "stripe";

export const activeProvider: PaymentProvider = "whatsapp";

export type PaymentRequest = { orderId: string; amountLKR: number; customerName: string; phone: string };

export async function startPayment(req: PaymentRequest): Promise<{ redirectUrl: string }> {
  void req;
  throw new Error(`Online payment (${activeProvider}) is not set up yet`);
}
