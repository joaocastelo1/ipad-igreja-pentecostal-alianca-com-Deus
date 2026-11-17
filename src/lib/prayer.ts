import type { PrayerCategory, PrayerStatus } from "@/types";

export const PRAYER_CATEGORIES = [
  "familia",
  "saude",
  "vida_espiritual",
  "financeiro",
  "libertacao",
  "outros",
] as const;

export const PRAYER_CATEGORY_LABELS: Record<PrayerCategory, string> = {
  familia: "Família",
  saude: "Saúde",
  vida_espiritual: "Vida espiritual",
  financeiro: "Financeiro",
  libertacao: "Libertação",
  outros: "Outros",
};

export const PRAYER_CATEGORY_OPTIONS = PRAYER_CATEGORIES.map((value) => ({
  value,
  label: PRAYER_CATEGORY_LABELS[value],
}));

export const PRAYER_STATUSES = [
  "recebido",
  "em_oracao",
  "concluido",
] as const;

export const PRAYER_STATUS_LABELS: Record<PrayerStatus, string> = {
  recebido: "Recebido",
  em_oracao: "Em oração",
  concluido: "Concluído",
};

export const PRAYER_STATUS_STYLES: Record<PrayerStatus, string> = {
  recebido: "border-gold-500/25 bg-gold-500/[0.08] text-gold-300",
  em_oracao: "border-sky-400/20 bg-sky-400/[0.07] text-sky-300",
  concluido: "border-emerald-400/20 bg-emerald-400/[0.07] text-emerald-300",
};

export function isPrayerCategory(value: unknown): value is PrayerCategory {
  return (
    typeof value === "string" &&
    (PRAYER_CATEGORIES as readonly string[]).includes(value)
  );
}

export function isPrayerStatus(value: unknown): value is PrayerStatus {
  return (
    typeof value === "string" &&
    (PRAYER_STATUSES as readonly string[]).includes(value)
  );
}
