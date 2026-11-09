import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Nunito_Sans } from "next/font/google";
import Script from "next/script";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { Cursor } from "@/components/layout/Cursor";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { Preloader, preloaderScript } from "@/components/layout/Preloader";
import { SeasonalDoodles } from "@/components/layout/SeasonalDoodles";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { siteConfig } from "@/site.config";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT"], // only the soft axis is used; dropping WONK/opsz roughly halves the file
  variable: "--font-fraunces",
  display: "swap",
});
const nunito = Nunito_Sans({ subsets: ["latin"], variable: "--font-nunito", display: "swap" });
// Handwritten accent: small notes only, so it is not preloaded.
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Sora · Loom & Gift House", template: "%s · Sora" },
  description: "Soft clothes from Sora Loom and gifts made with love from Sora Gift House. Island-wide delivery in Sri Lanka.",
  icons: { icon: "/brand/sora-gift-house.png" },
  openGraph: { images: ["/brand/sora-gift-house.png"], siteName: "Sora" },
};

export const viewport: Viewport = { themeColor: "#fbf6fb" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${nunito.variable} ${caveat.variable}`} suppressHydrationWarning>
      <body data-world="gift">
        <Script id="preloader-seen" strategy="beforeInteractive">{preloaderScript}</Script>
        <MotionProvider>
          <Preloader />
          <SmoothScroll />
          <Cursor />
          <SeasonalDoodles />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFab />
          <CartDrawer />
        </MotionProvider>
      </body>
    </html>
  );
}
