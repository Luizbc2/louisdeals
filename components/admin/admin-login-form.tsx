"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { LockKeyhole, ShieldCheck } from "lucide-react";

type AdminLoginFormProps = {
  setupReady: boolean;
};

export function AdminLoginForm({ setupReady }: AdminLoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!setupReady) {
      setErrorMessage(
        "Finalize a configuracao do Supabase e das variaveis de ambiente antes de acessar o painel."
      );
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        setErrorMessage(result.error ?? "Nao foi possivel entrar.");
        return;
      }

      window.location.href = "/admin/dashboard";
    } catch {
      setErrorMessage("Falha ao conectar com o painel admin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="admin-panel space-y-5" onSubmit={handleSubmit}>
      <div className="flex items-center gap-3">
        <div className="admin-icon-wrap">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <p className="admin-eyebrow">Acesso restrito</p>
          <h1 className="admin-title mt-2">Painel de controle LouisDeals</h1>
        </div>
      </div>

      <p className="admin-copy">
        Digite seu usuario e senha cadastrados pelo administrador liberar o
        paínel administrativo.
      </p>

      <label className="admin-field">
        <span>Usuario</span>
        <input
          type="text"
          autoComplete="username"
          placeholder="ex: louisadmin"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          required
        />
      </label>

      <label className="admin-field">
        <span>Senha</span>
        <div className="admin-input-with-icon">
          <LockKeyhole className="h-4 w-4" />
          <input
            type="password"
            autoComplete="current-password"
            placeholder="Sua senha do painel"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
      </label>

      {errorMessage ? (
        <div className="admin-alert admin-alert-error">{errorMessage}</div>
      ) : null}

      {!setupReady ? (
        <div className="admin-alert">
          Faltam `SUPABASE_SERVICE_ROLE_KEY` ou `ADMIN_SESSION_SECRET` no
          ambiente. O login so funciona depois disso.
        </div>
      ) : null}

      <button
        type="submit"
        className="admin-primary-button w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Entrando..." : "Entrar no dashboard"}
      </button>
    </form>
  );
}
