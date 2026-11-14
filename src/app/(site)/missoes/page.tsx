import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Globe2,
  HandHeart,
  Megaphone,
  MessageCircle,
  Quote,
  Sparkles,
} from "lucide-react";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { getWhatsAppLink } from "@/lib/whatsapp";

const commitments = [
  {
    icon: HandHeart,
    title: "Orar",
    description:
      "Interceder por vidas, famílias e lugares que ainda precisam conhecer o amor de Jesus.",
  },
  {
    icon: Globe2,
    title: "Apoiar",
    description:
      "Estar ao lado de quem foi chamado para levar o Evangelho além das fronteiras da igreja local.",
  },
  {
    icon: Megaphone,
    title: "Anunciar",
    description:
      "Testemunhar Cristo no dia a dia, com palavras e atitudes, onde Deus nos colocou.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Missões",
  description:
    "Conheça o compromisso missionário da Igreja Pentecostal Aliança com Deus: orar, apoiar e anunciar o Evangelho de Jesus Cristo em São Bernardo, Maranhão e além.",
  path: "/missoes",
});

export default function MissoesPage() {
  return (
    <>
      <PageHero
        eyebrow="Missões"
        currentPage="Missões"
        title={
          <>
            Levando o Evangelho{" "}
            <span className="gold-text italic">além das paredes</span>
          </>
        }
        description="A igreja existe para adorar a Deus e anunciar o Seu Reino. Missões é o coração dessa missão: alcançar vidas onde quer que estejam."
      >
        <div className="inline-flex items-center gap-3 rounded-2xl border border-gold-500/20 bg-gold-500/[0.05] px-5 py-3.5">
          <Quote className="h-5 w-5 shrink-0 text-gold-400" aria-hidden="true" />
          <div>
            <p className="font-display text-base leading-snug text-cream">
              “Ide por todo o mundo, pregai o evangelho a toda criatura.”
            </p>
            <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.2em] text-gold-400">
              Marcos 16:15
            </p>
          </div>
        </div>
      </PageHero>

      <section className="section">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <div>
              <Reveal>
                <SectionHeading
                  eyebrow="Nossa visão"
                  title={
                    <>
                      Um chamado que{" "}
                      <span className="gold-text italic">começa em nós</span>
                    </>
                  }
                  description="A história da nossa igreja nasceu do coração missionário. Antes de pastorear, os pastores Pedro e Simone serviam como missionários, e esse chamado continua vivo em nossa identidade."
                />
              </Reveal>

              <div className="prose-church mt-6 max-w-xl text-sm sm:text-base">
                <p>
                  Acreditamos que missões não é um departamento da igreja, mas
                  a própria razão de existirmos. Fomos alcançados pela graça de
                  Deus para que outras vidas também sejam alcançadas.
                </p>
                <p>
                  Por isso, incentivamos a oração pelos perdidos, o testemunho
                  diário, o cuidado com as famílias e o apoio àqueles que Deus
                  chama para servir em novos lugares.
                </p>
              </div>

              <Reveal delay={100} className="mt-8">
                <a
                  href={getWhatsAppLink(
                    "Olá! Gostaria de saber como participar ou apoiar o trabalho de missões da igreja.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  Quero participar de missões
                </a>
              </Reveal>
            </div>

            <Reveal direction="right">
              <div className="relative">
                <div className="relative overflow-hidden rounded-[1.5rem] border border-gold-500/25">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src="/images/igreja/igreja-detalhe.webp"
                      alt="Fachada da Igreja Pentecostal Aliança com Deus com a inscrição Aliança com Deus"
                      fill
                      sizes="(max-width: 1024px) 92vw, 44vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-transparent to-transparent" />
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-4 rounded-2xl border border-gold-500/30 bg-navy-950/95 p-5 shadow-2xl backdrop-blur-md sm:-left-8 sm:p-6">
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold-400">
                    Nossa origem
                  </p>
                  <p className="mt-1.5 max-w-[13rem] font-display text-lg leading-snug text-cream">
                    Nascemos de um chamado missionário.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
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
              eyebrow="Nosso compromisso"
              title={
                <>
                  Orar, apoiar e{" "}
                  <span className="gold-text italic">anunciar</span>
                </>
              }
              description="Três atitudes simples que nos ajudam a viver o chamado missionário no dia a dia."
              className="mx-auto"
            />
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {commitments.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 90}>
                  <div className="surface card-hover h-full rounded-2xl p-7">
                    <span className="grid h-12 w-12 place-items-center rounded-xl border border-gold-500/25 bg-gold-500/[0.07] text-gold-300">
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

          <Reveal delay={140}>
            <div className="mx-auto mt-12 max-w-3xl text-center">
              <Sparkles
                className="mx-auto h-6 w-6 text-gold-500/70"
                aria-hidden="true"
              />
              <p className="mt-4 font-display text-2xl leading-snug text-sand sm:text-3xl">
                “A seara é grande, mas os trabalhadores são poucos. Peça ao
                Senhor da seara que envie trabalhadores para a sua seara.”
              </p>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-400">
                Mateus 9:37-38
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Faça parte"
        title={
          <>
            Deus pode usar{" "}
            <span className="gold-text italic">a sua vida</span>
          </>
        }
        description="Se você sente o chamado para servir em missões ou deseja apoiar esse trabalho, fale conosco. Vamos caminhar juntos."
      >
        <a
          href={getWhatsAppLink(
            "Olá! Gostaria de saber como participar ou apoiar o trabalho de missões da igreja.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Falar sobre missões
        </a>
        <Link href="/ministerios" className="btn btn-outline">
          Conhecer ministérios
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </CtaBand>
    </>
  );
}
