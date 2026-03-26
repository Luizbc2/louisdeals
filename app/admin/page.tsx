import { redirect } from "next/navigation";
import { Shield, Sparkles } from "lucide-react";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { getAdminSession } from "@/lib/admin-session";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const session = await getAdminSession();

  if (session) {
    redirect("/admin/dashboard");
  }

  const setupReady = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
      process.env.SUPABASE_SERVICE_ROLE_KEY &&
      process.env.ADMIN_SESSION_SECRET
  );

  return (
    <main className="admin-theme admin-theme-light admin-login-shell">
      <section className="admin-login-spotlight">
        <div className="admin-login-copy">
          <span className="admin-kicker">
            <Sparkles className="h-4 w-4" />
            Rota privada
          </span>
          <h1 className="admin-display-title max-w-[11ch]">
            A camada de operacao da sua vitrine.
          </h1>
          <p className="admin-copy max-w-[56ch]">
            O login continua acessivel apenas pela URL `/admin`, mas agora com
            uma apresentacao mais limpa e profissional. Depois da validacao, o
            painel concentra cliques, botoes e cadastros em um unico fluxo.
          </p>

          <div className="admin-login-note">
            <Shield className="h-4 w-4" />
            Credenciais verificadas no banco e sessao protegida por cookie
            assinado.
          </div>
        </div>

        <div className="w-full max-w-[480px]">
          <AdminLoginForm setupReady={setupReady} />
        </div>
      </section>
    </main>
  );
}
