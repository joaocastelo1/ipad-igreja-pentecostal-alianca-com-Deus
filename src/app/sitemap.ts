import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/site";

const routes: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}> = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/sobre", priority: 0.8, changeFrequency: "monthly" },
  { path: "/pastores", priority: 0.8, changeFrequency: "monthly" },
  { path: "/ministerios", priority: 0.8, changeFrequency: "monthly" },
  { path: "/cultos", priority: 0.9, changeFrequency: "weekly" },
  { path: "/eventos", priority: 0.8, changeFrequency: "weekly" },
  { path: "/missoes", priority: 0.7, changeFrequency: "monthly" },
  { path: "/galeria", priority: 0.6, changeFrequency: "monthly" },
  { path: "/videos", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contato", priority: 0.8, changeFrequency: "monthly" },
  { path: "/pedido-de-oracao", priority: 0.9, changeFrequency: "monthly" },
  { path: "/politica-de-privacidade", priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path === "/" ? "" : route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
