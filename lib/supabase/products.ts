import type { Product } from "@/lib/types";
import { supabase } from "@/lib/supabaseClient";

export async function fetchProducts(
  numeroAchado?: string
): Promise<Product[]> {
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
