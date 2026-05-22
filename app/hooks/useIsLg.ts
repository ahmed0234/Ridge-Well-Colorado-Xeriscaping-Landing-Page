"use client";

import { useSyncExternalStore } from "react";

const LG_QUERY = "(min-width: 1024px)";

function subscribe(onStoreChange: () => void) {
  const mq = window.matchMedia(LG_QUERY);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(LG_QUERY).matches;
}

/** lg breakpoint (1024px). SSR defaults to false (mobile layout). */
export function useIsLg() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
