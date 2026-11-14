import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
};

const defaultOgImage = {
  url: "/images/og/og-image.png",
  width: 1200,
  height: 630,
  alt: "Igreja Pentecostal Aliança com Deus — São Bernardo, Maranhão",
};

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  noIndex = false,
}: PageMetadataOptions = {}): Metadata {
  const canonical = path === "/" ? "/" : path;
  const socialTitle = title
    ? `${title} | ${siteConfig.shortName}`
    : siteConfig.title;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical,
    },
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: false,
          },
        }
      : {}),
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: canonical,
      siteName: siteConfig.fullName,
      title: socialTitle,
      description,
      images: [defaultOgImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [defaultOgImage.url],
    },
  };
}
