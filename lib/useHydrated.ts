"use client";

import { useEffect, useState } from "react";

/** True after the first client render. Use before showing localStorage-backed values to avoid hydration mismatches. */
export function useHydrated() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready;
}
