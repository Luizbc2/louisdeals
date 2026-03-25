"use client";

import type { SiteClickPayload } from "@/lib/types";

function buildPayload(payload: SiteClickPayload) {
  return JSON.stringify({
    ...payload,
    pagePath:
      payload.pagePath ??
      (typeof window !== "undefined" ? window.location.pathname : undefined)
  });
}

export function trackSiteClick(payload: SiteClickPayload) {
  const body = buildPayload(payload);

  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    const beacon = new Blob([body], { type: "application/json" });

    navigator.sendBeacon("/api/clicks", beacon);
    return;
  }

  void fetch("/api/clicks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body,
    keepalive: true
  });
}
