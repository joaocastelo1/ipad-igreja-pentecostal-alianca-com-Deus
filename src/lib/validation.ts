import { z } from "zod";

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
  request: z
    .string()
    .trim()
    .min(10, "Compartilhe seu pedido com pelo menos 10 caracteres.")
    .max(2000, "O pedido deve ter no máximo 2000 caracteres."),
  wantsContact: z.boolean().default(false),
  website: z.string().max(200).optional().default(""),
}).superRefine((data, ctx) => {
  if (data.wantsContact && data.whatsapp.trim().length === 0) {
    ctx.addIssue({
      code: "custom",
      path: ["whatsapp"],
      message: "Informe um WhatsApp para que possamos entrar em contato.",
    });
  }
});

export type PrayerRequestInput = z.infer<typeof prayerRequestSchema>;
