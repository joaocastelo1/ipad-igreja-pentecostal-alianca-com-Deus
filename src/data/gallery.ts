import type { GalleryCategory, GalleryItem } from "@/types";

export const galleryCategories: GalleryCategory[] = [
  "Comunidade",
  "Cultos",
  "Evangelismo",
  "Missões",
  "Eventos",
  "Batismos",
  "Famílias",
];

export const galleryItems: GalleryItem[] = [
  {
    id: "familia-reunida",
    src: "/images/igreja/igreja.webp",
    alt: "Membros da Igreja Pentecostal Aliança com Deus reunidos em frente à fachada com a inscrição Aliança com Deus",
    caption: "Nossa família reunida",
    category: "Comunidade",
    width: 1080,
    height: 896,
  },
  {
    id: "casa-da-alianca",
    src: "/images/igreja/igreja-detalhe.webp",
    alt: "Detalhe da fachada da igreja com a inscrição Aliança com Deus e o símbolo da IPAD",
    caption: "A casa da Aliança",
    category: "Comunidade",
    width: 1080,
    height: 412,
  },
  {
    id: "fe-que-reune-geracoes",
    src: "/images/igreja/igreja-familia.webp",
    alt: "Crianças, jovens e adultos reunidos na igreja em um momento de comunhão",
    caption: "Fé que reúne gerações",
    category: "Famílias",
    width: 1080,
    height: 574,
  },
];

export const galleryNote =
  "Novas fotos de cultos, evangelismos, missões e eventos serão adicionadas em breve.";
