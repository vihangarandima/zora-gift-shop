import type { Metadata } from "next";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { PageHeader } from "@/components/ui/PageHeader";
import { t } from "@/lib/i18n";
import { siteConfig, whatsappLink, type World } from "@/site.config";

export const metadata: Metadata = { title: "Contact", description: "Chat with Sora Loom and Sora Gift House on WhatsApp." };

const pretty = (n: string) => `0${n.slice(2, 4)} ${n.slice(4, 7)} ${n.slice(7)}`;

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Say hi, we reply on WhatsApp." intro="The quickest way to reach us is WhatsApp. Pick the shop you'd like to talk to." />
      <div className="container-sora grid gap-5 pb-16 md:grid-cols-2">
        {(["gift", "loom"] as World[]).map((w) => (
          <div key={w} data-world={w} className="flex flex-col gap-5 rounded-xl2 bg-white p-6 shadow-soft ring-1 ring-blush md:p-8">
            <span className="grid size-20 place-items-center rounded-full bg-accent-soft"><Logo world={w} size={w === "loom" ? 64 : 72} /></span>
            <div>
              <h2 className="text-h3">{t.worlds[w].name}</h2>
              <p className="text-ink/70">{t.worlds[w].tagline}</p>
              <p className="mt-2 font-bold">{pretty(siteConfig.whatsapp[w])}</p>
            </div>
            <a href={whatsappLink(w, `Hi ${t.worlds[w].name}! 💜`)} target="_blank" rel="noopener noreferrer" className={buttonClass({ variant: "whatsapp", size: "lg", className: "self-start" })}>
              <WhatsAppIcon /> {t.cta.chat}
            </a>
            <ul className="flex flex-wrap gap-2">
              {siteConfig.socials[w].filter((s) => s.url).map((s) => (
                <li key={s.url}>
                  <a href={s.url!} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold ring-1 ring-blush hover:ring-plum">{s.handle}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  );
}
