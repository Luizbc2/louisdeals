import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { AdminSession } from "@/lib/types";

export const ADMIN_SESSION_COOKIE = "louis_admin_session";

const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET nao configurado. Adicione essa variavel ao ambiente."
    );
  }

  return secret;
}

function signToken(encodedPayload: string) {
  return createHmac("sha256", getSessionSecret())
    .update(encodedPayload)
    .digest("base64url");
}

export function createAdminSessionToken(
  payload: Omit<AdminSession, "exp">
): string {
  const sessionPayload: AdminSession = {
    ...payload,
    exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000
  };
  const encodedPayload = Buffer.from(
    JSON.stringify(sessionPayload),
    "utf-8"
  ).toString("base64url");
  const signature = signToken(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function readAdminSessionFromToken(
  token: string | null | undefined
): AdminSession | null {
  if (!token || !process.env.ADMIN_SESSION_SECRET) {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signToken(encodedPayload);
  const signatureMatches =
    signature.length === expectedSignature.length &&
    timingSafeEqual(
      Buffer.from(signature, "utf-8"),
      Buffer.from(expectedSignature, "utf-8")
    );

  if (!signatureMatches) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf-8")
    ) as AdminSession;

    if (!payload.adminId || !payload.username || !payload.displayName) {
      return null;
    }

    if (payload.exp <= Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies();

  return readAdminSessionFromToken(
    cookieStore.get(ADMIN_SESSION_COOKIE)?.value
  );
}

export async function requireAdminSession() {
  const session = await getAdminSession();

  if (!session) {
    redirect("/admin");
  }

  return session;
}

export const adminSessionCookie = {
  name: ADMIN_SESSION_COOKIE,
  options: {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS
  }
};
