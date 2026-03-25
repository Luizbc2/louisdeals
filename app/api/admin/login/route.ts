import { NextResponse } from "next/server";
import { adminSessionCookie, createAdminSessionToken } from "@/lib/admin-session";
import { getSupabaseServiceClient } from "@/lib/supabase/server";

type AdminLoginResult = {
  id: string;
  username: string;
  display_name: string | null;
};

export async function POST(request: Request) {
  try {
    const { username, password } = (await request.json()) as {
      username?: string;
      password?: string;
    };
    const normalizedUsername = username?.trim().toLowerCase();
    const normalizedPassword = password?.trim();

    if (!normalizedUsername || !normalizedPassword) {
      return NextResponse.json(
        { error: "Usuario e senha sao obrigatorios." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServiceClient();

    if (!supabase) {
      return NextResponse.json(
        { error: "Servidor sem configuracao completa do Supabase." },
        { status: 500 }
      );
    }

    const { data, error } = await supabase.rpc("verify_admin_login", {
      p_username: normalizedUsername,
      p_password: normalizedPassword
    });

    if (error) {
      console.error("Erro ao validar login admin:", error.message);
      return NextResponse.json(
        { error: "Falha ao validar o login admin." },
        { status: 500 }
      );
    }

    const admin = (data as AdminLoginResult[] | null)?.[0];

    if (!admin) {
      return NextResponse.json(
        { error: "Usuario ou senha invalidos." },
        { status: 401 }
      );
    }

    await supabase
      .from("admin_users")
      .update({ last_login_at: new Date().toISOString() })
      .eq("id", admin.id);

    const response = NextResponse.json({ ok: true });

    response.cookies.set(
      adminSessionCookie.name,
      createAdminSessionToken({
        adminId: admin.id,
        username: admin.username,
        displayName: admin.display_name || admin.username
      }),
      adminSessionCookie.options
    );

    return response;
  } catch (error) {
    console.error("Erro inesperado no login admin:", error);
    return NextResponse.json(
      { error: "Nao foi possivel processar o login." },
      { status: 500 }
    );
  }
}
