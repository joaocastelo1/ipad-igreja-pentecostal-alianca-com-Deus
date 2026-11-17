import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  MessageCircle,
  Music,
  Play,
  Sparkles,
  Video,
} from "lucide-react";
import { CtaBand } from "@/components/ui/CtaBand";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { videoNote } from "@/data/videos";
import { buildMetadata } from "@/lib/seo";
import { getWhatsAppLink } from "@/lib/whatsapp";

const soon = [
  {
    icon: BookOpen,
    title: "Mensagens",
    description:
      "Palavras ministradas nos cultos para edificar a sua vida e fortalecer a sua fé.",
  },
  {
    icon: Music,
    title: "Louvor e adoração",
    description:
      "Momentos de adoração que marcaram os nossos encontros e cultos.",
  },
  {
    icon: Sparkles,
    title: "Momentos especiais",
    description:
      "Batismos, testemunhos, eventos e registros da ação de Deus entre nós.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Vídeos",
  description:
    "Em breve, mensagens, louvores e momentos especiais da Igreja Pentecostal Aliança com Deus estarão disponíveis em vídeo.",
  path: "/videos",
});

export default function VideosPage() {
  return (
    <>
      <PageHero
        eyebrow="Vídeos"
        currentPage="Vídeos"
        title={
          <>
            A Palavra que{" "}
            <span className="gold-text italic">edifica</span>
          </>
        }
        description="Em breve, você poderá assistir a mensagens, louvores e registros dos nossos encontros por aqui."
      >
        <div className="inline-flex items-center gap-2.5 rounded-full border border-gold-500/20 bg-gold-500/[0.05] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-300">
          <Video className="h-3.5 w-3.5" aria-hidden="true" />
          Canal em preparação
        </div>
      </PageHero>

      <section className="section">
        <div className="container-page">
          <Reveal>
            <EmptyState
              icon={<Play className="ml-0.5 h-7 w-7" aria-hidden="true" />}
              eyebrow="Em breve"
              title="Nosso canal está sendo preparado"
              description={videoNote}
              action={
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href="https://www.instagram.com/_ministerio_ipad_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Acompanhar no Instagram
                  </a>
                  <a
                    href={getWhatsAppLink(
                      "Olá! Gostaria de saber quando os vídeos dos cultos estarão disponíveis.",
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Falar no WhatsApp
                  </a>
                </div>
              }
            />
          </Reveal>
        </div>
      </section>

      <section className="section relative overflow-hidden border-y border-white/5 bg-navy-900/25">
        <div
          aria-hidden="true"
          className="bg-grid pointer-events-none absolute inset-0 opacity-30"
        />
        <div className="container-page relative">
          <Reveal>
            <SectionHeading
              align="center"
              eyebrow="O que vem por aí"
              title={
                <>
                  Conteúdo para{" "}
                  <span className="gold-text italic">edificar vidas</span>
                </>
              }
              description="Estamos preparando um espaço para que a mensagem continue alcançando vidas mesmo a distância."
              className="mx-auto"
            />
          </Reveal>

          <div className="mt-11 grid gap-4 md:grid-cols-3">
            {soon.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 80}>
                  <div className="surface h-full rounded-2xl p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold-500/25 bg-gold-500/[0.06] text-gold-300">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-2xl font-semibold text-cream">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Enquanto isso"
        title={
          <>
            Venha viver a experiência{" "}
            <span className="gold-text italic">presencialmente</span>
          </>
        }
        description="Nada substitui a comunhão da casa de Deus. Venha participar de um culto e sentir a presença do Senhor com a nossa família."
      >
        <Link href="/cultos" className="btn btn-primary">
          Ver programação
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link href="/pedido-de-oracao" className="btn btn-outline">
          Pedir oração
        </Link>
      </CtaBand>
    </>
  );
}
