import { randomUUID } from "node:crypto";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, readAdminSessionFromToken } from "@/lib/admin-session";
import { getSupabaseServiceClient } from "@/lib/supabase/server";

function sanitizeFileName(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function ensureAbsoluteUrl(value: string, label: string) {
  try {
    const parsed = new URL(value);

    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new Error("invalid");
    }

    return parsed.toString();
  } catch {
    throw new Error(`${label} invalida. Use uma URL completa com http ou https.`);
  }
}

function getSessionFromRequest(request: Request) {
  const cookieHeader = request.headers.get("cookie");

  if (!cookieHeader) {
    return null;
  }

  const token = cookieHeader
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${ADMIN_SESSION_COOKIE}=`))
    ?.split("=")
    .slice(1)
    .join("=");

  return readAdminSessionFromToken(token);
}

async function resolveImageUrl({
  supabase,
  imageFile,
  imageUrl,
  numeroAchado,
  existingImageUrl
}: {
  supabase: NonNullable<ReturnType<typeof getSupabaseServiceClient>>;
  imageFile: FormDataEntryValue | null;
  imageUrl: string;
  numeroAchado: number;
  existingImageUrl?: string;
}) {
  if (imageFile instanceof File && imageFile.size > 0) {
    if (!imageFile.type.startsWith("image/")) {
      throw new Error("O arquivo enviado precisa ser uma imagem valida.");
    }

    const originalName = sanitizeFileName(imageFile.name || "produto");
    const extension = originalName.split(".").pop() || "png";
    const storagePath = `products/${numeroAchado}-${randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(storagePath, Buffer.from(await imageFile.arrayBuffer()), {
        contentType: imageFile.type,
        upsert: false,
        cacheControl: "3600"
      });

    if (uploadError) {
      console.error("Erro ao subir imagem do produto:", uploadError.message);
      throw new Error(
        "Falha no upload da imagem. Verifique se o bucket product-images existe no Supabase."
      );
    }

    return supabase.storage.from("product-images").getPublicUrl(storagePath).data
      .publicUrl;
  }

  if (imageUrl) {
    return ensureAbsoluteUrl(imageUrl, "URL da imagem");
  }

  if (existingImageUrl) {
    return existingImageUrl;
  }

  throw new Error("Envie uma URL de imagem ou faca upload de um arquivo.");
}

export async function POST(request: Request) {
  const session = getSessionFromRequest(request);

  if (!session) {
    return NextResponse.json({ error: "Sessao admin invalida." }, { status: 401 });
  }

  const supabase = getSupabaseServiceClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Servidor sem acesso ao Supabase service role." },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const titulo = String(formData.get("titulo") ?? "").trim();
    const categoria = String(formData.get("categoria") ?? "").trim();
    const preco = String(formData.get("preco") ?? "").trim();
    const linkAfiliado = String(formData.get("linkAfiliado") ?? "").trim();
    const imageUrl = String(formData.get("imageUrl") ?? "").trim();
    const numeroAchado = Number(formData.get("numeroAchado"));
    const imageFile = formData.get("imageFile");

    if (!titulo || !categoria || !linkAfiliado || !Number.isInteger(numeroAchado)) {
      return NextResponse.json(
        {
          error:
            "Preencha titulo, categoria, link de afiliado e um ID de achado valido."
        },
        { status: 400 }
      );
    }

    const normalizedAffiliateUrl = ensureAbsoluteUrl(
      linkAfiliado,
      "Link de afiliado"
    );
    const finalImageUrl = await resolveImageUrl({
      supabase,
      imageFile,
      imageUrl,
      numeroAchado
    });

    const { data, error } = await supabase
      .from("produtos")
      .insert({
        titulo,
        numero_achado: numeroAchado,
        link_afiliado: normalizedAffiliateUrl,
        url_imagem: finalImageUrl,
        categoria,
        preco: preco || null
      })
      .select(
        "id, created_at, titulo, numero_achado, link_afiliado, url_imagem, categoria, preco"
      )
      .single();

    if (error) {
      console.error("Erro ao inserir produto:", error.message);
      return NextResponse.json(
        {
          error:
            error.code === "23505"
              ? "Esse ID do achado ja existe no banco."
              : "Falha ao salvar o produto no banco."
        },
        { status: 500 }
      );
    }

    revalidatePath("/");
    revalidatePath("/admin/dashboard");

    return NextResponse.json({ ok: true, product: data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao cadastrar produto.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  const session = getSessionFromRequest(request);

  if (!session) {
    return NextResponse.json({ error: "Sessao admin invalida." }, { status: 401 });
  }

  const supabase = getSupabaseServiceClient();

  if (!supabase) {
    return NextResponse.json(
      { error: "Servidor sem acesso ao Supabase service role." },
      { status: 500 }
    );
  }

  try {
    const formData = await request.formData();
    const productId = Number(formData.get("productId"));
    const titulo = String(formData.get("titulo") ?? "").trim();
    const categoria = String(formData.get("categoria") ?? "").trim();
    const preco = String(formData.get("preco") ?? "").trim();
    const linkAfiliado = String(formData.get("linkAfiliado") ?? "").trim();
    const imageUrl = String(formData.get("imageUrl") ?? "").trim();
    const currentImageUrl = String(formData.get("currentImageUrl") ?? "").trim();
    const numeroAchado = Number(formData.get("numeroAchado"));
    const imageFile = formData.get("imageFile");

    if (
      !Number.isInteger(productId) ||
      !titulo ||
      !categoria ||
      !linkAfiliado ||
      !Number.isInteger(numeroAchado)
    ) {
      return NextResponse.json(
        {
          error:
            "Preencha titulo, categoria, link de afiliado e um ID de achado valido."
        },
        { status: 400 }
      );
    }

    const normalizedAffiliateUrl = ensureAbsoluteUrl(
      linkAfiliado,
      "Link de afiliado"
    );
    const finalImageUrl = await resolveImageUrl({
      supabase,
      imageFile,
      imageUrl,
      numeroAchado,
      existingImageUrl: currentImageUrl
    });

    const { data, error } = await supabase
      .from("produtos")
      .update({
        titulo,
        numero_achado: numeroAchado,
        link_afiliado: normalizedAffiliateUrl,
        url_imagem: finalImageUrl,
        categoria,
        preco: preco || null
      })
      .eq("id", productId)
      .select(
        "id, created_at, titulo, numero_achado, link_afiliado, url_imagem, categoria, preco"
      )
      .single();

    if (error) {
      console.error("Erro ao atualizar produto:", error.message);
      return NextResponse.json(
        {
          error:
            error.code === "23505"
              ? "Esse ID do achado ja existe no banco."
              : "Falha ao atualizar o produto no banco."
        },
        { status: 500 }
      );
    }

    revalidatePath("/");
    revalidatePath("/admin/dashboard");

    return NextResponse.json({ ok: true, product: data });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro ao atualizar produto.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
