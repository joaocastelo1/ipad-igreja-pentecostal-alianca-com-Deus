"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { verifyAdminPassword } from "@/lib/auth/password";
import {
  ADMIN_COOKIE,
  createAdminToken,
  getAdminCookieOptions,
} from "@/lib/auth/session";
import {
  checkRateLimit,
  clearRateLimit,
  getClientIp,
  hashIdentifier,
} from "@/lib/rate-limit";

export type LoginState = {
  error?: string;
};

const loginSchema = z.object({
  password: z.string().min(1, "Informe a senha de acesso.").max(200),
});

const LOGIN_LIMIT = 8;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const rawPassword = formData.get("password");
  const parsed = loginSchema.safeParse({
    password: typeof rawPassword === "string" ? rawPassword : "",
  });

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Informe a senha de acesso.",
    };
  }

  const requestHeaders = await headers();
  const rateKey = `login:${hashIdentifier(getClientIp(requestHeaders))}`;
  const rate = checkRateLimit(rateKey, LOGIN_LIMIT, LOGIN_WINDOW_MS);

  if (!rate.allowed) {
    const minutes = Math.max(1, Math.ceil(rate.retryAfter / 60));
    return {
      error: `Muitas tentativas de acesso. Aguarde cerca de ${minutes} minuto(s) e tente novamente.`,
    };
  }

  const valid = await verifyAdminPassword(parsed.data.password);

  if (!valid) {
    return {
      error: "Senha incorreta. Verifique e tente novamente.",
    };
  }

  clearRateLimit(rateKey);

  let token: string;

  try {
    token = await createAdminToken();
  } catch {
    return {
      error:
        "A autenticação não está configurada corretamente no servidor. Avise o responsável técnico.",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, token, getAdminCookieOptions());
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}
