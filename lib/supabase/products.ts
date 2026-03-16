import type { Product } from "@/lib/types";
import { getSupabaseClient } from "@/lib/supabase/client";

export async function fetchProducts(
  numeroAchado?: string
): Promise<Product[]> {
  const supabase = getSupabaseClient();

  if (!supabase) {
    console.warn(
      "Supabase env vars ausentes. Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY para carregar produtos reais."
    );
    return [];
  }

  let query = supabase
    .from("produtos")
    .select(
      "id, created_at, titulo, numero_achado, link_afiliado, url_imagem, categoria"
    )
    .order("created_at", { ascending: false });

  if (numeroAchado?.trim()) {
    query = query.eq("numero_achado", Number(numeroAchado.trim()));
  }

  const { data, error } = await query;

  if (error) {
    console.error("Erro ao buscar produtos no Supabase:", error.message);
    return [];
  }

  return (data ?? []) as Product[];
}
