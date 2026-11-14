import { socialLinks, siteConfig } from "@/data/site";

export const churchJsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  "@id": `${siteConfig.url}/#church`,
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  description: siteConfig.description,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/logo/ipad-logo.png`,
  image: `${siteConfig.url}/images/og/og-image.png`,
  slogan: siteConfig.tagline,
  address: {
    "@type": "PostalAddress",
    addressLocality: siteConfig.city,
    addressRegion: siteConfig.stateCode,
    postalCode: siteConfig.address.postalCode,
    addressCountry: "BR",
  },
  areaServed: {
    "@type": "City",
    name: `${siteConfig.city} — ${siteConfig.state}`,
  },
  sameAs: socialLinks.map((link) => link.href),
  inLanguage: "pt-BR",
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.fullName,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: "pt-BR",
  publisher: {
    "@id": `${siteConfig.url}/#church`,
  },
};
