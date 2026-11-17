import type { PrayerRequest } from "@/types";
import { PRAYER_CATEGORY_LABELS } from "@/lib/prayer";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function isPrayerNotificationConfigured(): boolean {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.PRAYER_NOTIFICATION_EMAIL &&
      process.env.PRAYER_NOTIFICATION_FROM,
  );
}

export async function sendPrayerNotification(
  request: PrayerRequest,
): Promise<void> {
  if (!isPrayerNotificationConfigured()) {
    return;
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "";
  const adminUrl = siteUrl ? `${siteUrl}/admin` : "/admin";
  const createdAt = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Fortaleza",
  }).format(new Date(request.createdAt));

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0b1424">
      <h2 style="margin:0 0 12px">Novo pedido de oração recebido</h2>
      <p style="margin:0 0 8px"><strong>Nome:</strong> ${escapeHtml(request.name)}</p>
      <p style="margin:0 0 8px"><strong>Categoria:</strong> ${escapeHtml(PRAYER_CATEGORY_LABELS[request.category])}</p>
      <p style="margin:0 0 8px"><strong>Recebido em:</strong> ${escapeHtml(createdAt)}</p>
      <p style="margin:16px 0 0;color:#5b6472">
        Por segurança, o texto do pedido não é enviado por e-mail. Acesse o painel administrativo para ler e acompanhar o pedido.
      </p>
      <p style="margin:16px 0 0">
        <a href="${escapeHtml(adminUrl)}" style="color:#a97e2f">Abrir painel administrativo</a>
      </p>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.PRAYER_NOTIFICATION_FROM,
        to: [process.env.PRAYER_NOTIFICATION_EMAIL],
        subject: "Novo pedido de oração recebido",
        html,
      }),
    });

    if (!response.ok) {
      throw new Error(`Resend respondeu ${response.status}.`);
    }
  } catch (error) {
    console.error(
      "[notifications] Falha ao enviar aviso de pedido de oração:",
      error instanceof Error ? error.message : "erro desconhecido",
    );
  }
}
