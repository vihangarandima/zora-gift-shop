"use client";

import { useEffect } from "react";
import type { World } from "@/site.config";

/** Sets the page-wide world (accent colour + WhatsApp number) while this page is open. */
export function WorldBody({ world }: { world: World }) {
  useEffect(() => {
    const prev = document.body.dataset.world;
    document.body.dataset.world = world;
    return () => {
      if (prev) document.body.dataset.world = prev;
    };
  }, [world]);
  return null;
}
