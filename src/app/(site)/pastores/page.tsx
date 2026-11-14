import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flame, Globe2, HeartHandshake, Quote } from "lucide-react";
import { PastorCard } from "@/components/cards/PastorCard";
import { CtaBand } from "@/components/ui/CtaBand";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  pastorMessage,
  pastorPhotoNote,
  pastors,
} from "@/data/pastors";
import { buildMetadata } from "@/lib/seo";

const calling = [
  {
    icon: Globe2,
    title: "Missionários",
    description:
      "Antes de iniciar este ministério, os pastores Pedro e Simone serviam como missionários.",
  },
  {
    icon: Flame,
    title: "Chamados",
    description:
      "Receberam o chamado para iniciar a Igreja Pentecostal Aliança com Deus e decidiram obedecer.",
  },
  {
    icon: HeartHandshake,
    title: "Servindo com fé",
    description:
      "Sem grandes recursos materiais, começaram confiando na oração, na fé e na provisão divina.",
  },
];

export const metadata: Metadata = buildMetadata({
  title: "Pastores Pedro e Simone",
  description:
    "Conheça os pastores Pedro e Simone, missionários chamados por Deus para iniciar a Igreja Pentecostal Aliança com Deus em São Bernardo, Maranhão.",
  path: "/pastores",
});

export default function PastoresPage() {
  return (
    <>
      <PageHero
        eyebrow="Liderança"
        currentPage="Pastores"
        title={
          <>
            Pastores <span className="gold-text italic">Pedro e Simone</span>
          </>
        }
        description="Chamados para servir, ensinar a Palavra e conduzir vidas a uma caminhada de fé em Jesus Cristo."
      />

      <section className="section">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {pastors.map((pastor, index) => (
              <PastorCard key={pastor.id} pastor={pastor} index={index} />
            ))}
          </div>

          <Reveal delay={120}>
            <div className="surface mt-8 flex flex-col gap-3 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
              <div className="flex items-start gap-3">
                <Quote
                  className="mt-0.5 h-5 w-5 shrink-0 text-gold-500/65"
                  aria-hidden="true"
                />
                <p className="max-w-3xl font-display text-xl leading-snug text-cream sm:text-2xl">
                  “{pastorMessage}”
                </p>
              </div>
              <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.18em] text-gold-400">
                Pastores Pedro e Simone
              </span>
            </div>
            <p className="mt-4 text-center text-[11px] text-mist/50">
              {pastorPhotoNote}
            </p>
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
              eyebrow="Nosso chamado"
              title={
                <>
                  Uma resposta de{" "}
                  <span className="gold-text italic">fé e obediência</span>
                </>
              }
              description="A história dos pastores se confunde com a história da igreja: um chamado, uma resposta e uma caminhada de confiança em Deus."
              className="mx-auto"
            />
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {calling.map((item, index) => {
              const Icon = item.icon;

              return (
                <Reveal key={item.title} delay={index * 80}>
                  <div className="h-full rounded-2xl border border-white/[0.07] bg-navy-950/45 p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold-500/25 bg-gold-500/[0.07] text-gold-300">
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

          <Reveal delay={140} className="mt-10 text-center">
            <Link href="/sobre" className="btn btn-outline">
              Conheça nossa história
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Fale com os pastores"
        title={
          <>
            Precisa de oração ou{" "}
            <span className="gold-text italic">orientação?</span>
          </>
        }
        description="Estamos à disposição para orar com você e caminhar ao seu lado em fé."
      >
        <Link href="/pedido-de-oracao" className="btn btn-primary">
          Enviar pedido de oração
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        <Link href="/contato" className="btn btn-outline">
          Falar com a igreja
        </Link>
      </CtaBand>
    </>
  );
}
