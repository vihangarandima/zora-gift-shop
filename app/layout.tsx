import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Nunito_Sans } from "next/font/google";
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

// Headings and the italic accent notes. Only the weights in use are loaded.
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const nunito = Nunito_Sans({ subsets: ["latin"], variable: "--font-nunito", display: "swap" });

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
    <html lang="en" className={`${cormorant.variable} ${nunito.variable}`} suppressHydrationWarning>
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
