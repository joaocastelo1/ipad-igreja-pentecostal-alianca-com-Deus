import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.fullName,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#030710",
    theme_color: "#030710",
    lang: "pt-BR",
    dir: "ltr",
    categories: ["religion", "lifestyle"],
    icons: [
      {
        src: "/images/logo/ipad-logo.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/logo/ipad-logo.webp",
        sizes: "512x512",
        type: "image/webp",
        purpose: "any",
      },
    ],
    shortcuts: [
      {
        name: "Pedido de oração",
        short_name: "Oração",
        description:
          "Envie um pedido de oração para a Igreja Pentecostal Aliança com Deus.",
        url: "/pedido-de-oracao",
        icons: [
          {
            src: "/images/logo/ipad-logo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      {
        name: "Cultos",
        short_name: "Cultos",
        description: "Confira a programação dos cultos da igreja.",
        url: "/cultos",
        icons: [
          {
            src: "/images/logo/ipad-logo.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    ],
  };
}
