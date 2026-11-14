import { SignJWT, jwtVerify } from "jose";

export const ADMIN_COOKIE = "ipad_admin_session";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 8;

const ISSUER = "ipad-alianca-com-deus";
const AUDIENCE = "ipad-admin";
const DEV_SECRET = "ipad-dev-only-session-secret-change-before-production";

function getSecret(): Uint8Array | null {
  const value = process.env.ADMIN_SESSION_SECRET;

  if (value && value.length >= 32) {
    return new TextEncoder().encode(value);
  }

  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return new TextEncoder().encode(DEV_SECRET);
}

export async function createAdminToken(): Promise<string> {
  const secret = getSecret();

  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET precisa ter pelo menos 32 caracteres em produção.",
    );
  }

  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject("admin")
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(`${ADMIN_SESSION_MAX_AGE}s`)
    .sign(secret);
}

export async function verifyAdminToken(token: string): Promise<boolean> {
  const secret = getSecret();

  if (!secret || !token) {
    return false;
  }

  try {
    const { payload } = await jwtVerify(token, secret, {
      issuer: ISSUER,
      audience: AUDIENCE,
      algorithms: ["HS256"],
    });

    return payload.role === "admin" && payload.sub === "admin";
  } catch {
    return false;
  }
}

export function getAdminCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
    priority: "high" as const,
  };
}
