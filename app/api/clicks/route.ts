import { NextResponse } from "next/server";
import type { SiteClickPayload } from "@/lib/types";
import { getSupabaseServiceClient } from "@/lib/supabase/server";

function sanitizeMetadata(metadata: SiteClickPayload["metadata"]) {
  if (!metadata || typeof metadata !== "object") {
    return {};
  }

  return Object.fromEntries(
    Object.entries(metadata).filter((entry) => {
      const value = entry[1];

      return (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean" ||
        value === null
      );
    })
  );
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as SiteClickPayload;

    if (!payload.buttonKey?.trim() || !payload.buttonLabel?.trim()) {
      return NextResponse.json({ ok: true });
    }

    const supabase = getSupabaseServiceClient();

    if (!supabase) {
      return NextResponse.json({ ok: true });
    }

    const { error } = await supabase.from("site_clicks").insert({
      button_key: payload.buttonKey.trim(),
      button_label: payload.buttonLabel.trim(),
      page_path: payload.pagePath?.trim() || "/",
      product_id:
        typeof payload.productId === "number" && Number.isFinite(payload.productId)
          ? payload.productId
          : null,
      metadata: sanitizeMetadata(payload.metadata)
    });

    if (error) {
      console.error("Erro ao registrar clique:", error.message);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erro inesperado ao registrar clique:", error);
    return NextResponse.json({ ok: true });
  }
}
