import type { NavItem, SocialLink } from "@/types";

const vercelUrl =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000")
).replace(/\/$/, "");

export const siteConfig = {
  name: "Igreja Pentecostal Aliança com Deus",
  shortName: "IPAD",
  fullName: "Igreja Pentecostal Aliança com Deus — IPAD",
  tagline: "Orando, Adorando e Evangelizando.",
  city: "São Bernardo",
  state: "Maranhão",
  stateCode: "MA",
  location: "São Bernardo — Maranhão",
  address: {
    line1: "Av. Custódia de Almeida Lima",
    line2: "Centro — São Bernardo, Maranhão",
    postalCode: "65550-000",
  },
  map: {
    embedUrl:
      "https://www.google.com/maps?q=Av.%20Cust%C3%B3dia%20de%20Almeida%20Lima%2C%20Centro%2C%20S%C3%A3o%20Bernardo%20-%20MA&output=embed",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Av.%20Cust%C3%B3dia%20de%20Almeida%20Lima%2C%20Centro%2C%20S%C3%A3o%20Bernardo%20-%20MA",
  },
  whatsapp: {
    // Substitua pelo número oficial com DDI + DDD, somente dígitos.
    number: "5598984696169",
    display: "(98) 98469-6169",
    defaultMessage:
      "Olá! Gostaria de conhecer a Igreja Pentecostal Aliança com Deus.",
    prayerMessage:
      "Olá! Gostaria de falar com a Igreja Pentecostal Aliança com Deus.",
  },
  email: "",
  social: {
    instagram: "https://www.instagram.com/i.p._alianca_com_deus",
    facebook: "",
    youtube: "",
  },
  url: siteUrl,
  locale: "pt_BR",
  title: "Igreja Pentecostal Aliança com Deus | São Bernardo – MA",
  description:
    "Conheça a Igreja Pentecostal Aliança com Deus em São Bernardo, Maranhão. Uma igreja marcada pela fé, oração, evangelismo, missões e busca pela presença do Espírito Santo.",
  keywords: [
    "Igreja Pentecostal Aliança com Deus",
    "IPAD São Bernardo",
    "Igreja Pentecostal em São Bernardo MA",
    "Igreja Aliança com Deus São Bernardo",
    "Igreja evangélica São Bernardo Maranhão",
    "pastores Pedro e Simone",
    "culto em São Bernardo MA",
  ],
  verses: {
    hero: {
      text: "Porque para Deus nada é impossível.",
      reference: "Lucas 1:37",
    },
    mission: {
      text: "Ide por todo o mundo, pregai o evangelho a toda criatura.",
      reference: "Marcos 16:15",
    },
  },
} as const;

const socialCandidates: Array<SocialLink | null> = [
  siteConfig.social.instagram
    ? {
        platform: "instagram",
        label: "Instagram da IPAD",
        href: siteConfig.social.instagram,
      }
    : null,
  siteConfig.social.facebook
    ? {
        platform: "facebook",
        label: "Facebook da IPAD",
        href: siteConfig.social.facebook,
      }
    : null,
  siteConfig.social.youtube
    ? {
        platform: "youtube",
        label: "Canal da IPAD no YouTube",
        href: siteConfig.social.youtube,
      }
    : null,
];

export const socialLinks: SocialLink[] = socialCandidates.filter(
  (link): link is SocialLink => link !== null,
);

export const mainNav: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Sobre Nós", href: "/sobre" },
  { label: "Pastores", href: "/pastores" },
  { label: "Ministérios", href: "/ministerios" },
  { label: "Cultos", href: "/cultos" },
  { label: "Eventos", href: "/eventos" },
  { label: "Missões", href: "/missoes" },
  { label: "Galeria", href: "/galeria" },
  { label: "Vídeos", href: "/videos" },
  { label: "Contato", href: "/contato" },
];

export const footerNav: NavItem[] = [
  { label: "Início", href: "/" },
  { label: "Sobre Nós", href: "/sobre" },
  { label: "Pastores", href: "/pastores" },
  { label: "Ministérios", href: "/ministerios" },
  { label: "Programação", href: "/cultos" },
  { label: "Eventos", href: "/eventos" },
  { label: "Missões", href: "/missoes" },
  { label: "Galeria", href: "/galeria" },
  { label: "Contato", href: "/contato" },
];
