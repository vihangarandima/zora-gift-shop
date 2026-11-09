"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/Icons";
import { t } from "@/lib/i18n";
import { whatsappLink, type World } from "@/site.config";

/** Floating order button. Follows the active world so messages reach the right shop. */
export function WhatsAppFab() {
  const [world, setWorld] = useState<World>("gift");
  // Product pages have their own sticky bar with a WhatsApp button on phones.
  const onProduct = usePathname().startsWith("/product/");

  useEffect(() => {
    const read = () => setWorld((document.body.dataset.world as World) || "gift");
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.body, { attributes: true, attributeFilter: ["data-world"] });
    return () => obs.disconnect();
  }, []);

  return (
    <motion.a
      href={whatsappLink(world, `Hi ${t.worlds[world].name}! 💜`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t.cta.chat}: ${t.worlds[world].name}`}
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1.4, type: "spring", stiffness: 300, damping: 16 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
      className={clsx(
        "fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 inline-flex min-h-14 items-center gap-2 rounded-full bg-ink pr-5 pl-4 font-bold text-white shadow-lift md:right-6 md:bottom-6",
        onProduct && "max-sm:hidden",
      )}
    >
      <WhatsAppIcon width={24} height={24} />
      <span className="text-sm">{t.cta.chat}</span>
    </motion.a>
  );
}
