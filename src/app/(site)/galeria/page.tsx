import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Camera, MessageCircle } from "lucide-react";
import { Gallery } from "@/components/gallery/Gallery";
import { GalleryWindows } from "@/components/gallery/GalleryWindows";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryNote } from "@/data/gallery";
import { buildMetadata } from "@/lib/seo";
import { getWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = buildMetadata({
  title: "Galeria",
  description:
    "Momentos de fé, comunhão e celebração da Igreja Pentecostal Aliança com Deus em São Bernardo e em Araioses, Maranhão. Veja fotos e vídeos da Sede IPAD, da IPAD Araioses e das congregações Madeiro, Nova Esperança e Vila São José.",
  path: "/galeria",
});

export default function GaleriaPage() {
  return (
    <>
      <PageHero
        eyebrow="Galeria"
        currentPage="Galeria"
        title={
          <>
            Momentos que contam{" "}
            <span className="gold-text italic">a nossa história</span>
          </>
        }
        description="Cada foto é um registro da graça de Deus entre nós: a Sede IPAD, a IPAD Araioses, as congregações e os eventos e festas que reúnem a nossa família."
      >
        <div className="inline-flex items-center gap-2.5 rounded-full border border-gold-500/20 bg-gold-500/[0.05] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-300">
          <Camera className="h-3.5 w-3.5" aria-hidden="true" />
          Nossa família em imagens
        </div>
      </PageHero>

      <section className="section">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Nossas congregações"
              title={
                <>
                  Uma família em{" "}
                  <span className="gold-text italic">cada janela</span>
                </>
              }
              description="Sede IPAD, IPAD Araioses, Madeiro, Nova Esperança e Vila São José, além dos nossos eventos e festas. Cada janela gira sozinha: passe o mouse, toque ou use as setas para explorar."
            />
          </Reveal>

          <Reveal delay={120} className="mt-12">
            <GalleryWindows />
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              eyebrow="Acervo completo"
              title={
                <>
                  Todas as fotos e{" "}
                  <span className="gold-text italic">vídeos</span>
                </>
              }
              description="Filtre por congregação ou evento e navegue pelo carrossel completo da nossa galeria."
            />
          </Reveal>

          <div className="mt-10">
            <Gallery />
          </div>

          <Reveal delay={120}>
            <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 sm:flex-row sm:items-center">
              <p className="flex items-start gap-2.5 text-sm leading-relaxed text-mist">
                <Camera
                  className="mt-0.5 h-4 w-4 shrink-0 text-gold-400"
                  aria-hidden="true"
                />
                {galleryNote}
              </p>
              <a
                href={getWhatsAppLink(
                  "Olá! Gostaria de compartilhar fotos de um evento da igreja para a galeria.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm shrink-0"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Enviar fotos
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Viva conosco"
        title={
          <>
            Venha criar novas{" "}
            <span className="gold-text italic">memórias de fé</span>
          </>
        }
        description="As melhores fotos são aquelas que registram vidas sendo tocadas por Deus. Venha fazer parte da nossa família."
      >
        <Link href="/cultos" className="btn btn-primary">
          Ver programação
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link href="/contato" className="btn btn-outline">
          Planejar minha visita
        </Link>
      </CtaBand>
    </>
  );
}
