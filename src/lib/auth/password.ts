import {
  createHash,
  scrypt,
  timingSafeEqual,
  type ScryptOptions,
} from "node:crypto";
import { promisify } from "node:util";

const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: Buffer,
  keylen: number,
  options: ScryptOptions,
) => Promise<Buffer>;

const MAX_N = 1 << 20;
const MAX_R = 32;
const MAX_P = 16;

type ScryptParams = {
  N: number;
  r: number;
  p: number;
  salt: Buffer;
  hash: Buffer;
};

function parseHash(encoded: string): ScryptParams | null {
  const parts = encoded.split("$");

  if (parts.length !== 6 || parts[0] !== "scrypt") {
    return null;
  }

  const N = Number(parts[1]);
  const r = Number(parts[2]);
  const p = Number(parts[3]);

  if (
    !Number.isInteger(N) ||
    !Number.isInteger(r) ||
    !Number.isInteger(p) ||
    N < 2 ||
    N > MAX_N ||
    r < 1 ||
    r > MAX_R ||
    p < 1 ||
    p > MAX_P
  ) {
    return null;
  }

  try {
    return {
      N,
      r,
      p,
      salt: Buffer.from(parts[4], "base64url"),
      hash: Buffer.from(parts[5], "base64url"),
    };
  } catch {
    return null;
  }
}

function hashForComparison(value: string) {
  return createHash("sha256").update(value, "utf8").digest();
}

function safeCompare(value: string, expected: string) {
  return timingSafeEqual(
    hashForComparison(value),
    hashForComparison(expected),
  );
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const encoded = process.env.ADMIN_PASSWORD_HASH?.trim();

  if (!encoded) {
    if (process.env.NODE_ENV === "production") {
      return false;
    }

    return safeCompare(password, process.env.ADMIN_PASSWORD ?? "ipad-admin");
  }

  const params = parseHash(encoded);

  if (!params || params.hash.length === 0) {
    return false;
  }

  try {
    const derived = await scryptAsync(
      password,
      params.salt,
      params.hash.length,
      {
        N: params.N,
        r: params.r,
        p: params.p,
        maxmem: 256 * params.N * params.r,
      },
    );

    return timingSafeEqual(derived, params.hash);
  } catch {
    return false;
  }
}
