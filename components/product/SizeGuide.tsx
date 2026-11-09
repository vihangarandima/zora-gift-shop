"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { buttonClass } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { t } from "@/lib/i18n";
import { siteConfig, whatsappLink } from "@/site.config";

export function SizeGuide({ open, onClose }: { open: boolean; onClose: () => void }) {
  const guide = siteConfig.sizeGuide;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80] grid place-items-end bg-ink/30 backdrop-blur-sm sm:place-items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.productPage.sizeGuide}
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 60 }}
            animate={{ y: 0 }}
            exit={{ y: 60 }}
            className="w-full max-w-lg rounded-t-xl2 bg-bg p-6 shadow-lift sm:rounded-xl2"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-h3">{t.productPage.sizeGuide}</h2>
              <button type="button" onClick={onClose} className="grid size-11 place-items-center rounded-full hover:bg-tint" aria-label={t.nav.close} autoFocus>✕</button>
            </div>
            {guide ? (
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-blush">{guide.columns.map((c) => <th key={c} className="py-2 font-bold">{c}</th>)}</tr>
                </thead>
                <tbody>
                  {guide.rows.map((r) => (
                    <tr key={r[0]} className="border-b border-blush/60">{r.map((v, i) => <td key={i} className="py-2">{v}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="space-y-4">
                <p>Our size chart is being measured. Send us your usual size or measurements and we&apos;ll tell you which one fits best.</p>
                <a href={whatsappLink("loom", "Hi Sora Loom! Can you help me with sizing? 💜")} target="_blank" rel="noopener noreferrer" className={buttonClass({ variant: "whatsapp" })}>
                  <WhatsAppIcon /> {t.cta.chat}
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
