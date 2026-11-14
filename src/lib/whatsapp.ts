import { siteConfig } from "@/data/site";

export function getWhatsAppLink(
  message: string = siteConfig.whatsapp.defaultMessage,
) {
  const digits = siteConfig.whatsapp.number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function getMinistryWhatsAppLink(ministryName: string) {
  return getWhatsAppLink(
    `Olá! Gostaria de saber mais sobre o Ministério de ${ministryName} da Igreja Pentecostal Aliança com Deus.`,
  );
}
