import { z } from "zod";
import { PRAYER_CATEGORIES } from "@/lib/prayer";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const prayerRequestSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Informe seu nome com pelo menos 2 caracteres.")
    .max(80, "O nome deve ter no máximo 80 caracteres."),
  whatsapp: z
    .string()
    .trim()
    .max(24, "Informe um WhatsApp válido.")
    .refine(
      (value) => value === "" || /^[0-9()+\-\s]{8,24}$/.test(value),
      "Informe um número de WhatsApp válido.",
    )
    .optional()
    .default(""),
  email: z
    .string()
    .trim()
    .max(160, "O e-mail deve ter no máximo 160 caracteres.")
    .refine(
      (value) => value === "" || emailPattern.test(value),
      "Informe um e-mail válido.",
    )
    .optional()
    .default(""),
  category: z.enum(PRAYER_CATEGORIES).optional().default("outros"),
  request: z
    .string()
    .trim()
    .min(10, "Compartilhe seu pedido com pelo menos 10 caracteres.")
    .max(2000, "O pedido deve ter no máximo 2000 caracteres."),
  consent: z.boolean().refine((value) => value === true, {
    message: "É necessário autorizar o tratamento dos seus dados.",
  }),
  website: z.string().max(200).optional().default(""),
});

export type PrayerRequestInput = z.infer<typeof prayerRequestSchema>;
