import { NextResponse } from "next/server";
import { createPrayerRequest } from "@/lib/prayer-store";
import {
  checkRateLimit,
  getClientIp,
  hashIdentifier,
} from "@/lib/rate-limit";
import { prayerRequestSchema } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 8 * 1024;
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (!contentType.toLowerCase().includes("application/json")) {
    return NextResponse.json(
      { message: "Formato de solicitação inválido." },
      { status: 415 },
    );
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");

  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { message: "O pedido enviado é muito grande." },
      { status: 413 },
    );
  }

  const rawBody = await request.text();

  if (Buffer.byteLength(rawBody, "utf8") > MAX_BODY_BYTES) {
    return NextResponse.json(
      { message: "O pedido enviado é muito grande." },
      { status: 413 },
    );
  }

  let payload: unknown;

  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { message: "Não foi possível ler o pedido enviado." },
      { status: 400 },
    );
  }

  const parsed = prayerRequestSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message:
          "Verifique os campos e tente novamente. O pedido deve ter pelo menos 10 caracteres.",
      },
      { status: 400 },
    );
  }

  if (parsed.data.website.length > 0) {
    return NextResponse.json(
      { message: "Pedido recebido." },
      { status: 201 },
    );
  }

  const ip = getClientIp(request.headers);
  const rateKey = `prayer:${hashIdentifier(ip)}`;
  const rate = checkRateLimit(rateKey, RATE_LIMIT, RATE_WINDOW_MS);

  if (!rate.allowed) {
    return NextResponse.json(
      {
        message:
          "Recebemos muitos pedidos em sequência. Aguarde alguns minutos e tente novamente.",
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rate.retryAfter),
        },
      },
    );
  }

  try {
    await createPrayerRequest(parsed.data);
  } catch (error) {
    console.error(
      "[pedido-de-oracao] Falha ao registrar pedido:",
      error instanceof Error ? error.message : "erro desconhecido",
    );

    return NextResponse.json(
      {
        message:
          "Não foi possível enviar seu pedido agora. Tente novamente em instantes.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      message:
        "Recebemos o seu pedido. Nossa equipe vai orar por você. Deus abençoe!",
    },
    { status: 201 },
  );
}

export function GET() {
  return NextResponse.json(
    { message: "Método não permitido." },
    { status: 405, headers: { Allow: "POST" } },
  );
}
